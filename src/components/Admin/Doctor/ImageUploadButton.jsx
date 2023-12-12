'use client'

import ImageCropperModal from '@/components/shared/ImageCropperModal';
import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

const ImageUploadButton = ({ setImage, disabled, children, image }) => {

    // states
    const [isOpen, setIsOpen] = useState(null);
    const [error, setError] = useState('');

    return (
        <>
            <div className='aspect-square border-2 border-dashed border-primary grid place-items-center relative'>
                <Button disabled={disabled} component="label" variant="contained" startIcon={<CloudUpload />} className='!font-medium !capitalize z-10'>
                    {children}
                    <input
                        style={{
                            clip: 'rect(0 0 0 0)',
                            clipPath: 'inset(50%)',
                            height: 1,
                            overflow: 'hidden',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            whiteSpace: 'nowrap',
                            width: 1,
                        }}
                        type='file'
                        onChange={(e) => {
                            if (['image/jpeg', 'image/png', 'image/webp'].includes(e.target.files[0].type)) { // file type check
                                setIsOpen(e.target.files[0]);
                                setError('');
                            } else {
                                setError('File type not supported. Accept only .png, .jpg .webp type');
                            }
                        }}
                    />
                </Button>
                {image && <div className='top-0 left-0 absolute w-full h-full'>
                    <span className='w-full h-full bg-black absolute top-0 left-0 bg-opacity-30' />
                    <Image width={300} height={300} alt='Doctor' className='w-full h-full object-cover' src={image} />
                </div>}
            </div>
            {error && <span className='text-red-500 text-xs font-medium'>{error}</span>}
            <ImageCropperModal
                close={() => setIsOpen(null)}
                open={Boolean(isOpen)}
                image={isOpen}
                setImage={(e) => {
                    setImage(e);
                    setIsOpen(null);
                }}
            />
        </>
    );
}

export default ImageUploadButton;
