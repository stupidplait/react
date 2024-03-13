import { useSelector } from "react-redux";
import { ProductList } from "../../widgets/ProductList/ProductList";
import { Product } from "../../widgets/Product/Product";
import { selectCartEntities } from "../../features/cart/cartSlice";
import { useProductsStatus } from "../../utils/useProductsStatus";
import { ResultTitle } from "../../widgets/ResultTitle/ResultTitle";
import { selectProductsByIds } from "../../features/products/productsSlice";

export function Cart() {
    const postsStatus = useProductsStatus();

    const cartEntities = useSelector(selectCartEntities);
    const cartProducts = useSelector(state => selectProductsByIds(state, cartEntities));

    const total = cartProducts.reduce((sum, current) => sum + current.price * cartEntities[current.id].quantity, 0);

    const productsElements = cartProducts.map(product => <Product key={product.id} productId={product.id} quantity={cartEntities[product.id].quantity} />);

    if (postsStatus) return postsStatus;

    return (
        <section className="py-10">
            <h1 className="main-title">Корзина</h1>
            {
                productsElements.length
                    ?
                    <>
                        <ResultTitle>Итого: {total} ₽</ResultTitle>
                        <ProductList>{productsElements}</ProductList>
                    </>
                    : <ResultTitle>Корзина пуста</ResultTitle>
            }
        </section>
    );
}