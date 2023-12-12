import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const SelectInput = ({ label, Form, name, options, validation }) => {

    const { register, formState: { errors } } = Form;

    return (
        <div className='flex flex-col gap-2'>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label" className='!text-sm !font-medium'>{label}</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    MenuProps={{ className: '!text-sm', sx: { maxHeight: '80vh' } }}
                    label={label}
                    inputProps={{ className: '!text-sm' }}
                    {...register(name, validation)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Array.isArray(options) && options.map(({ value, label }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
                </Select>
            </FormControl>
            {/* <label htmlFor={name} className='text-sm text-primary' >{label}</label>
            <select
                className='bg-white outline-none border-primary w-full px-3 text-sm text-primary font-medium py-3 border rounded-md cursor-pointer'
                {...register(name, validation)}
            >
                <option value=''>{placeholder}</option>
                {Array.isArray(options) && options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select> */}
            {errors[name] && <span className='text-red-500 text-xs font-medium'>{errors[name]?.message}</span>}
        </div>
    );
}

export default SelectInput;
