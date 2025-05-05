import * as React from "react";

export function FooterNavigation({links}) {
    return (
        <nav className="flex flex-col my-auto text-sm leading-tight text-white" role="navigation"
             aria-label="Footer navigation">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    className={`${index > 0 ? "mt-5" : ""} opacity-60 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white`}
                >
                    {link.text}
                </a>
            ))}
        </nav>
    );
}