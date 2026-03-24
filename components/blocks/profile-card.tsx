import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProfileCardProps = {
  name: string;
  role: string;
  bio?: string;
  location?: string;
  email?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  statusLabel?: string;
  className?: string;
};

export function ProfileCard({
  name,
  role,
  bio,
  location,
  email,
  avatarSrc,
  avatarAlt,
  statusLabel,
  className,
}: ProfileCardProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className={cn("max-w-md", className)}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={avatarAlt ?? `${name} portrait`}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-full border border-border object-cover"
            unoptimized
          />
        ) : (
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-lg font-semibold text-foreground"
            aria-hidden
          >
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-xl">{name}</CardTitle>
            {statusLabel ? (
              <Badge variant="secondary" className="font-normal">
                {statusLabel}
              </Badge>
            ) : null}
          </div>
          <CardDescription>{role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {bio ? <p className="text-sm text-muted-foreground">{bio}</p> : null}
        <dl className="space-2 text-sm text-muted-foreground">
          {location ? (
            <div className="flex gap-2">
              <dt className="sr-only">Location</dt>
              <dd className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                <span>{location}</span>
              </dd>
            </div>
          ) : null}
          {email ? (
            <div className="flex gap-2">
              <dt className="sr-only">Email</dt>
              <dd className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                <a href={`mailto:${email}`} className="text-primary underline-offset-4 hover:underline">
                  {email}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          View profile
        </Button>
      </CardContent>
    </Card>
  );
}
