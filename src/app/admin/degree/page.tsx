"use client";

import PageHeading from "@/components/Admin/shared/PageHeading";
import {
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
import { Degree } from "@prisma/client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

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
  // modal controller
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ id: "DegreeAdd" });

  // react-query
  const {
    data: degrees,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery<Degree[]>({
    queryKey: ["degree"],
    queryFn: async () => {
      const res = await axios.get(`/api/degree`);
      return res.data;
    },
  });

  // table top content
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder="Search by name..."
            startContent={<FaSearch />}
            // value={filterValue}
            // onClear={() => onClear()}
            // onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
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
        {/* <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div> */}
      </div>
    );
  }, [refetch, onOpen]);

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
          loadingContent={<Spinner />}
          emptyContent="No degree to display"
        >
          {isSuccess && degrees?.length > 0
            ? degrees.map((degree, index) => (
                <TableRow key={index}>
                  <TableCell>{degree.name}</TableCell>
                  <TableCell>0</TableCell>
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
