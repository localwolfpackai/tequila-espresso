import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Active users", value: "24.2k", change: "+6.1%" },
  { label: "Conversion", value: "8.4%", change: "+1.2%" },
  { label: "Revenue", value: "$91.4k", change: "+12.7%" },
  { label: "Churn", value: "1.4%", change: "-0.4%" },
];

export function StatsGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-success">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
