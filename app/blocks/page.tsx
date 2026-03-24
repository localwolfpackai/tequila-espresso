import { Layers, Shield, Zap } from "lucide-react";
import { CtaSection } from "@/components/blocks/cta-section";
import { FeatureCard } from "@/components/blocks/feature-card";
import { LoginForm } from "@/components/blocks/login-form";
import { PricingCard } from "@/components/blocks/pricing-card";
import { ProfileCard } from "@/components/blocks/profile-card";
import { StatsGrid } from "@/components/blocks/stats-grid";
import { TableEmptyState, TableEmptyStateActionButton } from "@/components/blocks/table-empty-state";
import { Button } from "@/components/ui/button";

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 md:space-y-16 md:px-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Block Gallery</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Production-ready block patterns tuned for visual rhythm, clear hierarchy, and fast composition in real products.
        </p>
      </section>

      <StatsGrid />

      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Feature cards</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Use these as benefit clusters in marketing and onboarding surfaces.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          <FeatureCard
            icon={<Zap className="size-5" strokeWidth={2} />}
            title="Fast by default"
            description="Optimistic updates and edge-ready caching patterns ship with every surface."
          />
          <FeatureCard
            icon={<Shield className="size-5" strokeWidth={2} />}
            title="Accessible core"
            description="Keyboard paths, focus rings, and semantic structure are first-class, not bolted on."
          />
          <FeatureCard
            icon={<Layers className="size-5" strokeWidth={2} />}
            title="Composable blocks"
            description="Mix cards, data displays, and forms without fighting the design system."
          />
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Pricing</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Contrast and spacing emphasize the recommended plan without aggressive visual noise.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <PricingCard
            name="Starter"
            price="$0"
            period="/mo"
            description="For individuals exploring Tequila Espresso."
            features={["Up to 3 projects", "Community support", "Core components"]}
            ctaLabel="Start free"
          />
          <PricingCard
            name="Team"
            price="$48"
            period="/seat/mo"
            description="For product teams shipping together."
            features={["Unlimited projects", "Shared libraries", "Priority support", "Audit-ready logs"]}
            ctaLabel="Start trial"
            highlighted
            badgeLabel="Popular"
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            period=""
            description="For regulated environments and scale."
            features={["Dedicated support", "SLA", "SSO & SCIM", "Custom contracts"]}
            ctaLabel="Contact sales"
          />
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Profile</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Great for team cards, account hubs, and customer directory views.
          </p>
        </div>
        <ProfileCard
          name="Jordan Lee"
          role="Design systems lead"
          bio="Building cohesive UI kits and documentation that keep teams aligned."
          location="Portland, OR"
          email="jordan@amberui.dev"
          statusLabel="Available"
        />
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Table empty state</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Empty states include clear context and the next best action.
          </p>
        </div>
        <TableEmptyState
          title="No invoices yet"
          description="When you create or import invoices, they will appear in this table."
          columns={["Invoice", "Status", "Amount", "Due"]}
          action={<TableEmptyStateActionButton>Create invoice</TableEmptyStateActionButton>}
        />
      </section>

      <CtaSection
        title="Ready to compose faster?"
        description="Use these blocks as starting points—swap copy, wire data, and ship without rebuilding layout from scratch."
      >
        <Button size="lg">Open docs</Button>
        <Button size="lg" variant="outline">
          View playground
        </Button>
      </CtaSection>

      <section className="grid place-items-start pt-2">
        <LoginForm />
      </section>
    </main>
  );
}
