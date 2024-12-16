"use client";

import ImageCropper from "@/components/Admin/shared/ImageCropper";
import PageHeading from "@/components/Admin/shared/PageHeading";
import { uploadImage } from "@/lib/utils";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Degree, Doctor } from "@prisma/client";
import axios, { AxiosError } from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

type Inputs = Doctor & { image: Blob };

const specialists = [
  "Cardiologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Hematologist",
  "Infectious Disease Doctor",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Pulmonologist",
  "Rheumatologist",
  "Allergist/Immunologist",
  "Anesthesiologist",
  "Colon and Rectal Surgeon",
  "Dermatologist",
  "Emergency Medicine Doctor",
  "Family Physician",
  "Obstetrician/Gynecologist",
  "Ophthalmologist",
  "Otolaryngologist (ENT)",
  "Pathologist",
  "Pediatrician",
  "Physical Medicine and Rehabilitation Specialist",
  "Plastic Surgeon",
  "Psychiatrist",
  "Radiologist",
  "Surgeon",
  "Urologist",
];

export default function Page() {
  // react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<Inputs>({ defaultValues: { visitPrice: 0 } });

  // get degree
  const degree = useQuery<Degree[]>({
    queryFn: async () => {
      const res = await axios.get(`/api/degree`);
      return res.data;
    },
  });

  // add doctor
  const addDr = useMutation<any, AxiosError<{ message: string }>, Inputs>({
    mutationFn: async (data) => {
      const drData: any = { ...data };
      const uploadImg: any = await uploadImage(data.image);
      drData.image = {
        delete_url: uploadImg.delete_url,
        display_url: uploadImg.display_url,
      };
      drData.visitPrice = parseFloat(drData.visitPrice);
      console.log(drData);
      return axios.post(`/api/doctors`, drData);
    },
    onSuccess: () => {
      toast.success(`Doctor added successfully`);
      reset();
    },
  });

  return (
    <div>
      <PageHeading>Add Doctor</PageHeading>

      <div className="py-10">
        <form
          onSubmit={handleSubmit((value) => addDr.mutate(value))}
          className="mx-auto bg-[#f2f2f2] shadow-md px-5 py-5 rounded-lg max-w-[600px] w-full"
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <Input
              label="Doctor Name"
              color="primary"
              {...register("name", { required: "This field is required" })}
              isInvalid={Boolean(errors["name"])}
              errorMessage={errors["name"]?.message}
              type="text"
            />
            <Input
              label="Current Employee Of"
              color="primary"
              {...register("employeeOf", {
                required: "This field is required",
              })}
              isInvalid={Boolean(errors["employeeOf"])}
              errorMessage={errors["employeeOf"]?.message}
              type="text"
            />

            <Controller
              control={control}
              name="specialist"
              rules={{ required: "This field is required" }}
              render={({ field, fieldState }) => (
                <Select
                  label="Select Specialist"
                  color="primary"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  selectedKeys={[field.value]}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {specialists.map((item) => (
                    <SelectItem key={item}>{item}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              control={control}
              name="degreeId"
              rules={{ required: "This field is required" }}
              render={({ field, fieldState }) => (
                <Select
                  label="Select Degree"
                  color="primary"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  selectedKeys={[field.value]}
                  onChange={(e) => field.onChange(e.target.value)}
                  isDisabled={degree.isLoading || degree?.data?.length <= 0}
                >
                  {degree?.data?.map((item) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Input
              label="Visit Price"
              color="primary"
              {...register("visitPrice", {
                required: "This field is required",
                min: 1,
              })}
              isInvalid={Boolean(errors["visitPrice"])}
              errorMessage={errors["visitPrice"]?.message}
              type="number"
              step={0.01}
              startContent={<>&#2547;</>}
            />

            <div className="flex flex-col items-center gap-2">
              <Controller
                control={control}
                name="image"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <>
                    <ImageCropper
                      value={field.value}
                      onCrop={(val) => field.onChange(val)}
                    />
                    {fieldState.error && (
                      <p className="text-xs text-red-500">
                        Please select doctor picture
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* error message */}
            {addDr.isError && (
              <div className="col-span-full text-center">
                <p className="text-sm text-red-500 pt-4 font-medium">
                  {addDr.error.response?.data?.message ||
                    "Sorry! Something went wrong"}
                </p>
              </div>
            )}

            <div className="col-span-full">
              <Button
                fullWidth
                isDisabled={addDr.isLoading}
                startContent={
                  !addDr.isLoading && <FaPlus className="h-5 w-5" />
                }
                type="submit"
                color="primary"
                isLoading={addDr.isLoading}
              >
                Add Doctor
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
