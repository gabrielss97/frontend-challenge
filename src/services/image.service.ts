import { GALLERY } from "@/utils/constants";
import { api } from "./api";
import {
  SignedUrlRequest,
  SignedUrlResponse,
  SaveImageRequest,
  ImagesListResponse,
  GetImagesParams,
} from "./types/image";

export const imageService = {
  getSignedUrl: async (data: SignedUrlRequest): Promise<SignedUrlResponse> => {
    const response = await api.post<SignedUrlResponse>("/api/v1/signed", data);
    return response.data;
  },

  saveImage: async (data: SaveImageRequest): Promise<void> => {
    await api.post("/api/v1/images", data);
  },

  getImages: async (
    params: GetImagesParams = {}
  ): Promise<ImagesListResponse> => {
    const response = await api.get<ImagesListResponse>("/api/v1/images", {
      params: {
        page_size: params.page_size || GALLERY.PAGE_SIZE,
        page_token: params.page_token,
      },
    });
    return response.data;
  },
};
