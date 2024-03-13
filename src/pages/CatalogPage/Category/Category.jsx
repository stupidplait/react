export function Category({ selectedCategory, onPress, name }) {
    return <button onClick={onPress} className={`text-xs ${selectedCategory === name ? 'btn-fill' : 'btn-fill-gray'}`}>{name}</button>;
}