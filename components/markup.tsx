"use client";

import { track } from "@vercel/analytics";

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-200 dark:bg-gray-800 p-1 rounded-md text-gray-700 dark:text-gray-300">
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
      className="border-b pb-.5 border-gray-400 dark:border-gray-600"
      href={href}
      target="_blank"
      onClick={() => track(`link-${tr}`)}
    >
      {children}
    </a>
  );
}
