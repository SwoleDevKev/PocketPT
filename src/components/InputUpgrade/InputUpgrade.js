import "./InputUpgrade.scss";

function InputUpgrade({ label, name, type }) {
    return (
        <div className="form-field">
            <label htmlFor={name} className="form-field__label">
                {label}
            </label>
            <input type={type} id={name} name={name} className="form-field__input" />
        </div>
    );
}

export default InputUpgrade;
