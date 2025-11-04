export default function Head() {
    const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "One Verse Daily",
        url: "https://ayah-daily.web.app",
        logo: "https://ayah-daily.web.app/favicon.ico",
        sameAs: [
            "https://github.com/IrtezaAsadRizvi"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
            />
        </>
    );
}