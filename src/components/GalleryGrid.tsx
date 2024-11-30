"use client";

import { useGallery } from "@/hooks/useGallery";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ImageCard } from "./ImageCard";
import { GALLERY } from "@/utils/constants";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { ImageItem } from "@/services/types/image";

const LoadingState = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 200,
    }}
  >
    <CircularProgress sx={{ color: "primary.main" }} />
  </Box>
);

const ErrorMessage = () => (
  <Typography color="error" align="center" sx={{ py: 2 }}>
    {GALLERY.ERROR_MESSAGE}
  </Typography>
);

const EmptyState = () => (
  <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
    {GALLERY.EMPTY_MESSAGE}
  </Typography>
);

const LoadingMore = () => (
  <Box sx={{ py: 2, display: "flex", gap: 2, alignItems: "center" }}>
    <CircularProgress size={20} sx={{ color: "primary.main" }} />
    <Typography color="text.secondary">
      {GALLERY.LOADING_MORE_MESSAGE}
    </Typography>
  </Box>
);

interface ImageGridProps {
  items: ImageItem[][];
}

const ImageGrid = ({ items }: ImageGridProps) => (
  <Grid container spacing={2}>
    {items.map((page) =>
      page.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={image.url}>
          <ImageCard image={image} priority={index < 4} />
        </Grid>
      ))
    )}
  </Grid>
);

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

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorMessage />;
  if (!data?.pages[0].items.length) return <EmptyState />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <ImageGrid items={data.pages.map((page) => page.items)} />

      <Box ref={ref} sx={{ display: "flex", justifyContent: "center" }}>
        {isFetchingNextPage && <LoadingMore />}
      </Box>
    </Box>
  );
}
