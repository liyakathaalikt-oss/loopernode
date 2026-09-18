"use client";

import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  extras: React.ReactNode;
}

export function ConditionalLayout({ header, footer, children, extras }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Hide global elements on CMS admin pages
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div id="main-content" className="flex-1">
        {children}
      </div>
    );
  }

  return (
    <>
      {header}
      <div id="main-content" className="flex-1">
        {children}
      </div>
      {footer}
      {extras}
    </>
  );
}
