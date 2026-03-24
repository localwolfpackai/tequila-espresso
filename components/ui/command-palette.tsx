"use client";

import * as React from "react";
import { Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command as CommandRoot, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type CommandPaletteProps = {
  items: { label: string; action: () => void }[];
};

export function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} leftIcon={<Command className="size-4" />}>
        Command Palette
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Jump anywhere</DialogTitle>
            <DialogDescription>Use Cmd/Ctrl + K to open globally.</DialogDescription>
          </DialogHeader>
          <CommandRoot>
            <CommandInput placeholder="Search actions..." />
            <CommandList>
              {items.map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => {
                    item.action();
                    setOpen(false);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandRoot>
        </DialogContent>
      </Dialog>
    </>
  );
}
