"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

type AudioItem = { key: string; reciter?: string; url?: string };

const VergeAudio = () => {
    const t = useTranslations("Display");
    const verse = useSelector((s: any) => s?.verse?.data);

    const audioList: AudioItem[] = useMemo(() => {
        const src = verse?.audio ?? {};
        return Object.entries(src)
            .map(([key, val]: [string, any]) => ({
                key,
                reciter: val?.reciter,
                url: val?.url,
            }))
            .filter((x) => !!x.url)
            .sort((a, b) => Number(a.key) - Number(b.key));
    }, [verse]);

    const [menuOpen, setMenuOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const audioKey = useMemo(() => audioList.map((i) => i.url).join("|"), [audioList]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!audioRef.current) {
            const el = new Audio();
            el.preload = "none";
            el.crossOrigin = "anonymous";
            audioRef.current = el;
        }
    }, []);

    useEffect(() => {
        setIsPlaying(false);
        setMenuOpen(false);
        setCurrentIndex(0);

        const el = audioRef.current;
        if (el) {
            el.pause();
            el.preload = "none";
            el.src = "";
        }
    }, [audioKey]);

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        const onEnded = () => setIsPlaying(false);
        const onError = () => setIsPlaying(false);
        el.addEventListener("ended", onEnded);
        el.addEventListener("error", onError);
        return () => {
            el.removeEventListener("ended", onEnded);
            el.removeEventListener("error", onError);
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setMenuOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [menuOpen]);

    const hasAudio = audioList.length > 0;
    const current = hasAudio ? audioList[currentIndex] : undefined;

    const playNow = async () => {
        const el = audioRef.current;
        if (!el || !hasAudio) return;
        try {
            el.preload = "auto";
            el.load();
            await el.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    };

    const handlePlayPause = async () => {
        const el = audioRef.current;
        if (!el || !hasAudio) return;

        if (isPlaying) {
            el.pause();
            setIsPlaying(false);
            return;
        }
        const url = current?.url;
        if (url && el.src !== url) el.src = url;
        await playNow();
    };

    const handleSelect = async (idx: number) => {
        const el = audioRef.current;
        setCurrentIndex(idx);
        setMenuOpen(false);
        if (!el || !hasAudio) return;

        const item = audioList[idx];
        if (!item?.url) return;

        if (el.src !== item.url) el.src = item.url;
        await playNow();
    };

    if (!hasAudio) return null;

    return (
        <div
            ref={wrapperRef}
            className="flex items-center justify-center gap-2 relative select-none"
        >
            {/* Play / Pause */}
            <button
                type="button"
                onClick={handlePlayPause}
                className="rounded-full inline-flex items-center gap-2"
                aria-label={isPlaying ? t("pause_audio") : t("play_audio")}
            >
                {isPlaying
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none"><circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="2" /><path fill="currentColor" d="M21 36h4.571V20H21zm9.143-16v16h4.571V20z" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none"><circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="2" /><path fill="currentColor" d="M23 18v20l16-10z" /></svg>}
            </button>

            {/* Arrow + current reciter, dropdown opens UP */}
            <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 inline-flex items-center justify-center gap-2 icon-button
                text-slate-600 dark:text-slate-400"
                aria-haspopup="listbox"
                aria-expanded={menuOpen}
                aria-label={t("choose_reciter") ?? "Choose reciter"}
            >
                {current?.reciter && (
                    <span className="ml-2 text-sm truncate max-w-[180px]">
                        {current.reciter}
                    </span>
                )}
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6.92779 0.130958C6.84054 0.0436284 6.7371 0 6.61759 0H0.44121C0.321648 0 0.218287 0.0436284 
                    0.130958 0.130958C0.0436284 0.218384 0 0.321745 0 0.441234C0 0.560699 0.0436284 0.66406 0.130958 
                    0.751413L3.21916 3.83962C3.30659 3.92694 3.40995 3.97067 3.52941 3.97067C3.64888 3.97067 3.75233 
                    3.92694 3.83959 3.83962L6.92779 0.751389C7.01503 0.66406 7.05882 0.560699 7.05882 0.44121C7.05882 
                    0.321745 7.01503 0.218384 6.92779 0.130958Z" fill="currentColor" />
                </svg>
            </button>

            {menuOpen && (
                <ul
                    role="listbox"
                    className="absolute bottom-full  right-0 z-20 min-w-[200px] rounded-xl border 
                    border-gray-200 dark:border-neutral-800 shadow-xl
                    bg-slate-500/5 dark:bg-white/5 backdrop-blur-md
                    divide-y divide-gray-200 dark:divide-neutral-800 overflow-hidden"
                >
                    {audioList.map((item, idx) => (
                        <li
                            key={`${item.key}-${item.url}`}
                            role="option"
                            aria-selected={idx === currentIndex}
                            onClick={() => handleSelect(idx)}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-[--action-hover-light] 
                                dark:hover:bg-[--action-hover-dark] ${idx === currentIndex ? "font-medium" : ""}`}
                        >
                            {item.reciter || `Reciter ${item.key}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VergeAudio;
