import { Loader } from "lucide-react";

export function FullscreenLoader({ label }: { label?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Loader className="size-6 text-muted-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
