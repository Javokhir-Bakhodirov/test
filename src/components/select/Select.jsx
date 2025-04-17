const Select = ({ label, name, value, onChange, title, required = false, options = [], className = "" }) => {
    return (
        <div className='flex flex-col gap-4'>
            {label && (
                <label htmlFor={name} className='text-[#454545] text-[16px] font-normal'>
                    {label}
                </label>
            )}
            <select
                id={name}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full bg-[#F0F1F4] border-none h-[50px] p-[7px_10px_7px_10px] text-[18px] leading-[50px] font-medium rounded-md outline-none ${className}`}>
                <option value='' disabled>
                    Please Select {title} *
                </option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
