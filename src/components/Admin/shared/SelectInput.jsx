import React from 'react';

const SelectInput = ({ label, placeholder, Form, name, options, validation }) => {

    const { register, formState: { errors } } = Form;

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name} className='text-sm text-primary' >{label}</label>
            <select
                className='bg-white outline-none border-primary w-full px-3 text-sm text-primary font-medium py-3 border rounded-md cursor-pointer'
                {...register(name, validation)}
            >
                <option value=''>{placeholder}</option>
                {Array.isArray(options) && options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
            {errors[name] && <span className='text-red-500 text-xs font-medium'>{errors[name]?.message}</span>}
        </div>
    );
}

export default SelectInput;
