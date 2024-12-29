"use client";

import { cn } from "@/lib/utils";

import {
  Bold,
  ChevronDown,
  Code,
  Highlighter,
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";
import { type Level } from "@tiptap/extension-heading";
import { ChromePicker, type ColorResult } from "react-color";

function HighlightColorButton() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight")?.color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 flex flex-col gap-y-0.5 items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden shrink-0">
          <Highlighter className="size-4" />
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <ChromePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TextColorButton() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle")?.color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden shrink-0">
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <ChromePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeadingLevelButton() {
  const { editor } = useEditorStore();

  const headings = [
    {
      label: "Texto normal",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Título 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Título 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Título 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Título 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Título 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeading = () => {
    for (let heading of headings) {
      if (editor?.isActive(`heading`, { level: heading.value })) {
        return `Título ${heading.value}`;
      }
    }

    return "Texto normal";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDown className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FontFamilyButton() {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Verdana", value: "Verdana" },
    { label: "Georgia", value: "Georgia" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle")?.fontFamily || "Arial"}
          </span>
          <ChevronDown className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            style={{ fontFamily: value }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle")?.fontFamily === value &&
                "bg-neutral-200/80"
            )}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
      <FontFamilyButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font Size */}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}

      <TextColorButton />
      <HighlightColorButton />

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
