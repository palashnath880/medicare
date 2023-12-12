import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const TextInput = ({ label, Form, name, type, validation }) => {

    const { register, formState: { errors } } = Form;

    return (
        <div className='flex flex-col gap-2'>

            {type === 'number' ? <TextField
                fullWidth
                size='small'
                label={label}
                type={type}
                InputLabelProps={{ className: '!text-sm !font-medium' }}
                {...register(name, validation)}
                InputProps={{
                    startAdornment: <InputAdornment position="start" className='!text-sm'>$</InputAdornment>,
                    className: '!text-sm'
                }}
            /> : <TextField
                fullWidth
                size='small'
                label={label}
                type={type}
                InputLabelProps={{ className: '!text-sm !font-medium' }}
                inputProps={{ className: '!text-sm' }}
                {...register(name, validation)}
            />}

            {/* <label htmlFor={name} className='text-sm text-primary' >{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className='bg-white outline-none border-primary w-full px-3 text-sm text-primary font-medium py-3 border rounded-md'

            /> */}
            {errors[name] && <span className='text-red-500 text-xs font-medium'>{errors[name]?.message}</span>}
        </div>
    );
}

export default TextInput;
