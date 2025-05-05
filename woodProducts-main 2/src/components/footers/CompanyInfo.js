import * as React from "react";

export function CompanyInfo() {
    return (
        <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start text-sm leading-tight text-white max-md:mt-10">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/296c6e93949ac1a4d3cf605f2255735487bce187855295476910172a2393c6ea?placeholderIfAbsent=true&apiKey=16603df5d5d944c0a2f195bca3358cf0"
                    className="object-contain aspect-[1.76] fill-white w-[90px]"
                    alt="Company logo"
                />
                <div className="mt-5 opacity-60">Фабрика G&G. 2022</div>
                <div className="self-stretch mt-1.5 opacity-60">© Все права защищены</div>
            </div>
        </div>
    );
}