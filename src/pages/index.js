import About from "@/components/Home/About";
import BestDoctors from "@/components/Home/BestDoctors";
import Hero from "@/components/Home/Hero";
import Head from "next/head";

export default function Home() {
  return <>
    <Head>
      <title>Medi Care - Home</title>
    </Head>

    <Hero />

    <About />

    <BestDoctors />

  </>
}