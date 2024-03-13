import { Link } from "react-router-dom";
import { selectProductById, toggledFavorite } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addedToCart, decremented, incremented } from "../../features/cart/cartSlice";
import { memo } from "react";

export const Product = memo(function ({ productId, quantity }) {
    const dispatch = useDispatch();

    const product = useSelector(state => selectProductById(state, productId));

    function handleAddToCart() {
        if (!product.remains || quantity >= product.remains) return;

        dispatch(addedToCart({ productId: product.id }));
    }

    function handleIncrement() {
        if (quantity >= product.remains) return;

        dispatch(incremented({ productId: product.id }));
    }

    return (
        <div className="item">
            <Link to={`/catalog/${product.id}`} className="overflow-hidden mb-2 aspect-[3/4] relative">
                <img className="img relative after:absolute after:inset-0 after" src={product.thumbnail} alt="product" />
            </Link>
            <h4 className="flex-auto mb-2 mx-2 tracking-tight">{product.title}</h4>
            <div className="px-2 pb-2 flex justify-between items-center gap-2">
                <p className="text-md font-semibold tracking-tight">{product.price} ₽</p>
                {
                    quantity
                        ?
                        <div className="flex items-center gap-3">
                            <button className="btn-icon-small" onClick={() => dispatch(decremented({ productId: product.id }))}>
                                <svg className="group-hover:*:stroke-stone-500 *:stroke-stone-400 *:transition-all *:duration-200" width="8" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L15 1" stroke="none" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </button>
                            <p>{quantity}</p>
                            <button className="btn-icon-small" onClick={handleIncrement}>
                                <svg className="group-hover:*:stroke-stone-500 *:stroke-stone-400 *:transition-all *:duration-200" width="8" height="8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8L15 8" stroke="none" stroke-width="2" stroke-linecap="round" />
                                    <path d="M8 15L8 1" stroke="none" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </button>
                        </div>
                        :
                        <div className="flex gap-2">
                            <button onClick={() => dispatch(toggledFavorite({ productId: product.id }))} className={product.isLiked ? 'liked' : 'btn-icon'}>
                                <svg className={product.isLiked ? '*:fill-red-500' : '*:fill-stone-400'} width="20" height="20" viewBox="0 0 265 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M255.642 106.89C247.223 123.328 235.53 137.312 222.435 150.158C196.192 175.893 166.386 196.89 134.684 215.323C133.017 216.291 131.852 216.181 130.253 215.247C107.837 202.12 86.3988 187.55 66.3468 171.045C49.8749 157.485 34.364 142.932 21.5657 125.739C12.7132 113.852 5.43394 101.167 1.81982 86.6226C1.16502 83.9905 1.35211 81.1717 0 78.7179V64.2414C0.722825 63.9272 0.518733 63.2225 0.603771 62.6706C1.25006 58.3319 2.13446 54.0357 3.47806 49.8583C12.6622 21.2704 39.1346 0.977864 69.1446 0.0523877C95.0557 -0.745729 115.626 9.40055 130.976 30.1686C132.209 31.8497 132.966 32.2742 134.02 30.211C134.216 29.829 134.496 29.4893 134.76 29.1497C151.402 7.75337 173.316 -1.97687 200.282 0.332578C214.237 1.52126 226.84 6.84488 237.741 15.7091C253.465 28.4789 262.462 44.9677 264.639 65.1329C266.246 80.0424 262.351 93.7887 255.642 106.89Z" />
                                </svg>
                            </button>
                            <button onClick={handleAddToCart} className="btn-icon">
                                <svg className="group-hover:*:fill-stone-500 *:fill-stone-400 *:transition-all *:duration-200" width="20" height="20" viewBox="0 0 378 368" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M376.72 85.67C371.81 100.66 366.77 115.61 361.78 130.57C352.94 157.09 344.09 183.6 335.26 210.11C331.91 220.18 327.13 223.65 316.53 223.65H150.43C142.53 223.65 139.57 226.02 137.64 233.82C136.78 237.32 135.81 240.8 135 244.31C133.6 250.38 136.93 254.98 143.12 255.58C144.48 255.72 145.86 255.64 147.23 255.64H332.79C335.4 255.64 338 255.58 340.54 256.51C347.89 259.19 352.13 266.39 350.91 274.33C349.82 281.42 343.55 286.97 336.15 287.39C335.41 287.43 334.66 287.43 333.91 287.43C270.81 287.43 207.71 287.47 144.61 287.42C124.2 287.4 108.05 274.29 103.64 254.39C102.27 248.19 102.66 242.01 104.17 235.87C105.17 231.77 106.04 227.62 107.27 223.58C110.33 213.56 109.7 203.87 106.35 193.93C89.29 143.31 72.48 92.59 55.57 41.91C52.99 34.18 50.07 32.11 41.83 32.11C34.47 32.11 27.1 31.8 19.76 32.18C9.91 32.69 3.23 28.84 0 19.39V12.66C3.45 3.08999 10.45 -0.26001 20.31 0.0199895C34.14 0.41999 47.99 0.0999895 61.84 0.12999C71.42 0.14999 76.52 3.82999 79.6 12.98C84.2 26.64 88.76 40.31 93.34 53.98C95.99 61.9 99 64.09 107.29 64.09C191.21 64.09 275.13 64.09 359.06 64.11C361.54 64.11 364.02 63.98 366.47 64.75C375.34 67.58 379.76 76.37 376.72 85.67Z" />
                                    <path d="M133.17 366.64C132.89 366.69 132.68 367.08 132.44 367.31H121.96C121.04 366.09 119.54 366.27 118.3 365.88C103.54 361.22 93.84 346.36 95.97 331.58C98.31 315.31 111.21 303.77 127.27 303.56C143.05 303.35 156.45 314.45 159.19 330C162.23 347.24 150.7 363.45 133.17 366.64Z" />
                                    <path d="M324.72 366.64C324.44 366.69 324.23 367.08 323.99 367.31H313.51C312.59 366.09 311.09 366.27 309.85 365.88C295.09 361.22 285.39 346.36 287.52 331.58C289.86 315.31 302.76 303.77 318.82 303.56C334.6 303.35 348 314.45 350.74 330C353.78 347.24 342.25 363.45 324.72 366.64Z" />
                                </svg>
                            </button>
                        </div>
                }
            </div>
        </div>
    );
});