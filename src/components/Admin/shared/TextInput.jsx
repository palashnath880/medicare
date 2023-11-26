import React from 'react';

const TextInput = ({ label, placeholder, Form, name, type, validation }) => {

    const { register, formState: { errors } } = Form;

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name} className='text-sm text-primary' >{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className='bg-white outline-none border-primary w-full px-3 text-sm text-primary font-medium py-3 border rounded-md'
                {...register(name, validation)}
            />
            {errors[name] && <span className='text-red-500 text-xs font-medium'>{errors[name]?.message}</span>}
        </div>
    );
}

export default TextInput;
