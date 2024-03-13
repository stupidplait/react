export function FormInput({ name, title, data, onEdit }) {
    return (
        <legend>
            <label className="small-title" htmlFor={name}>{title}:</label>
            {
                title === 'Описание'
                    ? <textarea className="input" placeholder={`Введите ${title.toLowerCase()}`} onChange={onEdit} type="text" name={name} id={name} value={data} />
                    : <input className="input" placeholder={`Введите ${title.toLowerCase()}`} onChange={onEdit} type="text" name={name} id={name} value={data} />
            }
        </legend>
    );
}