import * as React from "react";

const MapLocation = () => {
    const address = [
        "123154, г. Шымкент",
        "пр-т. Маршала Жукова, д. 52",
        "\"Мебельный Центр\""
    ];

    return (
        <div className="relative w-full h-[500px] rounded-lg shadow-sm overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed/v1/place?q=Маршала%20Жукова%2C%2052%2C%20Московская%20область&key=YOUR_GOOGLE_MAPS_API_KEY"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                title="Map showing location of Мебельный Центр"
            />

            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-md px-3 py-2 text-sm text-neutral-800 shadow">
                {address.map((line, index) => (
                    <div key={index} className="leading-tight">
                        {line}
                    </div>
                ))}
                <div className="w-3 h-3 mt-2 rounded-full bg-amber-500" />
            </div>
        </div>
    );
};

export default MapLocation;
