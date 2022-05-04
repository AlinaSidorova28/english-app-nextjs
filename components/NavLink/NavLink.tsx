import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface NavLinkProps extends LinkProps {
    children: React.ReactElement;
    activeClassName?: string;
    exact?: boolean;
}

function NavLink({ children, activeClassName, href, exact = true, ...props }: NavLinkProps) {
    const router = useRouter();
    const isActive = exact
        ? router?.pathname === href
        : router?.pathname?.startsWith(href as string);

    return (
        <Link href={href} {...props}>
            {isActive ? React.cloneElement(children, { className: activeClassName }) : children}
        </Link>
    );
}

export default NavLink;
