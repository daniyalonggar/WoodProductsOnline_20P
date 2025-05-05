import * as React from "react";

function ImageFeature() {
    return (
        <div className="flex w-[620px] flex-col absolute justify-end items-center overflow-hidden max-md:max-w-full">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b39ee97d8d05656ec416db651ae871603ee4b9466a0d2fddaf16ef10052b404?placeholderIfAbsent=true&apiKey=16603df5d5d944c0a2f195bca3358cf0"
                alt="Featured content display"
                className="object-contain w-full aspect-[0.6]"
            />
        </div>
    );
}


export default ImageFeature;