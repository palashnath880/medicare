"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  // states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // login handler
  const loginHandler = async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const login = await signIn("credentials", {
        redirect: false,
        throwOnError: true,
        ...data,
      });
      if (login.error !== "") {
        const message =
          login.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "Sorry! Something went wrong";
        setError(message);
      } else {
        reset();
      }
    } catch (err) {
      console.error(err);
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
            <h2 className="text-lg text-primary font-semibold text-center">
              Login
            </h2>
            <div className="flex flex-col gap-4 mt-3 font-medium">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-primary">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className={`text-sm text-primary border ${
                    errors["email"] ? "border-red-500" : "border-primary"
                  } bg-transparent rounded-lg px-3 py-2.5 outline-none`}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "invalid",
                    },
                  })}
                />
                {errors?.email?.message === "invalid" && (
                  <span className="text-xs text-red-500">Invalid Email</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-primary">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className={`text-sm text-primary border ${
                    errors["password"] ? "border-red-500" : "border-primary"
                  } bg-transparent rounded-lg px-3 py-2.5 outline-none`}
                  {...register("password", { required: true })}
                />
              </div>
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
              <button
                disabled={submitting}
                className="px-5 py-2.5 bg-primary border-2 border-primary text-white rounded-lg text-sm font-semibold hover:bg-transparent hover:text-primary duration-200"
              >
                {submitting ? "Processing" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
