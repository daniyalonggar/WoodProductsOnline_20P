import React from "react";

export function CatalogItem({ title, isActive, onSelect }) {
    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            onSelect();
            event.preventDefault();
        }
    };

    return (
        <div
            role="tab"
            tabIndex={0}
            aria-selected={isActive}
            onClick={onSelect}
            onKeyDown={handleKeyDown}
            className={`
        flex gap-2 justify-center items-center 
        py-4 px-16 bg-white border border-solid
        min-h-[50px] text-base 
        max-md:py-2 max-md:px-4 max-md:min-h-[60px] max-md:text-sm
        max-sm:py-1 max-sm:px-2 max-sm:min-h-[60px] max-sm:text-s
        whitespace-nowrap transition-all duration-200 ease-in-out
        hover:bg-neutral-50 focus:outline-none
        focus:ring-2 focus:ring-neutral-700
        ${isActive
                ? "z-10 border-2 border-neutral-700 font-bold"
                : "border-zinc-300"
            }
        `}
        >
            <div className="self-stretch my-auto opacity-90">{title}</div>
        </div>
    );
}
