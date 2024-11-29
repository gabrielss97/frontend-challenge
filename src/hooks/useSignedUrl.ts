import { useMutation } from "@tanstack/react-query";
import { imageService } from "@/services/image.service";
import { SignedUrlRequest } from "@/services/types/image";

export function useSignedUrl() {
  return useMutation({
    mutationFn: (data: SignedUrlRequest) => imageService.getSignedUrl(data),
  });
}
