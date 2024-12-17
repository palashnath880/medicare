"use client";

import PageHeading from "@/components/Admin/shared/PageHeading";
import {
  Avatar,
  AvatarGroup,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Degree, Doctor, Image } from "@prisma/client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type DegreeType = Degree & {
  doctor: Doctor & { image: Image }[];
};

const AddModal = ({
  isOpen,
  onOpenChange,
  refetch,
}: {
  isOpen: any;
  onOpenChange: () => void;
  refetch: () => void;
}) => {
  const [val, setVal] = useState<string>("");

  // add degree
  const addDegree = useMutation<any, AxiosError<{ message: string }>, string>({
    mutationFn: (name) => {
      return axios.post(`/api/degree`, { name });
    },
    onSuccess: (_, name) => {
      toast.success(`${name} added successfully`);
      setVal("");
      refetch();
    },
  });

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen} hideCloseButton>
      <ModalContent>
        <ModalHeader>Add New Degree</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Degree Name"
              color="primary"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              isRequired
            />
            {addDegree.isError && (
              <p className="text-center text-sm text-red-500">
                {addDegree.error.response?.data?.message ||
                  "Sorry! Something went wrong"}
              </p>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            radius="sm"
            startContent={<FaPlus className="w-3 h-3" />}
            isDisabled={!val || addDegree.isLoading}
            onPress={() => addDegree.mutate(val)}
          >
            Add Degree
          </Button>
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
  );
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // modal controller
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ id: "DegreeAdd" });

  // react-query
  const {
    data: degrees,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery<DegreeType[]>({
    queryKey: ["degree", searchQuery],
    queryFn: async () => {
      const res = await axios.get(`/api/degree?search=${searchQuery}`);
      return res.data;
    },
  });

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
            <Button color="primary" startContent={<FaPlus />} onPress={onOpen}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {degrees?.length || 0} degrees
          </span>
        </div>
      </div>
    );
  }, [refetch, onOpen, degrees, searchQuery, router]);

  return (
    <>
      <PageHeading>Degree</PageHeading>

      <Table
        aria-label="Degree Table"
        classNames={{ base: "!mt-10" }}
        topContent={topContent}
        isStriped
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>{"Doctor's"}</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={
            <div className="mt-20">
              <Spinner />
            </div>
          }
          emptyContent="No degree to display"
        >
          {isSuccess && degrees?.length > 0
            ? degrees.map((degree, index) => (
                <TableRow key={index}>
                  <TableCell>{degree.name}</TableCell>
                  <TableCell>
                    {degree.doctor?.length > 0 && (
                      <AvatarGroup isBordered>
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                      </AvatarGroup>
                    )}
                  </TableCell>
                  <TableCell>
                    {moment(degree.createdAt).format("lll")}
                  </TableCell>
                  <TableCell>
                    <></>
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>

      {/* add degree popup */}
      <AddModal isOpen={isOpen} onOpenChange={onOpenChange} refetch={refetch} />
    </>
  );
}
