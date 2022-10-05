const SelectInput = ({
    name,
    label,
    handleChange,
    options
}) => {

    return (
        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <select name={name} id={name} className="form-select mb-3" aria-label=".form-select-lg example" onChange={handleChange}>
                {options.map((item, i) => {
                    return (
                        <option key={i} value={item.toUpperCase()}> {item} </option>
                    );
                })}
                </select>
            </div>
        </div>
    );
}

export default SelectInput;