import React from 'react';
import InfoCard from './InfoCard';
import ImageFeature from "../images/ImageFeature";

const doorImage = 'https://metako.kz/wp-content/uploads/2021/10/dveri-po-individualnomu-zakazu-02-1.jpg';
const frezImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIAEa4odze_iibXB9uxy3U_htrz-yR9z98LA&s';

const InfoCardsSection = () => {
    return (
        <section className="py-12">
            <div>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                        <InfoCard
                            imgUrl={doorImage}
                            title="Двери на заказ"
                            description="На собственной фабрике мы создаем красивые, безопасные и практически вечные двери, межкомнатные перегородки, стеновые панели и другие решения для вашего интерьера."
                            buttonText="Заказать уникальную дверь"
                            onButtonClick={() => console.log('Нажали на кнопку заказа двери')}
                        />
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <InfoCard
                            imgUrl={frezImage}
                            title="3D фрезеровка"
                            description="Изделия, которые создают фрезерный оттиск, управляемый компьютером, отличаются высочайшим качеством, абсолютной детализацией и идеальной точностью."
                            buttonText="Выбрать из каталога"
                            onButtonClick={() => console.log('Нажали на кнопку выбора из каталога')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoCardsSection;
