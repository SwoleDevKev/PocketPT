import "./Input.scss";

function Input({ label, name, type , auto }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input type={type} id={name} autoComplete={auto || 'off'} name={name} className="field__input" />
        </div>
    );
}

export default Input;
