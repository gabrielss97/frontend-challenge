import { useMutation } from "@tanstack/react-query";
import { imageService } from "@/services/image.service";
import { SaveImageRequest } from "@/services/types/image";

export function useSaveImage() {
  return useMutation({
    mutationFn: (data: SaveImageRequest) => imageService.saveImage(data),
  });
}
