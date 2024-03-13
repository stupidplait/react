import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../features/products/productsSlice";
import { FormInput } from "../../../widgets/FormInput/FormInput";
import { FormSelect } from "../../../widgets/FormSelect/FormSelect";

export function CreateForm() {
    const dispatch = useDispatch();

    const [formStatus, setFormStatus] = useState('idle');
    const [data, setData] = useState({
        title: '',
        description: '',
        price: '',
        thumbnail: '',
        category: 0,
        remains: 0,
    });

    const canSave = Object.values(data).every(Boolean) && formStatus === 'idle';

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (canSave) {
            try {
                setFormStatus('pending');
                await dispatch(addProduct(data)).unwrap();

                setData({
                    title: '',
                    description: '',
                    price: '',
                    thumbnail: '',
                    category: 0,
                    remains: 0,
                });
            } catch (error) {
                console.error('Failed to add post: ', error);
            } finally {
                setFormStatus('idle');
            }
        }
    }

    return (
        <section className="py-10 flex flex-col items-center">
            <h2 className="additional-title">Добавьте новый продукт</h2>
            <form className="max-w-96 w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormInput name="title" title="Заголовок" data={data.title} onEdit={handleChange} />
                <FormInput name="description" title="Описание" data={data.description} onEdit={handleChange} />
                <FormInput name="price" title="Цена" data={data.price} onEdit={handleChange} />
                <FormInput name="thumbnail" title="Изображение" data={data.thumbnail} onEdit={handleChange} />
                <FormInput name="remains" title="Количество" data={data.remains} onEdit={handleChange} />
                <FormSelect data={data.category} onEdit={handleChange} />
                <input disabled={!canSave} className={`btn-fill ${!canSave && 'bg-stone-400 text-stone-600 hover:text-stone-600'}`} type="submit" value="Добавить" />
            </form>
        </section>
    );
};