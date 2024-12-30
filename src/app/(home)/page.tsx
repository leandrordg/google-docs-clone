"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { TemplatesGallery } from "./templates-gallery";

import { FullscreenLoader } from "@/components/fullscreen-loader";
import { Navbar } from "./navbar";

export default function Page() {
  const documents = useQuery(api.documents.get);

  if (documents === undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FullscreenLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>

      <div className="mt-16">
        <TemplatesGallery />
        {documents?.map((document) => (
          <span key={document._id}>{document.title}</span>
        ))}
      </div>
    </div>
  );
}
