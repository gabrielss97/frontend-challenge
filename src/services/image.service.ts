import { api } from "./api";
import {
  SignedUrlRequest,
  SignedUrlResponse,
  SaveImageRequest,
  SaveImageResponse,
  ImagesListResponse,
  GetImagesParams,
} from "./types/image";

export const imageService = {
  getSignedUrl: async (data: SignedUrlRequest): Promise<SignedUrlResponse> => {
    const response = await api.post<SignedUrlResponse>("/api/v1/signed", data);
    return response.data;
  },

  saveImage: async (data: SaveImageRequest): Promise<SaveImageResponse> => {
    const response = await api.post<SaveImageResponse>("/api/v1/images", data);
    return response.data;
  },

  getImages: async (
    params: GetImagesParams = {}
  ): Promise<ImagesListResponse> => {
    const response = await api.get<ImagesListResponse>("/api/v1/images", {
      params: {
        page_size: params.page_size || 12,
        page_token: params.page_token,
      },
    });
    return response.data;
  },
};
