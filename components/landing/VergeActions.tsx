'use client'
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import VergeAudio from "./VergeAudio";

const VergeActions = () => {
    const t = useTranslations("Display");
    // verse is stored at state.verse.verse
    const verse = useSelector((s: any) => s?.verse?.verse);
    return (
        <section className="w-full max-w-[1280px] mx-auto flex py-4 px-4 justify-center md:justify-between">
            <div>
                <VergeAudio />
            </div>
        </section>
    )
}

export default VergeActions
