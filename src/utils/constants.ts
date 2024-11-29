export const IMAGE_UPLOAD = {
  MAX_SIZE: 5000000, // 5MB em bytes
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ERROR_MESSAGES: {
    INVALID_TYPE: "Only image files are allowed",
    MAX_SIZE: "Image must be less than 5MB",
    REQUIRED: "Image is required",
  },
} as const;

export const GALLERY = {
  PAGE_SIZE: 12,
  LOADING_MESSAGE: "Carregando imagens...",
  ERROR_MESSAGE: "Erro ao carregar imagens",
  EMPTY_MESSAGE: "Nenhuma imagem encontrada. Faça seu primeiro upload!",
  LOADING_MORE_MESSAGE: "Carregando mais imagens...",
} as const;
