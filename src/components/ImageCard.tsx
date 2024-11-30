import { format } from "date-fns";
import { ImageItem } from "@/services/types/image";
import Image from "next/image";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface ImageCardProps {
  image: ImageItem;
  priority?: boolean;
}

export function ImageCard({ image, priority = false }: ImageCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "dark.light",
        height: "100%",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: "1/1",
          width: "100%",
        }}
      >
        <Image
          src={image.url}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </Box>

      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          Enviado em: {format(new Date(image.created_at), "dd/MM/yyyy HH:mm")}
        </Typography>
      </CardContent>
    </Card>
  );
}
