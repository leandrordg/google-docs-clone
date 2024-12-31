"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-y-6 p-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="size-10 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Algo deu errado!
          </h2>
          <p>{error.message}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button asChild className="font-medium">
          <Link href="/">Voltar</Link>
        </Button>
        <Button variant="outline" onClick={reset} className="font-medium px-6">
          Tentar novamente <RefreshCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
}
