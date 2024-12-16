"use client";

import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import { toast } from "react-toastify";
import { IoCropSharp, IoClose } from "react-icons/io5";
import { dataURLToBlob } from "@/lib/utils";

type ImageCropperProps = {
  onCrop: (p1: Blob) => void;
  value: Blob;
};

export default function ImageCropper({ onCrop, value }: ImageCropperProps) {
  // states
  const [image, setImage] = useState<null | Blob>(null);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const ref = useRef(null);
  const input = useRef(null);

  // close modal
  const handleClose = () => {
    onOpenChange();
    setImage(null);
  };

  // file input change
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error(`Accept only image`);
      return;
    }
    setImage(file);
    onOpen();
    e.target.value = "";
  };

  const cropped = () => {
    const cropper = ref.current?.cropper;
    if (cropper) {
      const dataurl = cropper
        .getCroppedCanvas({ width: 220, height: 220 })
        .toDataURL("image/webp", 0.7);
      onCrop(dataURLToBlob(dataurl));
      handleClose();
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        className="hidden"
        ref={input}
        accept="image/*"
        onChange={fileHandler}
      />
      <Tooltip content="Set Doctor Picture" color="primary" radius="sm">
        <Avatar
          color="default"
          className="w-24 h-24 cursor-pointer border-2 border-primary"
          src={value ? URL.createObjectURL(value) : null}
          onClick={() => input?.current?.click()}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="md:max-w-[700px]">
          {() => (
            <>
              <ModalBody className="!pt-6">
                <div className="aspect-video overflow-hidden">
                  <Cropper
                    src={
                      image && typeof image === "object"
                        ? URL.createObjectURL(image)
                        : null
                    }
                    className="w-full h-full rounded-md overflow-hidden -z-10"
                    initialAspectRatio={1 / 1}
                    aspectRatio={1 / 1}
                    ref={ref}
                    guides={false}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex items-center gap-3">
                  <Button
                    color="success"
                    className="text-white font-medium"
                    startContent={<IoCropSharp className="w-5 h-5" />}
                    onPress={cropped}
                    isDisabled={!ref.current}
                  >
                    Cropped
                  </Button>
                  <Button
                    color="danger"
                    className="font-medium"
                    onPress={handleClose}
                    startContent={<IoClose className="w-5 h-5" />}
                  >
                    Cancel
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
