import { format } from "date-fns";
import { ImageItem } from "@/services/types/image";
import Image from "next/image";

interface ImageCardProps {
  image: ImageItem;
  priority?: boolean;
}

export function ImageCard({ image, priority = false }: ImageCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="aspect-square relative">
        <Image
          src={image.url}
          alt=""
          fill
          className="object-cover hover:scale-105 transition-transform"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="p-3 text-sm text-gray-500">
        Enviado em: {format(new Date(image.created_at), "dd/MM/yyyy HH:mm")}
      </div>
    </div>
  );
}
