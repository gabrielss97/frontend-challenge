import { useInfiniteQuery } from "@tanstack/react-query";
import { imageService } from "@/services/image.service";

export function useGallery(pageSize: number = 12) {
  return useInfiniteQuery({
    queryKey: ["images", pageSize],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      imageService.getImages({
        page_size: pageSize,
        page_token: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.page_token,
  });
}
