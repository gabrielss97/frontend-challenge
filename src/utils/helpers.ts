export async function uploadToSignedUrl(
  file: File,
  signedUrl: string
): Promise<boolean> {
  if (!signedUrl) {
    console.error("No signed URL provided");
    throw new Error("No signed URL provided");
  }

  console.log("Attempting to upload to:", signedUrl);
  console.log("File:", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  try {
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      console.error("Upload failed with status:", response.status);
      console.error("Response:", await response.text());
    }

    return response.ok;
  } catch (error) {
    console.error("Error uploading to signed URL:", error);
    throw error;
  }
}
