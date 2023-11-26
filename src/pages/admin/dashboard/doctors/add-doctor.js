import VisitTimesSelect from '@/components/Admin/Doctor/VisitTimesSelect';
import PageHeading from '@/components/Admin/shared/PageHeading';
import SelectInput from '@/components/Admin/shared/SelectInput';
import TextInput from '@/components/Admin/shared/TextInput';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctor = () => {

    // react-hook-form
    const Form = useForm();
    const { handleSubmit } = Form;


    return (
        <div>
            <PageHeading>Add Doctor</PageHeading>
            <div className='py-10'>
                <form onSubmit={handleSubmit()} className='mx-auto bg-[#f2f2f2] shadow-md px-5 py-5 rounded-lg max-w-[600px] w-full'>
                    <div className='grid grid-cols-2 gap-x-5 gap-y-3'>
                        <TextInput
                            label={'Doctor Name'}
                            name={'name'}
                            placeholder={'ex: Dr. Palash Nath'}
                            Form={Form}
                            validation={{ required: 'Dr name is required' }}
                            type={'text'}
                        />
                        <TextInput
                            label={'Degree'}
                            name={'degree'}
                            placeholder={'ex: MD, Internal Medicine'}
                            Form={Form}
                            validation={{ required: 'Dr degree is required' }}
                            type={'text'}
                        />
                        <SelectInput
                            label={'Specialist'}
                            name={'specialist'}
                            placeholder={'Select specialist'}
                            Form={Form}
                            validation={{ required: 'Dr specialist is required' }}
                            options={[]}
                        />
                        <TextInput
                            label={'Current Employee'}
                            name={'currentEmployeeOf'}
                            placeholder={'ex: Chittagong Medical College'}
                            Form={Form}
                            validation={{ required: 'Current employee data is required' }}
                            type={'text'}
                        />
                        <TextInput
                            label={'Visit Price'}
                            name={'visitPrice'}
                            placeholder={'ex: 1000'}
                            Form={Form}
                            validation={{ required: 'Dr. visit price is required' }}
                            type={'number'}
                        />
                        <VisitTimesSelect Form={Form} />
                    </div>
                    <div className='mt-6'>
                        <button className='bg-primary w-full py-3 text-sm rounded-lg text-white font-semibold disabled:bg-opacity-60'>Add Doctor</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDoctor;
