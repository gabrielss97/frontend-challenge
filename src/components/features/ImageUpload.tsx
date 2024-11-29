"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSignedUrl } from "@/hooks/useSignedUrl";
import { useSaveImage } from "@/hooks/useSaveImage";
import { uploadToSignedUrl } from "@/utils/helpers";

interface UploadFormData {
  image: FileList;
}

export function ImageUpload() {
  const { mutateAsync: getSignedUrl } = useSignedUrl();
  const { mutateAsync: saveImage } = useSaveImage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UploadFormData>();

  const onSubmit = async (data: UploadFormData) => {
    try {
      const file = data.image[0];
      if (!file) return;

      console.log("Starting upload process for file:", file.name);

      const signedUrlResponse = await getSignedUrl({
        mimetype: file.type,
        file_name: file.name,
      });

      console.log("Signed URL Response:", signedUrlResponse);

      if (!signedUrlResponse.url) {
        throw new Error("No URL in response");
      }

      const uploadSuccess = await uploadToSignedUrl(
        file,
        signedUrlResponse.url
      );

      if (!uploadSuccess) {
        throw new Error("Failed to upload to signed URL");
      }

      console.log("Upload successful, saving image reference");

      await saveImage({ url: signedUrlResponse.url });

      console.log("Image reference saved");

      reset();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        {...register("image", {
          required: "Image is required",
          validate: {
            acceptedFormats: (files) =>
              files[0]?.type.startsWith("image/") ||
              "Only image files are allowed",
            maxSize: (files) =>
              files[0]?.size <= 5000000 || "Image must be less than 5MB",
          },
        })}
        error={errors.image?.message}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Upload Image
      </Button>
    </form>
  );
}
