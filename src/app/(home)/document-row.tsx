import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { SiGoogledocs } from "react-icons/si";
import { Building2, CircleUser, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export function DocumentRow({ document }: DocumentRowProps) {
  return (
    <TableRow className="cursor-pointer">
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
        {document.organizationId ? "Compartilhado" : "Pessoal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "dd 'de' MMM 'de' yyyy.", {
          locale: ptBR,
        })}
      </TableCell>
      <TableCell className="flex justify-end">
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
