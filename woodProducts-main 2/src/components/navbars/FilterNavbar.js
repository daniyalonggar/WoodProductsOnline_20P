import React, {useState, useEffect} from 'react';
import {ChevronDown, X} from 'lucide-react';
import {fetchCategoriesAPI} from "../../api";

const FilterNavbar = ({onFilterChange}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Все фильтры');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRanges, setPriceRanges] = useState([
        {min: 0, max: 5000},
        {min: 5000, max: 15000},
        {min: 15000, max: 30000},
        {min: 30000, max: 147500},
    ]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [catalogs, setCatalogs] = useState([]);
    const [expandedSections, setExpandedSections] = useState({});
    const [filterState, setFilterState] = useState({
        'Тип дверей': {
            'Межкомнатные': false,
            'Скрытые': false,
        },
        'Стиль': {
            'Скандинавский': false,
            'Винтаж': false,
            'Современный': false,
        },
        'Материал': {
            'Эмаль': false,
            'Монохромный Кортекс': false,
            'Шёлк': false,
            'Кортекс': false,
            'Шпон': false,
        },
        'Покрытие': {
            'Матовые': false,
            'Глянцевые': false,
            'Под покраску': false,
        },
        'Тип конструкции': {
            'Рамочные': false,
            'Филёнчатые': false,
            'Щитовые': false,
            'Остеклённые': false,
            'Глухие': false,
            'Арочные': false,
            'Радиусные': false,
            'Автоматические': false,
            'Противопожарные': false,
        },
        'Облицовки': {
            'Ваниль': false,
            'Белый Клен': false,
            'Тополь': false,
            'Белый матовый': false,
        },
    });

    const handleFilterUpdate = () => {
        const selectedPrice =
            selectedPriceRanges.length > 0
                ? {
                    min_price: Math.min(...selectedPriceRanges.map((r) => r.min)),
                    max_price: Math.max(...selectedPriceRanges.map((r) => r.max)),
                }
                : {min_price: null, max_price: null};

        const filters = {
            category: selectedCategory,
            ...selectedPrice,
        };

        onFilterChange(filters);
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategory((prev) => (prev === categoryId ? null : categoryId)); // Toggle category selection
    };
    useEffect(() => {
        handleFilterUpdate();
    }, [selectedCategory, selectedPriceRanges, filterState]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategoriesAPI();
                setCatalogs(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const toggleSection = (sectionTitle) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionTitle]: !prev[sectionTitle],
        }));
    };

    const handlePriceRangeToggle = (range) => {
        setSelectedPriceRanges((prev) => {
            const exists = prev.some((r) => r.min === range.min && r.max === range.max);
            if (exists) {
                return prev.filter((r) => r.min !== range.min || r.max !== range.max);
            }
            return [...prev, range];
        });
    };

    const handleCheckboxChange = (section, option) => {
        setFilterState((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [option]: !prev[section][option],
            },
        }));
    };

    const resetFilters = () => {
        setSelectedPriceRanges([]);
        setSelectedCategory(null);
        setFilterState((prev) => {
            const reset = {};
            Object.keys(prev).forEach((section) => {
                reset[section] = {};
                Object.keys(prev[section]).forEach((option) => {
                    reset[section][option] = false;
                });
            });
            return reset;
        });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="mt-2 mb-16">
                <div className="md:hidden top-16 left-0 right-0 bg-white z-50 border-b border-gray-200">
                    <div className="p-4 flex items-center justify-between">
                        <button onClick={toggleMobileMenu} className="flex items-center space-x-2 text-black">
                            <span>{selectedFilter}</span>
                            <ChevronDown
                                className={`w-5 h-5 transform transition-transform ${
                                    isMobileMenuOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isMobileMenuOpen && (
                            <button onClick={resetFilters} className="text-sm text-gray-600">
                                Сбросить
                            </button>
                        )}
                    </div>
                </div>

                {isMobileMenuOpen &&
                    <div className="inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu}/>}
                <div
                    className={`fixed md:relative top-16 right-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                    } md:transform-none overflow-y-auto`}>
                    <div className="md:hidden p-4 flex justify-end">
                        <button onClick={toggleMobileMenu}>
                            <X className="w-6 h-6 text-black"/>
                        </button>
                    </div>

                    <div className="space-y-3 p-4 flex flex-col items-start">
                        {catalogs.map((catalog) => (
                            <button
                                key={catalog.id}
                                onClick={() => toggleCategory(catalog.id)}
                                className={`font-medium text-black ${
                                    selectedCategory === catalog.id ? 'text-[#B14101]' : ''
                                }`}
                            >
                                {catalog.name}
                            </button>
                        ))}
                    </div>

                    <div className="top-16 bg-white z-10 p-4 border-b border-black">
                        <h3 className="text-sm font-medium text-black mb-4">Ценовой диапазон (Тенге)</h3>
                        <div className="space-y-2">
                            {priceRanges.map((range, index) => (
                                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedPriceRanges.some(
                                            (r) => r.min === range.min && r.max === range.max
                                        )}
                                        onChange={() => handlePriceRangeToggle(range)}
                                        className="h-4 w-4 rounded border-black text-black focus:ring-black cursor-pointer"
                                    />
                                    <span className="text-sm text-black">
                                        {range.min.toLocaleString()}₸ - {range.max.toLocaleString()}₸
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 space-y-6">
                        {Object.entries(filterState).map(([sectionTitle, options]) => (
                            <div key={sectionTitle} className="space-y-3">
                                <h3
                                    className="text-sm font-medium text-black flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSection(sectionTitle)}
                                >
                                    {sectionTitle}
                                    <ChevronDown
                                        className={`w-4 h-4 transform transition-transform ${
                                            expandedSections[sectionTitle] ? 'rotate-180' : ''
                                        }`}
                                    />
                                </h3>
                                <div className={`space-y-2 ${expandedSections[sectionTitle] ? 'hidden' : ''}`}>
                                    {Object.entries(options).map(([optionName, isChecked]) => (
                                        <label key={optionName} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleCheckboxChange(sectionTitle, optionName)}
                                                className="h-4 w-4 rounded border-black text-black focus:ring-black cursor-pointer"
                                            />
                                            <span className="text-sm text-black">{optionName}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterNavbar;
