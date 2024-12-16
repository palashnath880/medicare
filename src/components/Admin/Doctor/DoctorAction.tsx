import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Doctor } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function DoctorAction({
  doctor,
  refetch,
}: {
  doctor: Doctor;
  refetch: () => void;
}) {
  // states
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // delete handler
  const deleteDr = useMutation<any, any, string>({
    mutationFn: (id) => axios.delete(`/api/doctors/${id}`),
    onSuccess: () => {
      toast.success(`Doctor deleted successfully.`);
      refetch();
      setIsOpen(false);
    },
    onError: () => {
      toast.error(`Doctor could not be deleted.`);
    },
  });

  return (
    <div>
      <Popover
        color="default"
        placement="left-end"
        showArrow
        isOpen={isOpen}
        onOpenChange={(val) => setIsOpen(val)}
      >
        <PopoverTrigger>
          <Button isIconOnly color="danger">
            <MdDelete className="w-5 h-5 text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {() => (
            <div className="px-2 py-2">
              <div className="flex justify-center pb-4">
                <MdDelete className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-sm font-medium mb-3 text-center">
                Are you sure to delete doctor?
                <br />
                <b className="text-lg">{doctor?.name}</b>
              </p>
              <ButtonGroup fullWidth isDisabled={deleteDr.isLoading}>
                <Button
                  color="success"
                  className="text-white font-medium"
                  onClick={() => deleteDr.mutate(doctor.id)}
                  isLoading={deleteDr.isLoading}
                >
                  Yes
                </Button>
                <Button
                  color="danger"
                  className="text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  No
                </Button>
              </ButtonGroup>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
