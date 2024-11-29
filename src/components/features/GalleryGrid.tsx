"use client";

import { useGallery } from "@/hooks/useGallery";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ImageCard } from "./ImageCard";
import { GALLERY } from "@/utils/constants";

export function GalleryGrid() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGallery(GALLERY.PAGE_SIZE);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse">{GALLERY.LOADING_MESSAGE}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">{GALLERY.ERROR_MESSAGE}</div>
    );
  }

  if (!data?.pages[0].items.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        {GALLERY.EMPTY_MESSAGE}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pages.map((page) =>
          page.items.map((image, index) => (
            <ImageCard key={image.url} image={image} priority={index < 4} />
          ))
        )}
      </div>

      <div ref={ref} className="flex justify-center">
        {isFetchingNextPage && (
          <div className="text-center py-4">{GALLERY.LOADING_MORE_MESSAGE}</div>
        )}
      </div>
    </div>
  );
}
