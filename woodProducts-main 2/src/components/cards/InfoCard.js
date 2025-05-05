import React from 'react';

const InfoCard = ({imgUrl, title, description, buttonText, link}) => {
    return (
        <article className="flex flex-col max-w-[620px] text-neutral-700">
            <img
                loading="lazy"
                src={imgUrl}
                alt={title}
                className="object-contain w-full aspect-[1.94] max-md:max-w-full"
            />
            <h2 className="self-start mt-10 font-[PermianSerifTypeface] font-bold text-4xl tracking-tighter leading-tight">
                {title}
            </h2>
            <p className="self-start mt-5 text-left text-base font-[Gilroy] leading-5 max-md:max-w-full">
                {description}
            </p>
            <a
                href={link}
                className="self-end mt-8 mr-12 font-bold text-base tracking-wider leading-snug text-right text-amber-700 uppercase max-md:mr-2.5"
                tabIndex="0"
                role="link"
            >
                {buttonText}
            </a>
            <div className="flex mt-5 w-full bg-zinc-300 min-h-[1px] max-md:max-w-full"/>
        </article>
    );
};

export default InfoCard;
