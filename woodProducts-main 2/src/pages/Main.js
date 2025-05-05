import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import InfoCardsSection from "../components/cards/InfoCardsSection";
import {CatalogNavbar} from "../components/navbars/CatalogNavbar";
import ProductCard from "../components/cards/ProductCard";
import AssistanceForm from "../components/boxes/AssistanceForm";
import Container from "../components/boxes/Container";
import {fetchProductsAPI} from "../api";
import {debounce} from "lodash";

const Main = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Дебаунс для предотвращения лишних запросов
    const fetchProducts = debounce(async (category) => {
        setLoading(true);
        try {
            const filters = category ? {category} : {};
            const data = await fetchProductsAPI(filters);
            setProducts(data.results);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, 300); // 300 мс задержки перед выполнением

    useEffect(() => {
        fetchProducts(selectedCategory);
        // Очистка эффекта при размонтировании
        return () => fetchProducts.cancel();
    }, [selectedCategory]);

    const displayedProducts = products.slice(0, 8);

    const handleShowAll = () => {
        const queryParams = selectedCategory ? `?category=${selectedCategory}` : "";
        navigate(`/products${queryParams}`);
    };

    return (
        <div>
            <div
                className="flex flex-col font-bold leading-tight text-center text-white m-4"
                role="banner"
            >
                <div
                    className="flex relative flex-col justify-center items-center px-20 py-32 w-full min-h-[700px] max-md:px-5 max-md:py-24 max-md:max-w-full"
                >
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/90756a628bf4fec05cced90a737b13e23087729327007d01e1aa03a0bd68d4b3"
                        className="object-cover absolute inset-0 size-full"
                        alt="Wood Stile architectural background"
                        role="presentation"
                    />
                    <div
                        className="flex relative flex-col items-center px-12 pt-32 pb-6 mb-0 max-w-full bg-zinc-800 bg-opacity-50 rounded-full w-[440px] h-[440px] max-md:px-5 max-md:pt-24 max-md:mb-2.5 max-md:w-[340px] max-md:h-[340px]"
                        role="main"
                    >
                        <h1 className="text-4xl tracking-tighter">Classic Wood Stile</h1>
                        <p className="text-xl tracking-tight text-orange-200">
                            enterior-exterior
                        </p>
                        <p className="self-stretch mt-4 text-base leading-5">
                            Приглашает к сотрудничеству архитекторов, дизайнеров и строителей
                        </p>
                        <button
                            className="mt-9 px-4 py-2 max-w-full text-base
                            tracking-wider leading-5 uppercase whitespace-nowrap
                            bg-stone-500 w-[150px] hover:bg-stone-600

                            md:w-[150px]"
                            aria-label="Learn more about Wood Stile services"
                        >
                            подробнее
                        </button>
                    </div>
                </div>
            </div>

            <Container>
                <InfoCardsSection/>
                <div className="flex flex-col">
                    <div className="flex">
                        <h1 className="text-[#3B3937] font-[PermianSerifTypeface] lg:text-[52px] text-[30px] font-bold leading-[64px] tracking-[-0.64px]">
                            Витрина товаров
                        </h1>
                    </div>
                    <div>
                        <div className="pt-8">
                            <CatalogNavbar onCategorySelect={setSelectedCategory}/>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            {loading ? (
                                <p className="text-center">Загрузка...</p>
                            ) : (
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mt-10">
                                    {displayedProducts.map((product, index) => (
                                        <ProductCard key={index} productData={product}/>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className="flex flex-col pt-8 text-base font-bold tracking-wider leading-snug text-center uppercase text-neutral-700"
                        >
                            <button
                                aria-label="Show more content"
                                className="px-14 py-6 w-full border border-solid border-neutral-700 border-opacity-20 max-md:px-5 max-md:max-w-full"
                                onClick={handleShowAll}
                            >
                                показать все
                            </button>
                        </div>
                    </div>
                    <div className="pt-14">
                        <AssistanceForm/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Main;
