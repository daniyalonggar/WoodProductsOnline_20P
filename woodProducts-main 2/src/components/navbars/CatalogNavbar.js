import React, {useEffect, useState, useRef} from "react";
import {CatalogItem} from "./CatalogNavbarItem";
import {fetchCategoriesAPI} from "../../api";

export function CatalogNavbar({onCategorySelect}) {
    const [categories, setCategories] = useState([]);
    const [activeItems, setActiveItems] = useState([]);
    const itemRefs = useRef([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategoriesAPI();
                setCategories(
                    data.map((category, index) => ({
                        id: category.id,
                        title: category.name,
                        isActive: index === 0,
                    }))
                );
                setActiveItems(data.map((_, index) => index === 0));
                if (data.length > 0) {
                    onCategorySelect(data[0].id); // Выберите первую категорию по умолчанию
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [onCategorySelect]);

    const handleSelect = (index) => {
        setActiveItems(activeItems.map((_, i) => i === index));
        const selectedCategory = categories[index]?.id;
        if (selectedCategory) {
            onCategorySelect(selectedCategory);
        }
        itemRefs.current[index]?.scrollIntoView({behavior: "smooth", inline: "center"});
    };

    return (
        <nav
            role="tablist"
            aria-label="Product Categories"
            className="flex overflow-x-auto scrollbar-hide text-base tracking-wider leading-tight text-center uppercase text-neutral-700"
        >
            {categories.map((item, index) => (
                <CatalogItem
                    key={item.id}
                    title={item.title}
                    isActive={activeItems[index]}
                    onSelect={() => handleSelect(index)}
                    ref={(el) => (itemRefs.current[index] = el)}
                />
            ))}
        </nav>
    );
}
