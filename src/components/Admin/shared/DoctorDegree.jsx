import { modifiedToast } from '@/lib/utilities';
import { Add, Delete } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const DoctorDegree = ({ degrees, refetch, fetching }) => {

    // states
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // add handler
    const addDegree = async (e) => {

        e.preventDefault();
        if (!input) { /// if input state is empty
            return;
        }

        setError('') // error state clear

        if (Array.isArray(degrees)) { // duplicate degree name check
            const findDegree = degrees.find(i => i.name === input);
            if (findDegree) {
                setError('Degree name already exists');
                return;
            }
        }

        try {
            setLoading(true);
            await axios.post('/api/degree', { name: input });
            setInput('');
            modifiedToast('Degree Added', false);
            typeof refetch === 'function' && refetch(); // refetch degrees
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col max-h-full gap-y-6'>
            <div className='border-b-2 border-primary border-opacity-20 pb-2 flex justify-between'>
                <h2 className='text-2xl font-bold text-primary'>Add Doctor Degree</h2>
            </div>
            <div className='w-full flex flex-col gap-1.5'>
                <form className='flex items-center gap-2 w-full' onSubmit={addDegree}>
                    <TextField
                        fullWidth
                        size='small'
                        label='Degree Name'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        InputLabelProps={{ className: '!text-sm' }}
                        inputProps={{ className: '!text-sm' }}
                    />
                    <Button type='submit' disabled={Boolean(!input) || loading} startIcon={<Add />} variant='contained' className='!font-medium'>
                        Add
                    </Button>
                </form>
                {error && <p className='text-sm text-center text-red-500'>{error}</p>}
            </div>
            <div className='flex-1'>
                {/* loading spinner animation */}
                {fetching && <div className='py-5 flex justify-center text-primary'>
                    <CircularProgress color='inherit' size={42} />
                </div>}

                {/* data show */}
                <div className='max-h-full overflow-y-auto flex flex-col gap-2'>
                    {!fetching && Array.isArray(degrees) && degrees.map(({ _id, name }) => <div key={_id} className='flex items-center justify-between bg-primary px-2 py-2 text-primary bg-opacity-10 rounded-md shadow'>
                        <p className='font-medium text-sm flex-1'>{name}</p>
                        <IconButton size='small'><Delete fontSize='small' className='!text-red-500' /></IconButton>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default DoctorDegree;
