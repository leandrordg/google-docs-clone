"use client";

import { cn } from "@/lib/utils";

import {
  Bold,
  Code,
  Italic,
  ListTodo,
  LucideIcon,
  MessageSquarePlus,
  Printer,
  Redo2,
  RemoveFormatting,
  SpellCheck,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

function ToolbarButton({ onClick, isActive, icon: Icon }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function Toolbar() {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: Bold,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: Italic,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
      {
        label: "Strikethrough",
        icon: Strikethrough,
        isActive: editor?.isActive("strike"),
        onClick: () => editor?.chain().focus().toggleStrike().run(),
      },
      {
        label: "Code",
        icon: Code,
        isActive: editor?.isActive("code"),
        onClick: () => editor?.chain().focus().toggleCode().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlus,
        onClick: () => console.log("Comment"),
        isActive: false, // TODO: Implement isActive for Comment
      },
      {
        label: "List Todo",
        icon: ListTodo,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormatting,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: false, // TODO: Implement isActive for Remove Formatting
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
      {sections[0].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* TODO: Font Family */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font Size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}

      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List */}
      {sections[2].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}
    </div>
  );
}
