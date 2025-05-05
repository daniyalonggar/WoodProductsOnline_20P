import * as React from "react";
import {FooterNavigation} from "./FooterNavigation";
import {CompanyInfo} from "./CompanyInfo";
import {ContactInfo} from "./ContactInfo";

export const navigationLinks = [
    {text: "Межкомнатные двери", href: "#"},
    {text: "Мебель", href: "#"},
    {text: "Стеновые панели «Буазери»", href: "#"},
    {text: "Лестницы", href: "#"},
    {text: "Мебельные фасады", href: "#"}
];

export const secondaryLinks = [
    {text: "Доставка", href: "#"},
    {text: "О нас", href: "#"}
];

export function Footer() {
    return (
        <footer className="flex flex-col pt-16" role="contentinfo">
            <div className="flex flex-wrap gap-7 pl-20 w-full bg-neutral-700 max-md:pl-5 max-md:max-w-full">
                <div className="flex-auto py-24 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        <CompanyInfo/>
                        <ContactInfo/>
                    </div>
                </div>

                <FooterNavigation links={navigationLinks}/>

                <div
                    className="flex relative flex-col items-start px-20 py-24 text-sm leading-tight text-white min-h-[360px] max-md:px-5 max-md:max-w-full">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f1b0a9363c0a250686d66cc97e939b39ec6db97dfd319407539071593de0a5b?placeholderIfAbsent=true&apiKey=16603df5d5d944c0a2f195bca3358cf0"
                        className="object-cover absolute inset-0 size-full"
                        alt=""
                    />
                    <div className="flex relative gap-5 justify-between items-start max-w-full w-[251px]">
                        <nav className="flex flex-col mt-3" role="navigation" aria-label="Secondary navigation">
                            {secondaryLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`opacity-60 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white ${
                                        index > 0 ? "mt-5" : ""
                                    }`}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </nav>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b3de89801e90838595484c206caf33d85743559a226ebd4b9acdd7eaa09b4b9?placeholderIfAbsent=true&apiKey=16603df5d5d944c0a2f195bca3358cf0"
                            className="object-contain shrink-0 max-w-full aspect-[2.7] w-[108px]"
                            alt="Footer decoration"
                        />
                    </div>
                    <a
                        href="/privacy"
                        className="relative mt-14 opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white max-md:mt-10"
                    >
                        Политика конфиденциальности
                    </a>
                </div>
            </div>
        </footer>
    );
}