import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type TableEmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  columns: string[];
  className?: string;
};

export function TableEmptyState({ title, description, action, columns, className }: TableEmptyStateProps) {
  const colCount = columns.length;

  return (
    <div className={cn("w-full", className)}>
      <Table aria-label={title}>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col} scope="col">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={colCount} className="h-48 align-middle">
              <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full border border-dashed border-border bg-muted/40 text-muted-foreground">
                  <Inbox className="size-6" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="max-w-sm space-y-1">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {action ? <div className="pt-1">{action}</div> : null}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function TableEmptyStateActionButton(props: { children: string; onClick?: () => void }) {
  return (
    <Button type="button" variant="secondary" size="sm" onClick={props.onClick}>
      {props.children}
    </Button>
  );
}
