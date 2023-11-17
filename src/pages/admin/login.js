'use client'

import Head from "next/head"
import Image from "next/image"

export default function Login() {

    // states

    return <>
        <Head>
            <title>Medi Care - Admin Login</title>
        </Head>

        <div className="w-full h-screen grid place-items-center bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `linear-gradient(#00000075, #00000075),url(/images/hospital-equipment.webp)` }}>
            <div className="bg-[#f2f2f2] rounded-xl shadow-xl px-5 pt-4 pb-5 max-sm:w-[92%] sm:w-[400px]">
                <div className="mx-auto w-28">
                    <Image draggable={false} src='/images/text-logo.png' width={200} height={200} className="w-full h-full object-cover mix-blend-multiply" alt="logo" />
                </div>
                <form className="mt-2">
                    <h2 className="text-lg text-primary font-semibold text-center">Admin Login</h2>
                    <div className="flex flex-col gap-4 mt-3 font-medium">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm text-primary">Email</label>
                            <input type="email" id='email' placeholder="example@gmail.com" className="text-sm text-primary border border-primary bg-transparent rounded-lg px-3 py-2.5 outline-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm text-primary">Password</label>
                            <input type="password" id='password' placeholder="password" className="text-sm text-primary border border-primary bg-transparent rounded-lg px-3 py-2.5 outline-none" />
                        </div>
                        <button className="px-5 py-2.5 bg-primary border-2 border-primary text-white rounded-lg text-sm font-semibold hover:bg-transparent hover:text-primary duration-200">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </>
}