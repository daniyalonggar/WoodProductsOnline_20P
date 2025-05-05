import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Container from "../components/boxes/Container";
import FilterNavbar from "../components/navbars/FilterNavbar";
import ProductCard from "../components/cards/ProductCard";
import {fetchProductsAPI} from "../api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        category: null,
        min_price: null,
        max_price: null,
        page: 1,
    });

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Extract query parameters from the URL
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category") || null;
        const min_price = queryParams.get("min_price") || null;
        const max_price = queryParams.get("max_price") || null;
        const page = queryParams.get("page") || 1;

        setFilters({
            category,
            min_price,
            max_price,
            page: parseInt(page, 10),
        });
    }, [location.search]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProductsAPI(filters);
                setProducts(data.results);
                setPagination({count: data.count, next: data.next, previous: data.previous});
            } catch (err) {
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(pagination.count / 4)) {
            const updatedFilters = {...filters, page: newPage};
            setFilters(updatedFilters);
            updateURLParams(updatedFilters);
        }
    };

    const updateURLParams = (updatedFilters) => {
        const queryParams = new URLSearchParams();

        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                queryParams.set(key, value);
            }
        });

        navigate(`?${queryParams.toString()}`);
    };

    const renderPagination = () => {
        const buttons = [];
        const totalPages = Math.ceil(pagination.count / 4);

        if (filters.page > 1) {
            buttons.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(filters.page - 1)}
                    className="px-4 py-2 border border-solid border-neutral-700"
                >
                    Назад
                </button>
            );
        }

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= filters.page - 1 && i <= filters.page + 1)
            ) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 border border-solid border-neutral-700 ${
                            i === filters.page ? "bg-gray-300 font-bold" : ""
                        }`}
                    >
                        {i === filters.page ? `${i}` : i}
                    </button>
                );
            } else if (
                i === filters.page - 2 ||
                i === filters.page + 2
            ) {
                buttons.push(
                    <span key={`dots-${i}`} className="px-2">
                        ...
                    </span>
                );
            }
        }

        if (filters.page < totalPages) {
            buttons.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(filters.page + 1)}
                    className="px-4 py-2 border border-solid border-neutral-700"
                >
                    Вперед
                </button>
            );
        }

        return buttons;
    };

    return (
        <>
            <Container>
                <h1 className="text-[#3B3937] font-[PermianSerifTypeface] mt-12 lg:text-[52px] text-[40px] font-bold leading-[64px] tracking-[-0.64px]">
                    Витрина товаров
                </h1>
                <div className="lg:flex lg:gap-16 md:flex md:gap-16">
                    <div>
                        <FilterNavbar
                            onFilterChange={(newFilters) => {
                                const updatedFilters = {...filters, ...newFilters, page: 1};
                                setFilters(updatedFilters);
                                updateURLParams(updatedFilters);
                            }}
                        />
                    </div>
                    <div>
                        {loading ? (
                            <div className="text-center">Загрузка...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : (
                            <>
                                <div className="flex justify-center">
                                    <div
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mt-20"
                                    >
                                        {products.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                productData={product}
                                                cardWidth={225}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className="flex justify-center gap-4 pt-8 text-base font-bold tracking-wider leading-snug text-center uppercase text-neutral-700"
                                >
                                    {renderPagination()}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Products;
