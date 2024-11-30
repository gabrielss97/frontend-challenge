"use client";

import { useGallery } from "@/hooks/useGallery";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { ImageCard } from "./ImageCard";
import { GALLERY } from "@/utils/constants";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { ImageItem } from "@/services/types/image";

const LoadingState = ({ visible }: { visible: boolean }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(19 19 21)",
      zIndex: 1,
      transition: "opacity 0.3s ease-in-out",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
    }}
  >
    <CircularProgress sx={{ color: "primary.main", marginTop: "-900px" }} />
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
    {items.map((page, pageIndex) =>
      page.map((image, imageIndex) => (
        <Grid item xs={12} sm={6} md={4} key={image.url}>
          <ImageCard
            image={image}
            priority={pageIndex === 0 && imageIndex < 8}
          />
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

  const [showLoading, setShowLoading] = useState(true);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowLoading(true);
    }
  }, [isLoading]);

  if (error) return <ErrorMessage />;
  if (!isLoading && data?.pages[0]?.items.length === 0) return <EmptyState />;

  return (
    <Box sx={{ position: "relative" }}>
      <LoadingState visible={showLoading} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          opacity: showLoading ? 0.3 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {data && <ImageGrid items={data.pages.map((page) => page.items)} />}

        <Box ref={ref} sx={{ display: "flex", justifyContent: "center" }}>
          {isFetchingNextPage && <LoadingMore />}
        </Box>
      </Box>
    </Box>
  );
}
