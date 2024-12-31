"use client";

import { useParams } from "next/navigation";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

export function Room({ children }: { children: React.ReactNode }) {
  const params = useParams();

  return (
    <LiveblocksProvider
      publicApiKey={process.env.LIVEBLOCKS_PUBLIC_API_KEY as string}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
