"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/ga";

export default function GAClient() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = search?.toString() ? `${pathname}?${search}` : pathname;
    pageview(url);            // ← fires page_view here
  }, [pathname, search]);

  return null;
}
