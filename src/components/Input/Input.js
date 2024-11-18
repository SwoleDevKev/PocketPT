import "./Input.scss";

function Input({ label, name, type , auto, placeholder, onChange , classNameDiv, classNameInput, classNameLabel }) {
    return (
        <div className={`${classNameDiv || ''} field`} >
            <label htmlFor={name} className={`${classNameLabel || ''} field__label`}>
                {label}
            </label>
            <input placeholder={placeholder || ""} type={type} id={name} autoComplete={auto || 'off'} name={name} className={`${classNameInput || ''} field__input`} onChange={onChange} />
        </div>
    );
}

export default Input;
