import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ inverted = false, compact = false }: { inverted?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${site.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={inverted ? "/brand/mhec-logo-white.svg" : "/brand/mhec-logo.svg"}
        alt=""
        width={44}
        height={46}
        className="h-11 w-auto"
      />
      {!compact && (
        <span className={`font-display leading-[1.05] ${inverted ? "text-white" : "text-ink"}`}>
          <span className="block text-[1.05rem] font-bold tracking-tight">Muscat Higher</span>
          <span className="block text-[1.05rem] font-bold tracking-tight">Education Centre</span>
        </span>
      )}
    </Link>
  );
}
