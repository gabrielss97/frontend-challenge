export interface SignedUrlRequest {
  mimetype: string;
  file_name: string;
}

export interface SignedUrlResponse {
  url: string;
}

export interface SaveImageRequest {
  url: string;
}

export interface ImageItem {
  url: string;
  created_at: string;
  updated_at: string;
}

export interface ImagesListResponse {
  items: ImageItem[];
  total_items: number;
  page_token: string;
  page_size: number;
}

export interface GetImagesParams {
  page_size?: number;
  page_token?: string;
}
