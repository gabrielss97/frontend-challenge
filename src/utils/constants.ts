export const IMAGE_UPLOAD = {
  MAX_SIZE: 5000000, // 5MB em bytes
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ERROR_MESSAGES: {
    INVALID_TYPE: "Apenas imagens são permitidas",
    MAX_SIZE: "Imagem tem que ser menor que 5mb",
    REQUIRED: "Escolha uma imagem",
  },
} as const;

export const GALLERY = {
  PAGE_SIZE: 12,
  LOADING_MESSAGE: "Carregando imagens...",
  ERROR_MESSAGE: "Erro ao carregar imagens",
  EMPTY_MESSAGE: "Nenhuma imagem encontrada. Faça seu primeiro upload!",
  LOADING_MORE_MESSAGE: "Carregando mais imagens...",
} as const;
