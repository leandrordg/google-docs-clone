"use client";

import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Doc } from "../../../convex/_generated/dataModel";

import { TableCell, TableRow } from "@/components/ui/table";
import { Building2, CircleUser } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { DocumentMenu } from "./document-menu";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export function DocumentRow({ document }: DocumentRowProps) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/documents/${document._id}`)}
      className="cursor-pointer"
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex h-full items-center gap-2">
        {document.organizationId ? (
          <Building2 className="size-4" />
        ) : (
          <CircleUser className="size-4" />
        )}
        {document.organizationId ? "Organização" : "Pessoal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "dd 'de' MMM 'de' yyyy.", {
          locale: ptBR,
        })}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
        />
      </TableCell>
    </TableRow>
  );
}
