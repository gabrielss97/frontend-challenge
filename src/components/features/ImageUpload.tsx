"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSignedUrl } from "@/hooks/useSignedUrl";
import { useSaveImage } from "@/hooks/useSaveImage";
import { uploadToSignedUrl } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { IMAGE_UPLOAD } from "@/utils/constants";

interface UploadFormData {
  image: FileList;
}

export function ImageUpload() {
  const queryClient = useQueryClient();
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

      const signedUrlResponse = await getSignedUrl({
        mimetype: file.type,
        file_name: file.name,
      });

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

      await saveImage({
        url: signedUrlResponse.url,
      });

      await queryClient.invalidateQueries({ queryKey: ["images"] });

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
          required: IMAGE_UPLOAD.ERROR_MESSAGES.REQUIRED,
          validate: {
            acceptedFormats: (files) =>
              files[0]?.type.startsWith("image/") ||
              IMAGE_UPLOAD.ERROR_MESSAGES.INVALID_TYPE,
            maxSize: (files) =>
              files[0]?.size <= IMAGE_UPLOAD.MAX_SIZE ||
              IMAGE_UPLOAD.ERROR_MESSAGES.MAX_SIZE,
          },
        })}
        error={errors.image?.message}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Enviar nova imagem
      </Button>
    </form>
  );
}
