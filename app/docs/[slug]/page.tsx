import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const docsContent: Record<string, { title: string; description: string; a11y: string; related: string[] }> = {
  breadcrumb: {
    title: "Breadcrumb",
    description:
      "Shows where you are in the hierarchy, with list semantics, a clear current page, and optional asChild links.",
    a11y: "Nav landmark with aria-label, ordered list, separators hidden from assistive tech, aria-current on the active crumb.",
    related: ["pagination", "navigation-menu", "sidebar"],
  },
  pagination: {
    title: "Pagination",
    description: "Moves between pages with previous/next, numbered links, and ellipsis for long ranges.",
    a11y: "Nav landmark with aria-label; active page uses aria-current; Previous and Next are explicit text.",
    related: ["breadcrumb", "button", "tabs"],
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "Actions and options in a Radix menu—submenus, checkboxes, and radio groups when you need them.",
    a11y: "Keyboard, focus, and typeahead match platform expectations; destructive items can use a dedicated style.",
    related: ["menubar", "navigation-menu", "popover"],
  },
  "navigation-menu": {
    title: "Navigation Menu",
    description: "Primary site navigation with expandable panels and content aligned to the viewport.",
    a11y: "Radix Navigation Menu supplies the expected keyboard model and ARIA for triggers and panels.",
    related: ["menubar", "breadcrumb", "tabs"],
  },
  menubar: {
    title: "Menubar",
    description: "A horizontal app menu bar with nested items, shortcuts, and familiar desktop patterns.",
    a11y: "Arrow-key navigation, roving focus, and checkbox/radio menu patterns via Radix Menubar.",
    related: ["dropdown-menu", "navigation-menu", "command"],
  },
  tabs: {
    title: "Tabs",
    description: "Tab list and panels with size variants for triggers and optional padded content areas.",
    a11y: "Tablist/tab roles, arrow keys between tabs, and visible focus rings from Radix Tabs.",
    related: ["navigation-menu", "sidebar", "pagination"],
  },
  sidebar: {
    title: "Sidebar",
    description: "Vertical navigation with optional collapse, active route styling from usePathname, and per-link current state.",
    a11y: "Named nav landmark; visible focus on links; current route uses aria-current=\"page\".",
    related: ["breadcrumb", "tabs", "navigation-menu"],
  },
  button: {
    title: "Button",
    description: "The default action control—variants, sizes, loading state, and asChild for composition.",
    a11y: "Keyboard activation, focus-visible rings, and aria-busy while loading.",
    related: ["input", "checkbox", "dialog"],
  },
  input: {
    title: "Input",
    description: "Text field with icon slots, visual variants, and states for validation feedback.",
    a11y: "Pair with labels or aria-label; focus-visible ring matches the rest of the system.",
    related: ["field", "form", "combobox"],
  },
  dialog: {
    title: "Dialog",
    description: "Modal layer with focus trap, overlay, and escape or explicit close.",
    a11y: "Radix Dialog provides aria-modal plus labelledby and describedby hooks for titles and helper text.",
    related: ["alert-dialog", "sheet", "popover"],
  },
};

export default async function DocsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docsContent[slug];

  if (!doc) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Component</p>
        <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
        <p className="text-sm text-muted-foreground">
          Use this page to align engineering and design—then cross-check related patterns below.
        </p>
      </header>

      <section aria-labelledby="a11y-heading">
        <Card>
          <CardHeader>
            <h2 id="a11y-heading" className="font-semibold leading-none tracking-tight">
              Accessibility
            </h2>
            <CardDescription>What screen readers and keyboard users get out of the box.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">{doc.a11y}</CardContent>
        </Card>
      </section>

      <section aria-labelledby="related-heading" className="space-y-3">
        <div>
          <h2 id="related-heading" className="text-lg font-semibold tracking-tight">
            Related components
          </h2>
          <p className="text-sm text-muted-foreground">
            Names match doc routes—search the sidebar or URL for the slug.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {doc.related.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
      </section>
    </main>
  );
}
