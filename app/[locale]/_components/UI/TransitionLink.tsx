"use client";
import { useRouter, usePathname } from "next/navigation";
import { animatePageOut } from "@/app/[locale]/utils/animations";
import Link from "next/link";

export default function TransitionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Link href={href} onClick={() => animatePageOut(href, router)}>
      {children}
    </Link>
  );
}
