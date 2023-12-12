import React, { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaClock, FaMinus, FaPlus, FaXmark } from 'react-icons/fa6';
import { Button, Modal } from '@mui/material';
import { convertTimeStringToDateObject, generateTimeList, isTimeBetween } from '@/lib/utilities';

const SelectTimeModal = ({ children, value, setValue }) => {

    // states
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTimes, setSelectedTimes] = useState({ start: '', end: '' });

    const timesData = generateTimeList(); // generate time list. ex: 1:00 AM, 1:45 AM

    const handleTime = (time) => {
        const isSelectTime = Object.values(selectedTimes).some(i => i); // check before select any date 
        if (!isSelectTime) {
            setSelectedTimes({ ...selectedTimes, start: time });
        } else {
            // time to date object 
            const selectedEndDate = convertTimeStringToDateObject(time);
            const selectedStartDate = convertTimeStringToDateObject(selectedTimes.start);

            if (selectedEndDate < selectedStartDate) {
                setSelectedTimes({ start: time, end: selectedTimes.start });
            } else {
                setSelectedTimes({ ...selectedTimes, end: time });
            }
        }
    }

    // value update
    useEffect(() => {
        if (value) {
            setSelectedTimes(value);
        }
    }, [value]);

    return <>
        <Button
            onClick={() => setIsOpen(true)}
            variant='contained'
            type='button'
            className='!text-sm !font-medium !capitalize !py-2'
            endIcon={<FaClock className='w-4 h-4' />}
        >
            {Object.values(selectedTimes).some(i => i !== '') ? `${selectedTimes?.start} - ${selectedTimes?.end}` : children}
        </Button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)} className='grid place-items-center py-5 overflow-y-auto'>
            <div className='outline-none rounded-xl shadow-xl bg-white p-5'>
                <div className='flex justify-between items-center mb-5'>
                    <h5 className='text-primary text-xl font-medium'>DR. visit times</h5>
                    <Button onClick={() => setSelectedTimes({ start: '', end: '' })} className='!text-sm !capitalize' variant='contained' endIcon={<FaXmark className='w-4 h-4' />}>Clear Times</Button>
                </div>
                <div className='grid grid-cols-4 gap-x-2 gap-y-2 mb-5'>
                    {timesData.map((time, index) => {
                        const isTimeInStartAndEndTime = isTimeBetween(selectedTimes.start, selectedTimes.end, time);
                        return <div onClick={() => handleTime(time)} key={index} className={` ${isTimeInStartAndEndTime && 'bg-primary text-white'} duration-200 text-sm border border-primary px-3 py-1 rounded-lg cursor-pointer`}>
                            {time}
                        </div>
                    })}
                </div>
                <Button
                    onClick={() => {
                        setValue(selectedTimes);
                        setIsOpen(false);
                    }}
                    disabled={Object.values(selectedTimes).some(i => !i)}
                    variant='contained'
                    fullWidth
                    className='capitalize'
                >
                    Save Times
                </Button>
            </div>
        </Modal>
    </>
}


const VisitTimesSelect = ({ Form }) => {

    // react-hook-form
    const { control, register, setValue, formState: { errors } } = Form;
    const { fields, remove, append } = useFieldArray({ name: 'visitTimes', control: control, rules: { required: 'Please select one time' } });

    return (
        <div className='flex flex-col gap-2 col-span-2'>
            <div className='text-sm text-primary flex justify-between items-center' >
                <span>Visit Times</span>
                <button onClick={() => append({ visitTimes: { day: '', time: {} } })} type='button' className='bg-primary bg-opacity-20 text-primary cursor-pointer w-8 aspect-square rounded-full grid place-items-center'>
                    <FaPlus className='w-5 h-5' />
                </button>
            </div>
            <div className='flex flex-col gap-3'>
                {fields.map((field, index) => <div key={field.id} className='flex items-center gap-3'>
                    <input
                        type='text'
                        {...register(`visitTimes.${index}.value.day`)}
                        placeholder='ex: Monday - Friday'
                        className='bg-white outline-none border-primary flex-1 px-3 text-sm text-primary font-medium py-2 border rounded-md'
                    />
                    <SelectTimeModal
                        value={field?.value?.time}
                        setValue={(val) => setValue(`visitTimes.${index}.value.time`, val)}
                    >
                        Select Times
                    </SelectTimeModal>
                    <button onClick={() => remove(index)} type='button' className='w-8 aspect-square rounded-full grid place-items-center bg-red-500 bg-opacity-20 text-red-500'>
                        <FaMinus className='w-5 h-5' />
                    </button>
                </div>)}
            </div>
            {errors?.visitTimes?.root && <span className='text-red-500 text-xs font-medium'>{errors['visitTimes']['root']?.message}</span>}
        </div>
    );
}

export default VisitTimesSelect;
