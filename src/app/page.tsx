"use client";

import { ImageUpload } from "@/components/features/ImageUpload";
import { GalleryGrid } from "@/components/features/GalleryGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Frontend Challenge
        </h1>

        <div className="bg-white shadow-sm rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Faça upload das suas imagens abaixo
          </h2>
          <ImageUpload />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Suas imagens</h2>
          <GalleryGrid />
        </div>
      </div>
    </div>
  );
}
