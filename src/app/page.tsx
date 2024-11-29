"use client";

import { ImageUpload } from "@/components/features/ImageUpload";

export default function Home() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Image Upload</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <ImageUpload />
      </div>
    </div>
  );
}
