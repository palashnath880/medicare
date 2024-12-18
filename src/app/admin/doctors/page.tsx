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
import DoctorAction from "@/components/Admin/Doctor/DoctorAction";
import { displayPrice } from "@/lib/utils";
import { FaSearch } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

type DoctorType = Doctor & { degree: Degree; image: Image };

export default function Page() {
  // search params
  const search = useSearchParams();
  const page = parseInt(search.get("page")) || 1;
  const searchQuery = search.get("search") || "";
  const router = useRouter();
  const limit = 30;

  // react query
  const { data, isLoading, refetch } = useQuery<{
    count: number;
    doctors: DoctorType[];
  }>({
    queryKey: ["doctors", searchQuery, page],
    queryFn: async () => {
      const res = await axios.get(
        `/api/doctors?search=${searchQuery}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  // pagination handler
  const handler = (number: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", number.toString());
    router.push(`?${params.toString()}`);
  };

  // table top content
  const topContent = React.useMemo(() => {
    // search handler
    const searchHandler = (text: string) => {
      const search = new URLSearchParams(window.location.search);
      search.set("search", text);
      router.push(`?${search.toString()}`);
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <form
            className="w-full sm:max-w-[30%]"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const value = formData.get("search").toString() || "";
              searchHandler(value);
            }}
          >
            <Input
              isClearable
              className="w-full"
              placeholder="Search by name..."
              startContent={<FaSearch />}
              defaultValue={searchQuery}
              onClear={() => searchHandler("")}
              name="search"
            />
          </form>
          <div className="flex gap-3">
            <Button
              color="primary"
              startContent={<FiRefreshCw />}
              onPress={() => refetch()}
            >
              Refresh
            </Button>
            <Link href={"/admin/doctors/add"}>
              <Button color="primary" startContent={<FaPlus />}>
                Add New
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }, [refetch, router, searchQuery]);

  // table bottom content
  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(data?.count / limit) || 1}
          onChange={(val) => handler(val)}
        />
      </div>
    );
  }, [data, page]);

  return (
    <>
      <PageHeading>All Doctors</PageHeading>

      {/* display doctors  */}
      <div className="mt-10" aria-label="Display doctors">
        <Table
          aria-label="Display Doctor's"
          bottomContent={data?.count > 0 && bottomContent}
          topContent={topContent}
        >
          <TableHeader>
            <TableColumn>{""}</TableColumn>
            <TableColumn>Degree</TableColumn>
            <TableColumn>Employee Of</TableColumn>
            <TableColumn>Visit Price</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={`No doctor's to display`}
            isLoading={isLoading}
            loadingContent={
              <div className="h-56 flex justify-center mt-20">
                <Spinner size="lg" labelColor="primary" />
              </div>
            }
          >
            {data?.doctors?.map((doctor, index) => (
              <TableRow key={index}>
                <TableCell>
                  <User
                    name={doctor.name}
                    description={doctor.specialist}
                    avatarProps={{ src: doctor?.image?.display_url }}
                  />
                </TableCell>
                <TableCell>{doctor.degree?.name}</TableCell>
                <TableCell>{doctor.employeeOf}</TableCell>
                <TableCell>{displayPrice(doctor.visitPrice)}</TableCell>
                <TableCell>
                  <DoctorAction doctor={doctor} refetch={refetch} />
                </TableCell>
              </TableRow>
            )) || []}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
