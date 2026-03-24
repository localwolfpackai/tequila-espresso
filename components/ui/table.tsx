"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot className={cn("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  );
}

function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("border-b border-border transition-colors hover:bg-muted/50", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("p-2 align-middle", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />;
}

/** Active sort direction for one column; `null` means this column is not the sort key. */
export type TableSortDirection = "asc" | "desc" | null;

/** Maps sort state to `aria-sort` on `<th>`. */
export function tableAriaSort(direction: TableSortDirection): "ascending" | "descending" | "none" {
  if (direction === "asc") return "ascending";
  if (direction === "desc") return "descending";
  return "none";
}

/** Cycles sort: none → asc → desc → none (typical tri-state header). */
export function tableCycleSort(direction: TableSortDirection): TableSortDirection {
  if (direction === null) return "asc";
  if (direction === "asc") return "desc";
  return null;
}

type SortPrimitive = string | number | boolean | null | undefined;

function normalizeSortValue(value: SortPrimitive): string | number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}

/**
 * Compare two cell values for ascending order; `null` / `undefined` sort last.
 * NOTE: Lexicographic for strings via `localeCompare`.
 */
export function tableCompareValues(a: SortPrimitive, b: SortPrimitive): number {
  const na = normalizeSortValue(a);
  const nb = normalizeSortValue(b);
  if (na === null && nb === null) return 0;
  if (na === null) return 1;
  if (nb === null) return -1;
  if (typeof na === "number" && typeof nb === "number") return na - nb;
  return String(na).localeCompare(String(nb), undefined, { sensitivity: "base", numeric: true });
}

export function tableSortRows<T>(
  rows: readonly T[],
  getValue: (row: T) => SortPrimitive,
  direction: Exclude<TableSortDirection, null>,
): T[] {
  const mult = direction === "asc" ? 1 : -1;
  return [...rows].sort((x, y) => mult * tableCompareValues(getValue(x), getValue(y)));
}

export type SortableTableHeadProps = Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "scope"> & {
  /** Current sort for this column, or `null` if another column is active / unsorted. */
  sortDirection: TableSortDirection;
  /** Called when the header button is activated (click or Enter / Space). */
  onSort: () => void;
  /** Human-readable column name for the sort control label (e.g. "Name"). */
  sortLabel: string;
};

const SortIcon = ({ direction }: { direction: TableSortDirection }) => {
  if (direction === "asc") return <ArrowUp className="size-4 shrink-0" aria-hidden />;
  if (direction === "desc") return <ArrowDown className="size-4 shrink-0" aria-hidden />;
  return <ChevronsUpDown className="size-4 shrink-0 opacity-60" aria-hidden />;
};

/**
 * Sortable column header: `th` with an inner `button`, correct `aria-sort`, keyboard support.
 */
const SortableTableHead = React.forwardRef<HTMLTableCellElement, SortableTableHeadProps>(
  ({ className, children, sortDirection, onSort, sortLabel, ...props }, ref) => {
    const sortStateLabel =
      sortDirection === "asc"
        ? "sorted ascending"
        : sortDirection === "desc"
          ? "sorted descending"
          : "not sorted";

    return (
      <th
        ref={ref}
        scope="col"
        aria-sort={tableAriaSort(sortDirection)}
        className={cn(
          "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          className={cn(
            "inline-flex w-full items-center justify-start gap-2 rounded-md px-1 py-1 text-left text-sm font-medium text-foreground transition-colors",
            "hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          onClick={onSort}
          aria-label={`Sort by ${sortLabel}, ${sortStateLabel}`}
        >
          <span className="min-w-0 flex-1 truncate">{children}</span>
          <SortIcon direction={sortDirection} />
        </button>
      </th>
    );
  },
);
SortableTableHead.displayName = "SortableTableHead";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  SortableTableHead,
};
