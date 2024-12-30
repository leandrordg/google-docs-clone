"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RenameDialogProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

export function RenameDialog({
  documentId,
  initialTitle,
  children,
}: RenameDialogProps) {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({ id: documentId, title: title.trim() || "Sem título" })
      .then(() => {
        setOpen(false);
        toast.success("Documento renomeado com sucesso.");
      })
      .catch(() => {
        toast.error("Erro ao renomear documento.");
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Renomear documento</DialogTitle>
            <DialogDescription>
              Escolha um novo nome para o documento.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do documento"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
