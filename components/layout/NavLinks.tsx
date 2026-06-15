"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const locale = useLocale();
  const t = useTranslations("Header");
  const pathname = usePathname() || "/";

  const items = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/how-it-works`, label: t("how_it_works") },
    { href: `/${locale}/faq`, label: t("faq") },
  ];

  return (
    <ul className="hidden sm:flex items-center gap-4 text-sm">
      {items.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`hover:underline ${
                active ? "font-semibold" : "text-slate-700 dark:text-slate-300"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
