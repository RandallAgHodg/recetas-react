import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormLogin } from "../components/FormLogin";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <div>
      <Layout title="index">
        <main className="flex bg-index-image bg-no-repeat bg-cover justify-center items-center min-h-[90vh]">
          <FormLogin className="z-20 bg-red-500" />
        </main>
      </Layout>
    </div>
  );
}
