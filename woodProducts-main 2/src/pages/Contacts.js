import React from 'react';

const Contacts = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px] text-[40px] font-bold leading-[64px] tracking-[-0.64px]">
                Контакты
            </h1>
            <div className="flex flex-col md:flex-row md:space-x-5">
                <div className="md:w-1/3 bg-gray-100 p-5 rounded mb-6 md:mb-0">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-2">Адрес:</h3>
                        <p className="text-sm">
                            12345, г. Шымкент, пр-т Маршала Жукова, д. 52, "Мебельный Центр"
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-2">Режим работы:</h3>
                        <p className="text-sm">ВТ - СБ 10:00 - 19:00</p>
                        <p className="text-sm">ВС, ПН - Выходные</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-2">Телефон:</h3>
                        <p className="text-sm">
                            8 (900) 000-00-00 | 8 (900) 000-00-00
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-2">Группа в соц.сетях:</h3>
                        <p className="text-sm mb-2">
                            <a href="mailto:support@sofaoderts.com" className="text-blue-600 hover:underline">
                                support@sofaoderts.com
                            </a>
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-700 text-white text-xs font-bold"
                            >
                                ВК
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-white text-xs font-bold"
                            >
                                FB
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold"
                            >
                                TG
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex-grow bg-gray-200 rounded overflow-hidden min-h-[300px] relative">
                    <iframe
                        title="Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2249.158040358253!2d37.622504!3d55.753215!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5f0f87c391%3A0x33e5dd9f8c56598f!2sMoscow!5e0!3m2!1sen!2sru!4v1638193227502!5m2!1sen!2sru"
                        width="100%"
                        height="100%"
                        className="border-0"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
