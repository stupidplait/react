import { useSelector } from "react-redux";
import { Category } from "./Category/Category";
import { useProductsStatus } from "../../utils/useProductsStatus";
import { useState } from "react";
import { Catalog } from "../../widgets/Catalog/Catalog";
import { selectAllCategories } from "../../features/categories/categoriesSlice";

const filterTypes = {
    'default': 'По умолчанию',
    'priceASC': 'Цена: по возрастанию',
    'priceDESC': 'Цена: по убыванию',
    'alphabetASC': 'Название: по возрастанию',
    'alphabetDESC': 'Название: по убыванию',
    'remainsASC': 'Кол-во: по возрастанию',
    'remainsDESC': 'Кол-во: по убыванию',
};

export function CatalogPage({ text }) {
    const productsStatus = useProductsStatus();

    const categories = useSelector(selectAllCategories);

    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [filterType, setFilterType] = useState('default');

    if (productsStatus) return productsStatus;

    return (
        <Catalog text={text} category={selectedCategory} filter={filterType}>
            <div className="flex justify-between items-center gap-3">
                <h1 className="main-title">Каталог</h1>
                <select className="border-stone-600 focus:border-stone-300 hover:border-stone-400 border rounded-md p-2 cursor-pointer transition-all duration-200" name="filter" onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                    {Object.entries(filterTypes).map(([type, value]) => <option key={type} value={type}>{value}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <Category selectedCategory={selectedCategory} onPress={() => setSelectedCategory('Все')} name="Все" />
                {categories.map(category => <Category key={category.name} selectedCategory={selectedCategory} onPress={() => setSelectedCategory(category.name)} name={category.name} />)}
            </div>
        </Catalog>
    );
}