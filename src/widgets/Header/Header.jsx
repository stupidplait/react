import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../shared/logo.svg';
import { useSelector } from "react-redux";
import { selectAllCart } from "../../features/cart/cartSlice";

export function Header({ text, onWrite }) {
    const navigate = useNavigate();

    const cartItems = useSelector(selectAllCart);

    const quantity = cartItems.reduce((total, current) => total + current.quantity, 0);

    return (
        <header className="py-5 flex items-center justify-between gap-3">
            <NavLink to="/"><img className="max-w-32" src={logo} alt="Logo" /></NavLink>
            <div className="flex items-center gap-6">
                <nav className="flex gap-5 text-sm tracking-wide">
                    <NavLink className="link" to="/">Главная</NavLink>
                    <NavLink className="link" to="/catalog">Каталог</NavLink>
                    <NavLink className="link" to="/about">О нас</NavLink>
                </nav>
                <div className="flex gap-5">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label className="group has-[:focus]:border-stone-300 gap-2 hover:border-stone-400 px-3 py-1 flex items-center border border-stone-500 rounded-sm cursor-pointer transition-all duration-200" htmlFor="search">
                            <input className="placeholder:text-stone-600 text-stone-200 bg-transparent" onChange={onWrite} onFocus={() => navigate('/catalog')} type="text" id="search" value={text} placeholder="Найти..." />
                            <svg width="16" height="16" viewBox="0 0 384 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path className="group-has-[:focus]:fill-stone-300 group-hover:fill-stone-400 fill-stone-500 transition-all duration-200" d="M372.82 345.59C341.5 314.37 310.28 283.05 278.93 251.86C276.82 249.76 276.68 248.6 278.47 246.16C324.51 183.32 317.69 98.18 261.94 43.76C235.67 18.11 203.93 3.74 167.22 0.68C166.62 0.63 165.95 0.8 165.69 0H141.7C141.41 0.25 141.08 0.38 140.68 0.39C140.56 0.39 140.46 0.39 140.34 0.39H140.33C135.31 1.74 130.09 1.9 125 2.86C60.14 15.22 10.02 68.45 1.32 134.26C1.03 136.48 1.55 138.95 0 140.95V167.19C1.73 172.76 1.85 178.61 2.92 184.3C14.11 244.3 63.39 294.19 123.47 305.72C168.47 314.35 209.65 305.12 246.72 278.11C248.87 276.54 249.83 276.89 251.53 278.59C282.92 310.09 314.41 341.5 345.8 373C350.2 377.41 354.56 381.75 360.61 383.87H368.11C376.22 381.48 381.51 376.28 383.85 368.12V360.63C381.78 354.43 377.3 350.06 372.82 345.59ZM154.26 270.56C90.14 270.31 38.03 217.98 38.27 154.1C38.51 90.3 90.83 38.25 154.61 38.38C218.73 38.5 270.81 90.81 270.56 154.83C270.3 218.8 218.04 270.81 154.26 270.56Z" />
                                </g>
                            </svg>
                        </label>
                    </form>
                    <NavLink className="group aspect-square flex justify-center items-center relative" to="/cart">
                        <svg width="24" height="24" viewBox="0 0 378 368" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g className="group-hover:*:fill-stone-500 *:fill-stone-400 *:transition-all *:duration-200">
                                <path d="M376.72 85.67C371.81 100.66 366.77 115.61 361.78 130.57C352.94 157.09 344.09 183.6 335.26 210.11C331.91 220.18 327.13 223.65 316.53 223.65H150.43C142.53 223.65 139.57 226.02 137.64 233.82C136.78 237.32 135.81 240.8 135 244.31C133.6 250.38 136.93 254.98 143.12 255.58C144.48 255.72 145.86 255.64 147.23 255.64H332.79C335.4 255.64 338 255.58 340.54 256.51C347.89 259.19 352.13 266.39 350.91 274.33C349.82 281.42 343.55 286.97 336.15 287.39C335.41 287.43 334.66 287.43 333.91 287.43C270.81 287.43 207.71 287.47 144.61 287.42C124.2 287.4 108.05 274.29 103.64 254.39C102.27 248.19 102.66 242.01 104.17 235.87C105.17 231.77 106.04 227.62 107.27 223.58C110.33 213.56 109.7 203.87 106.35 193.93C89.29 143.31 72.48 92.59 55.57 41.91C52.99 34.18 50.07 32.11 41.83 32.11C34.47 32.11 27.1 31.8 19.76 32.18C9.91 32.69 3.23 28.84 0 19.39V12.66C3.45 3.08999 10.45 -0.26001 20.31 0.0199895C34.14 0.41999 47.99 0.0999895 61.84 0.12999C71.42 0.14999 76.52 3.82999 79.6 12.98C84.2 26.64 88.76 40.31 93.34 53.98C95.99 61.9 99 64.09 107.29 64.09C191.21 64.09 275.13 64.09 359.06 64.11C361.54 64.11 364.02 63.98 366.47 64.75C375.34 67.58 379.76 76.37 376.72 85.67Z" />
                                <path d="M133.17 366.64C132.89 366.69 132.68 367.08 132.44 367.31H121.96C121.04 366.09 119.54 366.27 118.3 365.88C103.54 361.22 93.84 346.36 95.97 331.58C98.31 315.31 111.21 303.77 127.27 303.56C143.05 303.35 156.45 314.45 159.19 330C162.23 347.24 150.7 363.45 133.17 366.64Z" />
                                <path d="M324.72 366.64C324.44 366.69 324.23 367.08 323.99 367.31H313.51C312.59 366.09 311.09 366.27 309.85 365.88C295.09 361.22 285.39 346.36 287.52 331.58C289.86 315.31 302.76 303.77 318.82 303.56C334.6 303.35 348 314.45 350.74 330C353.78 347.24 342.25 363.45 324.72 366.64Z" />
                            </g>
                        </svg>
                        <p className="w-6 text-xs font-semibold leading-none aspect-square flex justify-center items-center absolute top-1/2 right-0 translate-x-2/3 -translate-y-1/2 rounded-full bg-stone-800">{quantity}</p>
                    </NavLink>
                </div>
            </div>
        </header >
    );
}