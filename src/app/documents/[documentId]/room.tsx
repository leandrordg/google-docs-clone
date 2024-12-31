"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { toast } from "sonner";
import { getUsers } from "./actions";

import { FullscreenLoader } from "@/components/fullscreen-loader";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Erro ao carregar usuários");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map((id) => users.find((u) => u.id === id) ?? undefined);
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Carregando documento..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
