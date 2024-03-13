import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../widgets/Loader/Loader";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";

export function useProductsStatus() {
    const dispatch = useDispatch();

    const postsStatus = useSelector(state => state.products.status);
    const postsError = useSelector(state => state.products.error);

    useEffect(() => {
        const controller = new AbortController();
        if (postsStatus === 'idle') dispatch(fetchProducts(controller));

        return () => { controller.abort(); };
    }, []);

    switch (postsStatus) {
        case 'pending':
            return <Loader />;
        case 'rejected':
            return <p className="text-red-500 font-semibold tracking-tight">{postsError}</p>;
        default:
            return false;
    }
}