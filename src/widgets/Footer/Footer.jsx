import { NavLink } from "react-router-dom";
import logo from '../../shared/logo.svg';

export function Footer() {
    return (
        <footer className="py-5 flex items-center justify-between gap-3">
            <NavLink to="/"><img className="max-w-32" src={logo} alt="Logo" /></NavLink>
            <nav className="flex gap-5 text-sm tracking-wide">
                <NavLink className="link" to="/">Главная</NavLink>
                <NavLink className="link" to="/catalog">Каталог</NavLink>
                <NavLink className="link" to="/about">О нас</NavLink>
                <NavLink className="link" to="/cart">Корзина</NavLink>
            </nav>
        </footer>
    );
}