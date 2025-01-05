"use client";

import { ReactNode } from "react";

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { FullscreenLoader } from "./fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-dvh">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="Verificando permissões..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
