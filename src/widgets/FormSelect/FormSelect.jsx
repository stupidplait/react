import { memo } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../features/categories/categoriesSlice";

export const FormSelect = memo(function ({ data, onEdit }) {
    const categories = useSelector(selectAllCategories);

    return (
        <legend>
            <label className="small-title" htmlFor="category">Категория:</label>
            <select className="input" onChange={onEdit} name="category" id="category" value={data}>
                <option hidden value="0">Выберите категорию</option>
                {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
            </select>
        </legend>
    );
});