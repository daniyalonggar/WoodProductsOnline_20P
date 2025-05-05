import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchCategories,
    selectCategories,
    selectCategoriesLoading,
    selectCategoriesError,
} from '../redux/categorySlice';

const CatalogPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(selectCategories);
    const loading = useSelector(selectCategoriesLoading);
    const error = useSelector(selectCategoriesError);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/products?category=${categoryId}`);
    };

    const rows = [];
    for (let i = 0; i < categories.length; i += 3) {
        rows.push(categories.slice(i, i + 3));
    }

    return (
        <div className="bg-white py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Каталог</h2>

                {loading && <p>Загрузка категорий...</p>}
                {error && <p className="text-red-500">Ошибка загрузки категорий: {error}</p>}

                <div className="space-y-8">
                    {!loading &&
                        rows.map((rowItems, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid grid-cols-3 gap-4"
                                style={{gridTemplateColumns: `repeat(${rowItems.length}, minmax(0, 1fr))`}}
                            >
                                {rowItems.map((item) => (
                                    <CatalogCard
                                        key={item.id}
                                        title={item.name}
                                        imageUrl={item.image}
                                        onClick={() => handleCategoryClick(item.id)}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const CatalogCard = ({title, imageUrl, onClick}) => {
    return (
        <div
            className="relative group w-full h-48 bg-gray-200 rounded overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
            />

            <div
                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                <div className="p-4 text-white">
                    <h3 className="font-semibold text-sm md:text-base mb-2">{title}</h3>
                    <button
                        className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200"
                        title="Подробнее"
                    >
                        <span className="transform rotate-90 text-lg leading-none">&rsaquo;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
