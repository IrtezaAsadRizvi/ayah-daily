"use client"
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import LogoVector from "./LogoVector";

export default function Logo() {
    const enableDarkmode = useSelector((state:any) => state.ui.enableDarkmode)
    const locale = useLocale()
    return (
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="Ayah Daily home">
            <LogoVector fill={enableDarkmode ? '#FFFFFF' : '#000000'}/>
            <span className="font-extrabold text-lg flex flex-col leading-[20px]">
                <span>Ayah</span>
                <span>Daily</span>
            </span>
        </Link>
    );
}
