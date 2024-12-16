"use client";

import PageHeading from "@/components/Admin/shared/PageHeading";
import axios from "axios";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "react-query";

import React from "react";
import {
  Button,
  Alert,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Pagination,
  Input,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import type { Degree, Doctor, Image } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { SlRefresh } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import DoctorAction from "@/components/Admin/Doctor/DoctorAction";

type DoctorType = Doctor & { degree: Degree; image: Image };

export default function Page() {
  // search params
  const search = useSearchParams();
  const page = parseInt(search.get("page")) || 1;
  const router = useRouter();
  const limit = 30;

  // react query
  const { data, isLoading, refetch, isSuccess, isError } = useQuery<{
    count: number;
    doctors: DoctorType[];
  }>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axios.get(`/api/doctors`);
      return res.data;
    },
  });

  // pagination handler
  const handler = (number: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", number.toString());
    router.push(`?${params.toString()}`);
  };

  // search handler
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("search");
    const params = new URLSearchParams(window.location.search);
    params.set("search", value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <PageHeading>All Doctors</PageHeading>

      <div className="mt-5 flex justify-between items-center">
        <form onSubmit={searchHandler}>
          <Input
            label="Search Doctor's"
            placeholder="Search doctor's by name or specialist"
            color="primary"
            className="w-72 !font-medium"
            name="search"
            isRequired={false}
          />
        </form>
        <div className="flex items-center gap-4">
          <Button
            startContent={<SlRefresh />}
            color="primary"
            radius="sm"
            onClick={() => refetch()}
          >
            Refresh
          </Button>
          <Link href={"/admin/doctors/add"}>
            <Button startContent={<FaPlus />} color="primary" radius="sm">
              Add Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* display doctors  */}
      <div className="mt-10" aria-label="Display doctors">
        {/* loader */}
        {isLoading && (
          <div className="h-56 flex justify-center">
            <Spinner size="lg" label="Fetching..." labelColor="primary" />
          </div>
        )}

        {/* if fetching query is success */}
        {isSuccess && (
          <Table
            aria-label="Display Doctor's"
            bottomContent={
              data.count > 0 && (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={Math.ceil(data.count / limit) || 1}
                    onChange={(val) => handler(val)}
                  />
                </div>
              )
            }
          >
            <TableHeader>
              <TableColumn>{""}</TableColumn>
              <TableColumn>Degree</TableColumn>
              <TableColumn>Employee Of</TableColumn>
              <TableColumn>{""}</TableColumn>
            </TableHeader>
            <TableBody emptyContent={`No doctor's to display`}>
              {data?.doctors?.map((doctor, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <User
                      name={doctor.name}
                      description={doctor.specialist}
                      avatarProps={{ src: doctor.image.display_url }}
                    />
                  </TableCell>
                  <TableCell>{doctor.degree?.name}</TableCell>
                  <TableCell>{doctor.employeeOf}</TableCell>
                  <TableCell>
                    <DoctorAction doctor={doctor} refetch={refetch} />
                  </TableCell>
                </TableRow>
              )) || []}
            </TableBody>
          </Table>
        )}

        {/* is error */}
        {isError && (
          <Alert
            color="danger"
            title="Sorry! Something went wrong"
            variant="solid"
          />
        )}
      </div>
    </>
  );
}
