"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to Tequila Espresso</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <Input id="email" type="email" placeholder="you@amberui.dev" />
        </Field>
        <Field>
          <FieldLabel htmlFor="password" required>
            Password
          </FieldLabel>
          <Input id="password" type="password" placeholder="••••••••" />
          <FieldDescription>Use 8+ characters with one symbol.</FieldDescription>
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox />
          Remember me
        </label>
        <Button
          className="w-full"
          loading={loading}
          loadingText="Signing in..."
          onClick={() => {
            setLoading(true);
            window.setTimeout(() => setLoading(false), 900);
          }}
        >
          Sign in
        </Button>
      </CardContent>
    </Card>
  );
}
