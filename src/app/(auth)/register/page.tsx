"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { Checkbox } from "@nextui-org/react";
import axios, { AxiosError } from "axios";

type FormInputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
  isAgree: boolean;
};

type InputType = {
  name: keyof FormInputs;
  label: string;
  placeholder?: string;
  rules: RegisterOptions;
  type: "email" | "text" | "password" | "tel";
};

const input_arr: InputType[] = [
  {
    name: "name",
    label: "Full Name",
    rules: { required: "Please enter your full name" },
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    rules: {
      required: "Please enter your email",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    },
    type: "email",
  },
  {
    name: "phone",
    label: "Phone NO",
    rules: {
      required: "Please enter your phone",
      pattern: {
        value: /^(?:0)(?:13|14|15|16|17|18|19)\d{8}$/,
        message: "Phone number should be like 01234567890",
      },
    },
    type: "tel",
  },
  {
    name: "password",
    label: "Password",
    rules: { required: "Please enter your password" },
    type: "password",
  },
];

export default function Page() {
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  // react-hook-form
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: { isAgree: false },
  });
  const { isAgree } = useWatch({ control });

  // register handler
  const registerHandler: SubmitHandler<FormInputs> = async (formData) => {
    try {
      setMsg("");
      setLoading(false);
      if (formData.isAgree) delete formData.isAgree;
      await axios.post(`/api/auth/register`, formData);

      reset();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response.data.message || "Sorry! Something went wrong";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 flex justify-center">
      <div className="bg-primary bg-opacity-5 rounded-xl shadow-xl px-5 pt-4 pb-5 max-sm:w-[92%] sm:w-[400px]">
        <div className="mx-auto w-28">
          <Image
            draggable={false}
            src="/images/text-logo.png"
            width={200}
            height={200}
            className="w-full h-full object-cover mix-blend-multiply"
            alt="logo"
          />
        </div>
        <form className="mt-2" onSubmit={handleSubmit(registerHandler)}>
          <h2 className="text-lg text-primary font-semibold text-center">
            Register
          </h2>
          <div className="flex flex-col gap-4 mt-3 font-medium">
            {input_arr.map((input, index) => (
              <Input
                key={index}
                label={input.label}
                type={input.type}
                color="primary"
                {...register(input.name, input.rules)}
                errorMessage={errors[input.name]?.message}
                isInvalid={Boolean(errors[input.name])}
                placeholder={input.placeholder}
              />
            ))}

            <Controller
              control={control}
              name="isAgree"
              render={({ field }) => (
                <Checkbox
                  size="sm"
                  isSelected={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  Agree to{" "}
                  <Link className="underline" href={"/terms-conditions"}>
                    Terms & Conditions
                  </Link>
                </Checkbox>
              )}
            />

            {msg && (
              <p className="text-red-500 text-sm text-center font-semibold">
                {msg}
              </p>
            )}
            <p className="text-sm text-center">
              {"Have an account. Please login "}
              <Link className="underline text-primary" href={"/login"}>
                here
              </Link>
            </p>
            <Button
              color="primary"
              type="submit"
              isLoading={loading}
              isDisabled={!isAgree || loading}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
