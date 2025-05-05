import React from "react";

const AssistanceForm = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 bg-[#f8f4f0] p-6 md:p-12 rounded-lg">
            <div className="w-full md:w-1/2 md:pr-6">
                <img
                    src="https://www.oceanhomemag.com/wp-content/uploads/migration_images/Wood-Interior-Design/Woodinteriors.png"
                    alt="Interior Design"
                    className="w-full object-cover rounded-md"
                />
            </div>

            <div className="w-full md:w-1/2">
                <h2 className="font-[PermianSerifTypeface] text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-tight">
                    Нужна помощь с выбором?
                </h2>
                <p className="text-gray-600 pt-6 md:pt-8 lg:pt-10 mb-6 font-[Gilroy] text-lg md:text-[20px] lg:text-[22px] font-medium leading-tight">
                    Наши специалисты с радостью помогут Вам, оставьте свой номер телефона!
                </p>
                <form className="flex flex-col gap-4 pt-6 md:pt-8 lg:pt-10">
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                        <input
                            type="text"
                            placeholder="Как вас зовут?"
                            className="p-4 md:p-6 px-8 md:px-8 lg:px-12 rounded-md focus:outline-none focus:ring focus:ring-[#8b5e3c]"
                        />
                        <input
                            type="text"
                            placeholder="Ваш телефон"
                            className="p-4 md:p-6 px-8 md:px-8 lg:px-12 rounded-md focus:outline-none focus:ring focus:ring-[#8b5e3c]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-auto lg:w-[310px] h-[50px] lg:h-[60px] px-6 md:px-8 lg:px-[36px] py-3 md:py-[10px] lg:py-[15px] font-[Gilroy] font-bold tracking-widest flex justify-center items-center gap-2 lg:gap-[5px] bg-[#8b5e3c] text-white rounded-md hover:bg-[#6f492d] transition"
                    >
                        Связаться с нами
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AssistanceForm;
