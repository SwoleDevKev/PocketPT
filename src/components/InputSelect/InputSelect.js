import "./InputSelect.scss";

function InputSelect({ label, name, type,  }) {
    return (
        // <div className="field">
        //     <label htmlFor={name} className="field__label">
        //         {label}
        //     </label>
        //     <input type={type} id={name} name={name} className="field__input" />
        // </div>
        <>
                <label className='edit__label' htmlFor={name}>{label}</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name={name}
                    id={name}
                    defaultValue={''}
                    onChange={'handleChangeday1'}
                >
                    <option value='' disabled selected>Please select</option>
                    {"weeklyPrograms"?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>
        </>
                
    );
}

export default InputSelect;
