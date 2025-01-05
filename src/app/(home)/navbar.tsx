import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { SearchInput } from "./search-input";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-full w-full gap-6">
      <div className="flex gap-3 items-center shrink-0">
        <Link href="/">
          <div className="relative size-8">
            <Image src="/logo.svg" alt="Logo" fill />
          </div>
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>

      <Suspense>
        <SearchInput />
      </Suspense>

      <div className="flex gap-3 items-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}
