'use client'
import { Coffee } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    const t = useTranslations("Footer");

    return (
        <footer className="border-t border-black dark:border-slate-500">
            <div className="mx-auto flex flex-col-reverse md:flex-row gap-4 max-w-[1280px] items-center 
                justify-between px-2 py-6 text-sm text-slate-600 dark:text-slate-400">
                <p><span className="text-xl relative top-[2px]">©</span> Ayah Daily, {t('copyright')} ({year})</p>

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
        </footer>
    );
};

export default Footer;
