"use server";
import {
  S3Client,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { fetcher } from "./actions/fetcher";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("Missing AWS environment variables");
}

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFileToS3(
  file: File,
  imageCategory: string
): Promise<string | null> {
  try {
    console.group(`🟡 Tize [S3 Upload Start] ${file.name}`);
    console.log("1️⃣ Requesting pre-signed URL...");

    // Ask backend for a pre-signed URL
    const res: any = await fetcher("/aws/s3-presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        fileType: file.type,
        category: imageCategory,
        fileName: file.name,
      },
    });

    // ⚠️ fetcher already returns parsed JSON, so no need for res.json()
    if (!res || res.error) {
      console.error("❌ Failed to get pre-signed URL:", res?.error || res);
      return null;
    }

    const { signedUrl, publicUrl, key } = res;

    console.log("✅ [Presign Response]");
    console.log("🔗 signedUrl:", signedUrl);
    console.log("🌍 publicUrl:", publicUrl);
    console.log("🗝️ key:", key);

    // Upload directly to S3
  console.log("2️⃣ Uploading file to S3...");

const upload = await fetch(signedUrl, {
  method: "PUT",
  headers: { "Content-Type": file.type },
  body: file,
});

if (!upload.ok) {
  // Read S3 error body (usually XML)
  const text = await upload.text();

  console.error("❌ Failed to upload file to S3:", {
    status: upload.status,
    statusText: upload.statusText,
    responseBody: text, // This contains the detailed AWS error
  });

  return null;
}

console.log("✅ Upload succeeded:", {
  status: upload.status,
  statusText: upload.statusText,
});


    console.log("✅ File uploaded successfully to S3");
    console.log("📁 File key:", key);
    console.log("🌐 Public URL:", publicUrl);
    console.groupEnd();

    return key; // You could also return publicUrl if you want to store/display the image
  } catch (error) {
    console.error("💥 Error uploading file to S3:", error);
    console.groupEnd();
    return null;
  }
}


export async function uploadMultipleFilesToS3(
  files: File[],
  imageCategory: string
): Promise<string[]> {
  const uploadPromises = files.map((file) =>
    uploadFileToS3(file, imageCategory)
  );
  const results = await Promise.all(uploadPromises);

  // Filter out null results (failed uploads)
  return results.filter((key): key is string => key !== null);
}

export async function deleteFileFromS3(key: string): Promise<boolean> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_IMAGE_BUCKET!,
    Key: key,
  });

  try {
    await s3.send(command);
    console.log(`Deleted: ${key}`);
    return true;
  } catch (err) {
    console.error("S3 Delete Error:", err);
    return false;
  }
}

export async function fileExistsInS3(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.AWS_IMAGE_BUCKET!,
      Key: key,
    });

    await s3.send(command);
    return true;
  } catch (error) {
    return false;
  }
}
