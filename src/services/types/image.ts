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

export interface SaveImageResponse {
  id?: string;
  url: string;
}

export interface ImageResponse {
  id?: string;
  url: string;
}

export interface ImageItem {
  url: string;
  created_at: string;
  updated_at: string;
}

export interface ImagesListResponse {
  page_token?: string;
  total_items: number;
  page_size?: number;
  items: ImageItem[];
}

export interface GetImagesParams {
  page_size?: number;
  page_token?: string;
}
