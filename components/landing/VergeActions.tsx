'use client'
import VergeAudio from "./VergeAudio";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";

const VergeActions = () => {
    return (
        <section className="w-full max-w-[1280px] mx-auto flex py-4 px-4 justify-center md:justify-between items-center gap-2">
            <div className="flex items-center gap-1">
                <BookmarkButton />
                <ShareButton />
            </div>
            <div>
                <VergeAudio />
            </div>
        </section>
    )
}

export default VergeActions
