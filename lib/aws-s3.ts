export async function uploadFileToS3(file: File, imageCategory: string): Promise<string> {
  try {
    // Ask backend for a pre-signed URL
    const res = await fetch("http://localhost:3000/api/aws/s3-presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileType: file.type,
        category: imageCategory,
        fileName: file.name // Optional: you can send the file name if needed
      }),
    });

    const { signedUrl, publicUrl } = await res.json();
    console.log("Received signed URL:", signedUrl);

    //Upload directly to S3
    const upload = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!upload.ok) {
      throw new Error(`Failed to upload file: ${upload.statusText}`);
    }

    console.log("Upload response:", upload);

    return publicUrl; // Return the public URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// /**
//  * Get a signed URL for a file in S3
//  * @param key - The key (path) of the file in S3
//  * @param expiresIn - The number of seconds until the URL expires (default: 3600)
//  * @returns A signed URL that can be used to access the file
//  */
// export async function getSignedUrlForFile(
//   key: string,
//   expiresIn: number = 3600
// ): Promise<string> {
//   try {
//     const command = new GetObjectCommand({
//       Bucket: BUCKET_NAME,
//       Key: key,
//     });

//     return await getSignedUrl(s3Client, command, { expiresIn });
//   } catch (error) {
//     console.error('Error generating signed URL:', error);
//     throw new Error('Failed to generate signed URL');
//   }
// }

// /**
//  * Delete a file from S3
//  * @param key - The key (path) of the file to delete
//  * @returns A boolean indicating success
//  */
// export async function deleteFileFromS3(key: string): Promise<boolean> {
//   try {
//     const command = new DeleteObjectCommand({
//       Bucket: BUCKET_NAME,
//       Key: key,
//     });

//     await s3Client.send(command);
//     return true;
//   } catch (error) {
//     console.error('Error deleting file from S3:', error);
//     throw new Error('Failed to delete file from S3');
//   }
// }

// /**
//  * List files in a directory in S3
//  * @param prefix - The prefix (directory path) to list files from
//  * @returns An array of file keys
//  */
// export async function listFilesInS3(prefix: string): Promise<string[]> {
//   try {
//     const command = new ListObjectsV2Command({
//       Bucket: BUCKET_NAME,
//       Prefix: prefix,
//     });

//     const response = await s3Client.send(command);
//     return response.Contents?.map((item) => item.Key || '') || [];
//   } catch (error) {
//     console.error('Error listing files in S3:', error);
//     throw new Error('Failed to list files in S3');
//   }
// }

// /**
//  * Check if a file exists in S3
//  * @param key - The key (path) of the file to check
//  * @returns A boolean indicating if the file exists
//  */
// export async function fileExistsInS3(key: string): Promise<boolean> {
//   try {
//     const command = new HeadObjectCommand({
//       Bucket: BUCKET_NAME,
//       Key: key,
//     });

//     await s3Client.send(command);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

// /**
//  * Get file metadata from S3
//  * @param key - The key (path) of the file
//  * @returns File metadata
//  */
// export async function getFileMetadata(key: string) {
//   try {
//     const command = new HeadObjectCommand({
//       Bucket: BUCKET_NAME,
//       Key: key,
//     });

//     const response = await s3Client.send(command);
//     return {
//       contentType: response.ContentType,
//       contentLength: response.ContentLength,
//       lastModified: response.LastModified,
//       etag: response.ETag,
//     };
//   } catch (error) {
//     console.error('Error getting file metadata:', error);
//     throw new Error('Failed to get file metadata');
//   }
// }
