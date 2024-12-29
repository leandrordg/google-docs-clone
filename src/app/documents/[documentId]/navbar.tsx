"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Bold,
  File,
  FileJson,
  FilePen,
  FilePlus,
  FileText,
  Globe,
  Italic,
  Printer,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Text,
  Trash,
  Underline,
  Undo2,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { DocumentInput } from "./document-input";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>

        <div className="flex flex-col">
          <DocumentInput />

          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Arquivo
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <File className="size-4 mr-2" />
                      Salvar
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <FileJson className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem>
                        <Globe className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
                        <FileText className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlus className="size-4 mr-2" />
                    Novo documento
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePen className="size-4 mr-2" />
                    Renomear
                  </MenubarItem>
                  <MenubarItem>
                    <Trash className="size-4 mr-2" />
                    Remover
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <Printer className="size-4 mr-2" />
                    Imprimir <MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Editar
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Undo2 className="size-4 mr-2" />
                    Desfazer <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <Redo2 className="size-4 mr-2" />
                    Refazer <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Inserir
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Tabela</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>1x1</MenubarItem>
                      <MenubarItem>2x2</MenubarItem>
                      <MenubarItem>3x3</MenubarItem>
                      <MenubarItem>4x4</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Formatar
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Text className="size-4 mr-2" />
                      Texto
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <Bold className="size-4 mr-2" />
                        Negrito <MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Italic className="size-4 mr-2" />
                        Itálico <MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Underline className="size-4 mr-2" />
                        Sublinhado&nbsp;&nbsp;
                        <MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Strikethrough className="size-4 mr-2" />
                        Tachado
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <RemoveFormatting className="size-4 mr-2" />
                    Remover formatação
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
}
