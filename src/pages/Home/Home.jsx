import { Link } from "react-router-dom";
import { Banner } from "./Banner/Banner";
import { CreateForm } from "./CreateForm/CreateForm";
import { Catalog } from "../../widgets/Catalog/Catalog";

export function Home() {
    return (
        <>
            <Banner />
            <Catalog limit="4">
                <div className="flex justify-between items-center gap-3">
                    <h2 className="additional-title">Мини-каталог</h2>
                    <Link className="btn-fill" to="/catalog">Больше</Link>
                </div>
            </Catalog>
            <CreateForm />
        </>
    );
}