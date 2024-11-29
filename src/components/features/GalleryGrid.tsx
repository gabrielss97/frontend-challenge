"use client";

import { useGallery } from "@/hooks/useGallery";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function GalleryGrid() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGallery(12);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse">Carregando imagens...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Erro ao carregar imagens</div>
    );
  }

  if (!data?.pages[0].items.length) {
    return (
      <div className="text-center text-gray-500">Nenhuma imagem encontrada</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pages.map((page) =>
          page.items.map((image) => (
            <div
              key={image.url}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))
        )}
      </div>

      <div ref={ref} className="mt-4">
        {isFetchingNextPage && (
          <div className="text-center py-4">Carregando mais imagens...</div>
        )}
      </div>
    </>
  );
}
