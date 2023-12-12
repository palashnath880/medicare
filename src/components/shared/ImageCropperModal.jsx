'use client'

import { Crop } from '@mui/icons-material';
import { Button, Modal } from '@mui/material';
import React, { useRef } from 'react';
import { Cropper } from 'react-cropper';

const ImageCropperModal = ({ open, close, image, setImage }) => {

    const cropperRef = useRef();

    // handle close
    const handleClose = () => {
        typeof close === 'function' && close();
    }


    return (
        <Modal className='grid place-items-center' open={open} onClose={handleClose}>
            <div className='!outline-none w-[90vw] h-[90vh] rounded-md bg-white relative'>
                <div className='w-full h-full z-10 absolute top-0 left-0 p-2'>
                    <Cropper
                        src={image && typeof image === 'object' ? URL.createObjectURL(image) : null}
                        className='w-full h-full rounded-md overflow-hidden -z-10'
                        initialAspectRatio={1 / 1}
                        aspectRatio={1 / 1}
                        ref={cropperRef}
                        guides={false}
                    />
                </div>
                <Button
                    variant='contained'
                    className='!absolute !right-5 !bottom-5 !z-50 !capitalize !px-8 !py-2.5'
                    startIcon={<Crop />}
                    onClick={() => {
                        const cropper = cropperRef.current?.cropper;
                        if (cropper) {
                            const dataurl = cropper.getCroppedCanvas().toDataURL('image/png', 0.7);
                            setImage(dataurl);
                        }
                    }}
                >Crop</Button>
            </div>
        </Modal>
    );
}

export default ImageCropperModal;
