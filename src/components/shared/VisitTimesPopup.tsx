"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { GrSchedule } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";
import { Doctor } from "@prisma/client";

type VisitTimesPopupProps = {
  doctor: Doctor;
};

export default function VisitTimesPopup({ doctor }: VisitTimesPopupProps) {
  // modal controller
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-1/2 !py-3 !rounded-none"
        color="primary"
        startContent={<GrSchedule className="w-4 h-4" />}
      >
        Visit Times
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Doctor Visit Times</ModalHeader>
          <ModalBody>Hello World</ModalBody>
          <ModalFooter>
            <Link href={`/appointment/book/${doctor.id}`}>
              <Button
                color="primary"
                radius="sm"
                startContent={<LuAlarmClock className="w-4 h-4" />}
              >
                Book Appointment
              </Button>
            </Link>
            <Button
              color="danger"
              radius="sm"
              startContent={<IoMdClose className="w-4 h-4" />}
              onPress={onOpenChange}
            >
              Dismiss
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
