import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="bg-white text-gray-900">
            <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                <h1 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px]  font-bold leading-[64px] tracking-[-0.64px]">
                    H1. Длинный заголовок типовой страницы, чтобы настроить интерлиньяж
                </h1>
                <img
                    src="https://www.finestmulch.com/images/blocks/smallimage/thumb_1686840525truck-pic.jpg"
                    alt="Section"
                    className="w-full h-auto rounded mb-8"
                />

                <h2 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px]  font-bold leading-[64px] tracking-[-0.64px]">
                    H2. Многострочный заголовок, длина которого иногда бывает так некстати
                </h2>
                <p className="mb-4 leading-relaxed">
                    Эта страница создана для демонстрации блоков и элементов, которые используются на сайте, и служит
                    руководством для всех, кто работает над ним.
                </p>
                <p className="mb-8 leading-relaxed">
                    Дизайнеры и технологи отрабатывают здесь стили, чтобы добиться приемлемых результатов в различных
                    сочетаниях блоков и элементов. Контент-менеджеры и редакторы используют страницу в качестве
                    справочника по верстке типовых страниц. Здесь же рассказывается о некоторых общих правилах
                    оформления контента.
                </p>

                <img
                    src="https://www.woodproductskenya.co.ke/wp-content/uploads/elementor/thumbs/WOOD-PRODUCTS-BRCHURE-1-scaled-pjc4o8xmmnef6eaq2jslye3fqinok43r2teb4gh4iw.jpg"
                    alt="Section"
                    className="w-full h-auto rounded mb-8"
                />

                <h3 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px]  font-bold leading-[64px] tracking-[-0.64px]">
                    H3. Делаем заголовки нарочито длинными, чтобы убедиться в правильном интерлиньяжe
                </h3>
                <p className="mb-4 leading-relaxed">
                    Текст состоит из некоторого количества предложений. Одно предложение, даже очень распространённое,
                    сложное, текстом назвать нельзя, поскольку текст можно разделить на самостоятельные предложения.
                </p>

                <h4 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px] font-bold leading-[64px] tracking-[-0.64px]">
                    H4. Текст состоит из некоторого количества предложений. Одно предложение...
                </h4>
                <p className="mb-4 leading-relaxed">
                    Современная технология типографики – это наглядная демонстрация возможностей верстки.
                    Сегодня, когда недорогие дисплеи с высоким разрешением вошли в быт, красивые шрифты используются
                    повсюду.
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2 leading-relaxed">
                    <li>Вся типографика адаптируется под нужды бизнеса путем настройки величины линеек, отступов, полей
                        и выравнивания.
                    </li>
                    <li>Стилистически это подходит для самых разных тематик – от строгих промышленных до утонченных
                        творческих.
                    </li>
                    <li>Динамическая подстройка под размер экрана.</li>
                </ul>
                <p className="mb-8 leading-relaxed">
                    Этот текст не несет никакого смысла, он служит для демонстрации стилей. Одно предложение, даже очень
                    распространённое, сложное, текстом назвать нельзя, поскольку текст можно разделить на
                    самостоятельные предложения.
                </p>

                <h5 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px] font-bold leading-[64px] tracking-[-0.64px]">
                    H5. Текст состоит из некоторого количества предложений. Одно предложение...
                </h5>
                <p className="mb-8 leading-relaxed">
                    Здесь отражено само описание процесса настройки стилей. Один абзац. Ещё один абзац. Текст на русском
                    языке.
                    Другое предложение. Всякий разник, смешанный или простой. Всё это лишь условности.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold mb-6">
                    Делаем заголовки нарочито длинными, чтобы убедиться в правильном интерлиньяжe
                </h3>
                <p className="mb-8 leading-relaxed">
                    Текст состоит из некоторого количества предложений. Одно предложение, даже очень распространённое,
                    сложное,
                    текстом назвать нельзя, поскольку текст можно разделить на самостоятельные предложения.
                </p>

                <div className="flex flex-col md:flex-row md:space-x-8 mb-12">
                    <div className="flex items-center p-4 mb-4 md:mb-0 border rounded shadow-sm bg-gray-50 flex-grow">
                        <div className="flex-1">
                            <h4 className="font-semibold mb-2 text-gray-800">Услуги и сервис</h4>
                            <button className="text-red-600 font-medium hover:underline">Скачать</button>
                        </div>
                    </div>

                    <div className="flex items-center p-4 mb-4 md:mb-0 border rounded shadow-sm bg-gray-50 flex-grow">
                        <div className="flex-1">
                            <h4 className="font-semibold mb-2 text-gray-800">Правила безопасности</h4>
                            <button className="text-red-600 font-medium hover:underline">Скачать</button>
                        </div>
                    </div>

                    <div className="flex items-center p-4 border rounded shadow-sm bg-gray-50 flex-grow">
                        <div className="flex-1">
                            <h4 className="font-semibold mb-2 text-gray-800">Документы</h4>
                            <button className="text-red-600 font-medium hover:underline">Скачать</button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded mb-12">
                    <blockquote className="text-xl text-orange-700 font-semibold italic mb-6">
                        "Текст состоит из некоторого количества предложений. Одно предложение, даже очень
                        распространённое, сложное, текстом назвать нельзя, поскольку текст можно расчленить на
                        самостоятельные предложения."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="Author"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="font-semibold text-gray-900">Даниял</div>
                            <div className="text-sm text-gray-600">Специалист организации</div>
                        </div>
                    </div>
                </div>

                <p className="mb-8 leading-relaxed">
                    Текст состоит из некоторого количества предложений. Одно предложение, даже очень распространённое,
                    сложное,
                    текстом назвать нельзя, поскольку текст можно разделить на самостоятельные предложения. А часть
                    предложений
                    сочетаются по законам синтаксиса сложного предложения, но не текста.
                </p>

            </div>
        </div>
    );
};

export default AboutUsPage;
