const Input = ({
    type = "text",
    name,
    className = "",
    readOnly = false,
    required = false,
    placeholder = "",
    value,
    onChange,
    label,
}) => {
    return (
        <div className='flex flex-col gap-4'>
            {label && (
                <label htmlFor={name} className='text-[#454545] text-[16px] font-normal'>
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                readOnly={readOnly}
                value={value}
                onChange={onChange}
                className={`w-full p-[12px_12px_12px_14px] outline-none border-[#C2C2C2] border-[1.5px] rounded-md ${className}`}
            />
        </div>
    );
};

export default Input;
