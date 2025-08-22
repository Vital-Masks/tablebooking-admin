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
    // Ask backend for a pre-signed URL
    const res: any = await fetcher("/aws/s3-presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileType: file.type,
        category: imageCategory,
        fileName: file.name, // Optional: you can send the file name if needed
      }),
    });

    if (res.error) {
      console.error("Failed to get pre-signed URL:", res.error);
      return null;
    }

    const { signedUrl, publicUrl, key } = await res.json();

    //Upload directly to S3
    const upload = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!upload.ok) {
      console.error(
        "Failed to upload file to S3:",
        upload.status,
        upload.statusText
      );
      return null;
    }

    console.log("Upload response:", upload);
    console.log("File key uploaded successfully:", key);
    return key; // Return the key of the uploaded file
  } catch (error) {
    console.error("Error uploading file to S3:", error);
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
