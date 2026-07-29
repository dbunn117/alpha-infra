import Link from "next/link";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="stat-number text-5xl font-semibold">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This page went off course.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back on solid ground.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(cta({ variant: "primary", size: "md" }))}>
          Back home
        </Link>
        <Link
          href="/services"
          className={cn(cta({ variant: "outline", size: "md" }))}
        >
          See services
        </Link>
      </div>
    </section>
  );
}
