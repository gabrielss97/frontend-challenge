"use client";

import { useForm } from "react-hook-form";
import { useSignedUrl } from "@/hooks/useSignedUrl";
import { useSaveImage } from "@/hooks/useSaveImage";
import { uploadToSignedUrl } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { IMAGE_UPLOAD } from "@/utils/constants";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

interface UploadFormData {
  image: FileList;
}

interface ImagePreviewProps {
  src: string;
}

interface ErrorMessageProps {
  message?: string;
}

const ImagePreview = ({ src }: ImagePreviewProps) => (
  <Box sx={{ position: "relative", width: "100%", height: 200 }}>
    <Box
      component="img"
      src={src}
      alt="Preview"
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </Box>
);

const UploadPlaceholder = () => (
  <>
    <CloudUploadIcon
      sx={{
        fontSize: 40,
        color: "primary.main",
        mb: 1,
      }}
    />
    <Typography color="text.primary" sx={{ mb: 1 }}>
      Arraste sua imagem ou clique para selecionar
    </Typography>
    <Typography variant="body2" color="text.secondary">
      PNG, JPG ou GIF até 5MB
    </Typography>
  </>
);

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Typography color="error" variant="caption" sx={{ mt: -1 }}>
    {message}
  </Typography>
);

export function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: getSignedUrl } = useSignedUrl();
  const { mutateAsync: saveImage } = useSaveImage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UploadFormData>();

  const { ref, onChange, ...inputProps } = register("image", {
    required: IMAGE_UPLOAD.ERROR_MESSAGES.REQUIRED,
    validate: {
      acceptedFormats: (files) =>
        files[0]?.type.startsWith("image/") ||
        IMAGE_UPLOAD.ERROR_MESSAGES.INVALID_TYPE,
      maxSize: (files) =>
        files[0]?.size <= IMAGE_UPLOAD.MAX_SIZE ||
        IMAGE_UPLOAD.ERROR_MESSAGES.MAX_SIZE,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUploadSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["images"] });
    setPreview(null);
    reset();
  };

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

      // Remove os parâmetros de query da URL assinada do Google Storage
      // Isso é necessário porque o Next Image component precisa de uma URL limpa
      // para funcionar corretamente com o domínio configurado
      const baseUrl = signedUrlResponse.url.split("?")[0];
      await saveImage({
        url: baseUrl,
      });

      await handleUploadSuccess();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          component="label"
          htmlFor="image-upload"
          sx={{
            border: "2px dashed",
            borderColor: errors.image ? "error.main" : "primary.main",
            borderRadius: 1,
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "primary.light",
              bgcolor: "rgba(153, 86, 246, 0.04)",
            },
          }}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={ref}
            onChange={handleImageChange}
            {...inputProps}
          />

          {preview ? <ImagePreview src={preview} /> : <UploadPlaceholder />}
        </Box>

        {errors.image && <ErrorMessage message={errors.image.message || ""} />}

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          {isSubmitting ? "Enviando..." : "Enviar imagem"}
        </Button>
      </Box>
    </form>
  );
}
