import { Route, Routes, useLocation } from "react-router-dom";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/Cart/Cart";
import { About } from "./pages/About/About";
import { Footer } from "./widgets/Footer/Footer";
import { Header } from "./widgets/Header/Header";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { useLayoutEffect, useState } from "react";

export default function App() {
    const [searchText, setSearchText] = useState('');

    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Header text={searchText} onWrite={(e) => setSearchText(e.target.value)} />
            <main className="flex-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<CatalogPage text={searchText} />} />
                    <Route path="/catalog/:productId" element={<ProductPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}