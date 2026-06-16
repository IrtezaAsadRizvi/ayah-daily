'use client'
import { Coffee } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    const t = useTranslations("Footer");
    const tHeader = useTranslations("Header");
    const tSurah = useTranslations("Surah");
    const locale = useLocale();

    const links = [
        { href: `/${locale}`, label: tHeader("home") },
        { href: `/${locale}/surahs`, label: tSurah("surahs") },
        { href: `/${locale}/about`, label: tHeader("about") },
        { href: `/${locale}/how-it-works`, label: tHeader("how_it_works") },
        { href: `/${locale}/faq`, label: tHeader("faq") },
    ];

    return (
        <footer className="border-t border-black dark:border-slate-500">
            <div className="mx-auto flex flex-col gap-4 max-w-[1280px] px-4 py-6 text-sm text-slate-600 dark:text-slate-400">
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href} className="hover:underline">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-between">
                    <p>
                        <span className="text-xl relative top-[2px]">©</span> Ayah Daily, {t('copyright')} ({year})
                    </p>
                    <a
                        href="https://buymeacoffee.com/irtezaasad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:underline font-medium"
                        aria-label="Buy me a coffee"
                        title="Buy me a coffee"
                    >
                        <Coffee size={18} />
                        <span>{t('support')}</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
