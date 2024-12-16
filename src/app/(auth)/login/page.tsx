"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type Inputs = {
  login: string;
  password: string;
};

export default function Page() {
  // states
  const [submitting, setSubmitting] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [error, setError] = useState("");
  const search = useSearchParams();
  const redirectTo = search.get("redirectTo") || window.location.origin;
  const router = useRouter();

  // react-hook-form
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  // login handler
  const loginHandler = async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const login = await signIn("credentials", {
        redirect: false,
        redirectTo: redirectTo,
        // throwOnError: false,
        ...data,
      });
      if (login.error !== null) {
        const message =
          login.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "Sorry! Something went wrong";
        setError(message);
      } else {
        reset();
        router.replace(login.url);
      }
    } catch {
      setError("Sorry! Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="w-full py-20 grid place-items-center bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(#00000075, #00000075),url(/images/hospital-equipment.webp)`,
        }}
      >
        <div className="bg-[#f2f2f2] rounded-xl shadow-xl px-5 pt-4 pb-5 max-sm:w-[92%] sm:w-[400px]">
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
          <form className="mt-2" onSubmit={handleSubmit(loginHandler)}>
            <h2 className="text-lg w-full text-primary font-semibold text-center">
              Login
            </h2>
            <div className="flex flex-col gap-4 mt-3 font-medium w-full">
              {/* email input */}

              <Input
                isRequired={true}
                label="Email or Phone"
                color="primary"
                {...register("login", {
                  required: "Please enter your email or phone",
                })}
                isInvalid={Boolean(errors?.login)}
                errorMessage={errors?.login?.message}
              />

              {/* password input */}
              <Input
                isRequired={true}
                label="Password"
                color="primary"
                {...register("password", {
                  required: "Please enter your password",
                })}
                type={isShow ? "text" : "password"}
                isInvalid={Boolean(errors["password"])}
                errorMessage={errors?.password?.message}
                endContent={
                  <button
                    type="button"
                    className="self-center mt-1"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {isShow ? (
                      <IoMdEye className="w-6 h-6" />
                    ) : (
                      <IoMdEyeOff className="w-6 h-6" />
                    )}
                  </button>
                }
              />

              {error && (
                <p className="text-red-500 text-sm text-center font-semibold">
                  {error}
                </p>
              )}
              <p className="text-sm text-center">
                {"Don't have an account. Please register "}
                <Link className="underline text-primary" href={"/register"}>
                  here
                </Link>
              </p>
              <Button disabled={submitting} color="primary" type="submit">
                {submitting ? "Processing" : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
