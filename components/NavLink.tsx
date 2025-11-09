"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  /** when true, only exact path matches will be considered active */
  exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      href,
      className,
      activeClassName,
      pendingClassName,
      exact = false,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname() || "/";

    const normalize = (p: string) => p.replace(/\/+$/, "") || "/";
    const hrefNorm = normalize(href);
    const pathNorm = normalize(pathname);

    const isActive = exact
      ? pathNorm === hrefNorm
      : pathNorm === hrefNorm ||
        (hrefNorm !== "/" && pathNorm.startsWith(hrefNorm));

    const classes = cn(className, isActive && activeClassName);

    // We use legacyBehavior to render an <a> so we can forward refs and props to it
    return (
      <Link href={href} legacyBehavior>
        <a ref={ref} className={classes} {...props} />
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
