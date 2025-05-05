import React from 'react';

const DeliveryAndPayment = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px] text-[40px] font-bold leading-[64px] tracking-[-0.64px]">
                    Доставка и оплата
                </h1>

                <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/2 mb-8 md:mb-0">
                        <img
                            src="https://media.istockphoto.com/id/1221101939/photo/delivery-concept-asian-man-hand-accepting-a-delivery-boxes-from-professional-deliveryman-at.jpg?s=612x612&w=0&k=20&c=jvZ_phbXmzOrCCZiGn8ZQO99a5skBJlclbujI5jGam8="
                            alt="Доставка"
                            className="w-full h-auto rounded shadow"
                        />
                    </div>

                    <div className="md:w-1/2 text-gray-800">
                        <p className="mb-6">
                            Срок пошива комплекта – 10-15 рабочих дней. Доставка от 2-х дней, в зависимости от региона.Стоимость доставки зависит от региона и рассчитывается индивидуально.
                        </p>
                        <p className="mb-4 font-semibold">Вы можете выбрать несколько способов оплаты:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>наличными при передаче курьеру (главное для курьерской доставки, при условии предоплаты не менее 30% от суммы заказа);</li>
                            <li>кредитной картой на сайте;</li>
                            <li>банковским переводом.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAndPayment;
