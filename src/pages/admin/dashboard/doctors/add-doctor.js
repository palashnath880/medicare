'use client';

import ImageUploadButton from '@/components/Admin/Doctor/ImageUploadButton';
import VisitTimesSelect from '@/components/Admin/Doctor/VisitTimesSelect';
import DoctorDegree from '@/components/Admin/shared/DoctorDegree';
import PageHeading from '@/components/Admin/shared/PageHeading';
import SelectInput from '@/components/Admin/shared/SelectInput';
import TextInput from '@/components/Admin/shared/TextInput';
import { modifiedToast, uploadImage } from '@/lib/utilities';
import { Add, Close, KeyboardBackspace } from '@mui/icons-material';
import { Button, IconButton, Modal } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const list_of_doctor_specialists = [
    "Cardiologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Hematologist",
    "Infectious Disease Doctor",
    "Nephrologist",
    "Neurologist",
    "Oncologist",
    "Pulmonologist",
    "Rheumatologist",
    "Allergist/Immunologist",
    "Anesthesiologist",
    "Colon and Rectal Surgeon",
    "Dermatologist",
    "Emergency Medicine Doctor",
    "Family Physician",
    "Obstetrician/Gynecologist",
    "Ophthalmologist",
    "Otolaryngologist (ENT)",
    "Pathologist",
    "Pediatrician",
    "Physical Medicine and Rehabilitation Specialist",
    "Plastic Surgeon",
    "Psychiatrist",
    "Radiologist",
    "Surgeon",
    "Urologist"
];

const AddDoctor = () => {

    // state
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // fetch degree
    const { data: doctorDegrees, refetch, isLoading } = useQuery({
        queryKey: ['doctorDegrees'],
        queryFn: async () => {
            const res = await axios.get('/api/degree');
            return res.data;
        }
    });

    // react-hook-form
    const Form = useForm({
        defaultValues: {
            visitTimes: [{ value: { day: '', time: { start: '', end: '' } } }],
            image: null,
        }
    });
    const { handleSubmit, formState: { errors }, control, reset } = Form;

    // doctor add handler
    const addDoctor = async (data) => {

        const visitTimes = data.visitTimes.map(item => ({ day: item.value.day, time: item.value.time }))

        data.visitTimes = visitTimes;
        data.visitPrice = parseInt(data.visitPrice); // convert string to int

        setPending(true);
        setError('');

        try {

            const uploadImg = await uploadImage(data.image);
            const { delete_url, display_url } = uploadImg;

            const res = await axios.post('/api/doctors', { ...data, image: { delete_url, display_url } });
            if (res.status === 201) {
                reset(); // reset field
                modifiedToast('Doctor added successfully', false);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setPending(false);
        }
    }


    return (
        <div>

            <Head>
                <title>Medicare | Dashboard | Add Doctor</title>
            </Head>

            <PageHeading>Add Doctor</PageHeading>

            <div className='flex justify-between mt-7'>
                <Button
                    onClick={() => window.history.back()}
                    variant='contained'
                    className='!py-2 !capitalize !font-medium'
                    startIcon={<KeyboardBackspace />}
                >Back</Button>
                <Button
                    variant='contained'
                    className='!py-2 !capitalize !font-medium'
                    startIcon={<Add />}
                    onClick={() => setModalOpen(true)}
                >
                    Add Degree
                </Button>
            </div>

            <div className='py-10'>
                <form onSubmit={handleSubmit(addDoctor)} className='mx-auto bg-[#f2f2f2] shadow-md px-5 py-5 rounded-lg max-w-[600px] w-full'>
                    <div className='grid grid-cols-2 gap-x-5 gap-y-5'>
                        <TextInput
                            label={'Doctor Name'}
                            name={'name'}
                            placeholder={'ex: Dr. Palash Nath'}
                            Form={Form}
                            validation={{ required: 'Dr name is required' }}
                            type={'text'}
                        />
                        <SelectInput
                            label={'Degree'}
                            name={'degree'}
                            Form={Form}
                            validation={{ required: 'Dr. degree is required' }}
                            options={Array.isArray(doctorDegrees) ? doctorDegrees.map(i => ({ value: i.name, label: i.name })) : []}
                        />
                        <SelectInput
                            label={'Specialist'}
                            name={'specialist'}
                            Form={Form}
                            validation={{ required: 'Dr. specialist is required' }}
                            options={list_of_doctor_specialists.map(i => ({ value: i, label: i }))}
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

                        <div className='col-span-1 p-5'>
                            <Controller
                                control={control}
                                rules={{ required: 'Add doctor image' }}
                                name='image'
                                render={({ field: { onChange, value } }) => <ImageUploadButton
                                    disabled={pending}
                                    setImage={onChange}
                                    image={value}
                                >Upload Doctor Image</ImageUploadButton>}
                            />
                            {errors?.image && <span className='text-red-500 text-xs font-medium'>{errors?.image?.message}</span>}
                        </div>

                        <VisitTimesSelect Form={Form} />

                    </div>
                    <div className='col-span-full text-center'>
                        {error && <p className='text-sm text-red-500 pt-4 font-medium'>{error}</p>}
                    </div>
                    <div className='mt-6'>
                        <Button
                            fullWidth
                            variant='contained'
                            className='!capitalize !font-medium !py-3'
                            disabled={pending}
                            startIcon={<Add />}
                            type='submit'
                        >
                            Add Doctor
                        </Button>
                    </div>
                </form>
            </div>

            {/* doctor degree modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} className='grid place-items-center py-5'>
                <div className='!bg-white p-5 !outline-none rounded-md w-[500px] relative'>
                    <IconButton className='!absolute top-3 right-3' onClick={() => setModalOpen(false)}><Close className='!text-primary' /></IconButton>
                    <DoctorDegree degrees={doctorDegrees} refetch={refetch} fetching={isLoading} />
                </div>
            </Modal>

        </div>
    );
}

export default AddDoctor;
