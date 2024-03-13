import { Product } from "../Product/Product";
import { ProductList } from "../ProductList/ProductList";
import { useSelector } from "react-redux";
import { useProductsStatus } from "../../utils/useProductsStatus";
import { selectAllProducts } from "../../features/products/productsSlice";
import { ResultTitle } from "../ResultTitle/ResultTitle";
import { useLayoutEffect } from "react";

export function Catalog({ children, text, category, filter, limit = 0 }) {
    const productsStatus = useProductsStatus();

    const products = useSelector(selectAllProducts);

    const productsFiltered = limit ? products.slice(0, 4) : products.slice().filter(product => {
        return product.title.toLowerCase().includes(text.toLowerCase()) && isEqualCategory(product.category, category);
    }).sort((a, b) => sortBy(a, b, filter));

    const productsElements = productsFiltered.map(product => <Product key={product.id} productId={product.id} />);

    function isEqualCategory(productCategory, selectedCategory) {
        return productCategory === selectedCategory || selectedCategory === 'Все';
    }

    function sortBy(a, b, filter) {
        switch (filter) {
            case 'priceASC':
                return a.price - b.price;
            case 'priceDESC':
                return b.price - a.price;
            case 'alphabetASC':
                return a.title.localeCompare(b.title);
            case 'alphabetDESC':
                return b.title.localeCompare(a.title);
            case 'remainsASC':
                return a.remains - b.remains;
            case 'remainsDESC':
                return b.remains - a.remains;
            default:
                return;
        }
    }

    if (productsStatus) return productsStatus;

    return (
        <section className="py-10">
            {children}
            {
                productsFiltered.length
                    ? <ProductList>{productsElements}</ProductList>
                    : <ResultTitle>Ничего не найдено</ResultTitle>
            }
        </section>
    );
};