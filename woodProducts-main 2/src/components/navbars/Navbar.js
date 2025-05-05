import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/context";
import { useSelector } from 'react-redux';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { openAuthModal, openProfileModal } = useContext(AppContext);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1135);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const navigationLinks = [
        {text: "Доставка", href: "/delivery"},
        {text: "О нас", href: "/about"},
        {text: "Контакты", href: "/contacts"},
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="relative bg-neutral-700" role="navigation" aria-label="Main navigation">
            <div className="flex flex-col justify-center items-center px-16 py-6 w-full max-md:px-5">
                <div className="flex gap-10 items-center w-full max-w-screen-xl max-lg:justify-between">
                    <a href="/" className="flex-shrink-0">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8e84c0fa3058d5450c36cd33bf42073187fefa8055feb777ea1561967ceb099"
                            className="object-contain max-w-full aspect-[1.77] w-[106px]"
                            alt="Sofia Doors Logo"
                        />
                    </a>

                    {isMobile ? (
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-white"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle navigation menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12"/>
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                    ) : (
                        <>
                            <div className="flex gap-9 items-start self-stretch my-auto">
                                {navigationLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="text-white hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    >
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 ml-auto">
                                <a
                                    href="mailto:support@sofiadoors.com"
                                    className="text-orange-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-200"
                                >
                                    support@sofiadoors.com
                                </a>
                                {!token && (
                                    <button
                                        className="text-orange-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        onClick={openAuthModal}
                                    >
                                        Войти
                                    </button>
                                )}
                                {token && (
                                    <button
                                        className="text-orange-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        onClick={openProfileModal}
                                    >
                                        Профиль
                                    </button>
                                )}
                                <div className="flex flex-col items-center">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3b3e0d6c6f3cf004dba33e0bc3efddc897445a4435415de1c4fd6b949789797"
                                        className="object-contain w-[34px]"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                    <button
                                        className="px-4 py-2 text-sm font-bold tracking-wider uppercase border border-white bg-stone-500 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        aria-label="Open catalog"
                                        onClick={() => window.location.href = '/catalogs'}
                                    >
                                        Каталог
                                    </button>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/379e3fb20d0a0159c8bbe3d0ca9c2a5bdef891679bc4a133e1d60f162f41d25e"
                                        className="object-contain w-[65px] mt-2"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {isMobile && isMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="absolute top-full left-0 w-full bg-neutral-700 shadow-lg z-50"
                        role="menu"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navigationLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-white hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    role="menuitem"
                                >
                                    {link.text}
                                </a>
                            ))}
                            <a
                                href="mailto:support@sofiadoors.com"
                                className="text-orange-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-200"
                                role="menuitem"
                            >
                                support@sofiadoors.com
                            </a>
                            {!token && (
                                <button
                                    className="text-orange-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    role="menuitem"
                                    onClick={() => { setIsMenuOpen(false); openAuthModal(); }}
                                >
                                    Войти
                                </button>
                            )}
                            {token && (
                                <button
                                    className="text-orange-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    role="menuitem"
                                    onClick={() => { setIsMenuOpen(false); openProfileModal(); }}
                                >
                                    Профиль
                                </button>
                            )}
                            <button
                                className="px-4 py-2 text-sm font-bold tracking-wider uppercase border border-white bg-stone-500 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                role="menuitem"
                                aria-label="Open catalog"
                                onClick={() => { setIsMenuOpen(false); window.location.href = '/catalogs'; }}
                            >
                                Каталог
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
