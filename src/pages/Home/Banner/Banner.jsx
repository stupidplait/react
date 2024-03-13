import { Link } from "react-router-dom";

export function Banner() {
    return (
        <section className="flex min-h-[90vh] items-center justify-between gap-6">
            <div className="max-w-md">
                <h1 className="main-title">Lorem ipsum dolor sit amet.</h1>
                <p className="tracking-tight mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cumque atque temporibus provident delectus, voluptatibus nobis odio nihil dolor. Dolore.
                </p>
                <Link to="/catalog" className="btn">Перейти в каталог</Link>
            </div>
            <div className="max-w-md aspect-square overflow-hidden rounded-md shadow-md shadow-stone-950">
                <img className="img" src="https://images.unsplash.com/photo-1707568732078-bcf805f6d834?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
        </section>
    );
}