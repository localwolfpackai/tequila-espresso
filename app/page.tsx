import Link from "next/link";
import { ArrowRight, Blocks, BookOpen, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="relative overflow-hidden py-8 md:py-12">
      <div className="amber-mesh absolute inset-0 -z-20" aria-hidden />
      <div className="amber-grid-bg absolute inset-0 -z-10 opacity-90" aria-hidden />
      <div className="mx-auto max-w-6xl space-y-16">
        <section aria-labelledby="hero-heading" className="grid gap-10 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
          <div className="space-y-8 md:col-span-7 lg:col-span-6">
            <div className="space-y-6 border-l-2 border-primary/30 pl-5 md:pl-6">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-accent/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent-foreground">
                <Sparkles className="size-3.5 shrink-0 text-primary" aria-hidden />
                Design system
              </p>
              <h1
                id="hero-heading"
                className="max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl"
              >
                Warm, considered interfaces — from first screen to production.
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                Accessible primitives, token-driven themes, and documented patterns so you ship with confidence.
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                Start in the playground, skim component docs, then refine color and radius in Theme Studio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pl-5 md:pl-6">
              <Button asChild size="lg">
                <Link href="/playground">
                  Open playground <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/docs/button">Browse docs</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-3 md:col-span-5 lg:col-span-6 md:pt-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Stack</p>
            <div className="flex flex-wrap gap-2" aria-label="Included technologies">
              <Badge variant="outline">Next.js 16</Badge>
              <Badge variant="outline">React 19</Badge>
              <Badge variant="outline">Tailwind v4</Badge>
              <Badge variant="outline">Radix + Recharts</Badge>
            </div>
          </div>
        </section>

        <section aria-labelledby="pillars-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="pillars-heading" className="text-xl font-semibold tracking-tight">
              Built for product teams
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Three places to explore — each maps to how you actually work.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="motion-safe:hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Blocks className="size-4 text-primary" aria-hidden />
                  Primitives
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Typed, CVA-driven components with predictable keyboard behavior.
              </CardContent>
            </Card>
            <Card className="motion-safe:hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="size-4 text-primary" aria-hidden />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Per-component pages with usage, props, and accessibility callouts.
              </CardContent>
            </Card>
            <Card className="motion-safe:hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Palette className="size-4 text-primary" aria-hidden />
                  Theme Studio
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Live token edits with an on-page preview in light and dark.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
