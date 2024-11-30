"use client";

import { ImageUpload } from "@/components/ImageUpload";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Container, Paper, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "rgb(19 19 21)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Frontend Challenge
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 2,
            bgcolor: "dark.light",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Enviar nova imagem
          </Typography>
          <ImageUpload />
        </Paper>

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Suas imagens
          </Typography>
          <GalleryGrid />
        </Box>
      </Container>
    </Box>
  );
}
