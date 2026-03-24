import { useMemo, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  SortableTableHead,
  tableAriaSort,
  tableCompareValues,
  tableCycleSort,
  tableSortRows,
  type TableSortDirection,
} from "@/components/ui/table";

describe("table sort helpers", () => {
  it("tableAriaSort maps directions", () => {
    expect(tableAriaSort("asc")).toBe("ascending");
    expect(tableAriaSort("desc")).toBe("descending");
    expect(tableAriaSort(null)).toBe("none");
  });

  it("tableCycleSort cycles none → asc → desc → none", () => {
    expect(tableCycleSort(null)).toBe("asc");
    expect(tableCycleSort("asc")).toBe("desc");
    expect(tableCycleSort("desc")).toBe(null);
  });

  it("tableCompareValues sorts nulls last and respects locale", () => {
    expect(tableCompareValues(null, 1)).toBeGreaterThan(0);
    expect(tableCompareValues(1, null)).toBeLessThan(0);
    expect(tableCompareValues("b", "a")).toBeGreaterThan(0);
    expect(tableCompareValues(2, 10)).toBeLessThan(0);
  });

  it("tableSortRows sorts by getter", () => {
    const rows = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(tableSortRows(rows, (r) => r.n, "asc").map((r) => r.n)).toEqual([1, 2, 3]);
    expect(tableSortRows(rows, (r) => r.n, "desc").map((r) => r.n)).toEqual([3, 2, 1]);
  });
});

function SortableTableDemo() {
  type Row = { name: string; score: number };
  const data: Row[] = useMemo(
    () => [
      { name: "Zed", score: 10 },
      { name: "Ann", score: 5 },
    ],
    [],
  );

  const [sortKey, setSortKey] = useState<"name" | "score">("name");
  const [dir, setDir] = useState<TableSortDirection>("asc");

  const sorted = useMemo(() => {
    if (dir === null) return [...data];
    if (sortKey === "name") return tableSortRows(data, (r) => r.name, dir);
    return tableSortRows(data, (r) => r.score, dir);
  }, [data, sortKey, dir]);

  const setColumnSort = (key: "name" | "score") => {
    if (sortKey !== key) {
      setSortKey(key);
      setDir("asc");
      return;
    }
    setDir((d) => tableCycleSort(d));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableTableHead
            sortLabel="Name"
            sortDirection={sortKey === "name" ? dir : null}
            onSort={() => setColumnSort("name")}
          >
            Name
          </SortableTableHead>
          <SortableTableHead
            sortLabel="Score"
            sortDirection={sortKey === "score" ? dir : null}
            onSort={() => setColumnSort("score")}
          >
            Score
          </SortableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((r) => (
          <TableRow key={r.name}>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

describe("SortableTableHead", () => {
  it("updates aria-sort and row order when sorting", async () => {
    render(<SortableTableDemo />);

    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

    const scoreButton = screen.getByRole("button", { name: /sort by score/i });
    await userEvent.click(scoreButton);

    const scoreHeader = screen.getByRole("columnheader", { name: /score/i });
    expect(scoreHeader).toHaveAttribute("aria-sort", "ascending");

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Ann");
    expect(rows[2]).toHaveTextContent("Zed");
  });
});
