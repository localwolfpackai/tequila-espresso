import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PricingCardProps = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
  badgeLabel?: string;
};

export function PricingCard({
  name,
  price,
  period = "/mo",
  description,
  features,
  ctaLabel,
  onCtaClick,
  highlighted = false,
  badgeLabel,
}: PricingCardProps) {
  return (
    <Card
      variant={highlighted ? "elevated" : "outlined"}
      className={cn(
        "relative flex h-full flex-col",
        highlighted && "border-primary shadow-md ring-2 ring-primary/20",
      )}
    >
      {badgeLabel ? (
        <div className="absolute end-6 top-6">
          <Badge variant="default">{badgeLabel}</Badge>
        </div>
      ) : null}
      <CardHeader className={cn(badgeLabel && "pe-24")}>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="pt-2">
          <span className="text-3xl font-semibold tracking-tight text-foreground">{price}</span>
          <span className="text-sm text-muted-foreground">{period}</span>
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm font-medium text-foreground">Includes</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={highlighted ? "default" : "outline"} onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
