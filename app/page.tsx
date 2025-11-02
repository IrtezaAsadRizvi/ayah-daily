// app/page.tsx
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
    return (
        <section className="h-full w-full flex flex-col justify-between items-center">
            <VergeDisplay/>
            <VergeActions/>
        </section>
    );
}
