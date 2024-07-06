"use client";

import { track } from "@vercel/analytics";

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted p-1 text-muted-foreground rounded-md">
      {children}
    </code>
  );
}

export function A({
  href,
  tr,
  children,
}: {
  href: string;
  tr: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="border-b pb-.5"
      href={href}
      target="_blank"
      onClick={() => track(`link-${tr}`)}
    >
      {children}
    </a>
  );
}
