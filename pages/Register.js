import Image from "next/image";
import React from "react";
import { FormRegister } from "../components/FormRegister";
import { Layout } from "../components/Layout";

const Register = () => {
  return (
    <Layout title="Register">
      <main className="flex min-h-[90vh] justify-center relative overflow-hidden font-B612">
        <div className="bg-amber-800 flex-1 rotate-12 scale-150" />
        <div className="bg-CherryBlossomPink flex-1  rotate-12 scale-150 translate-x-1/4" />
        <div className="bg-transparent top-14 container absolute">
          <div className="flex h-[90vh] transparent items-center">
            <div className="flex flex-col gap-14 flex-1">
              <h2 className="text-6xl text-white font-bold">
                Crea una cuenta en comidin para compartir, explorar y puntuar
                las recetas de usuarios de todo el mundo !!
              </h2>

              <div>
                <div className="flex gap-5">
                  <Image width={50} height={50} src="/star-full.png" />
                  <Image width={50} height={50} src="/star-full.png" />
                  <Image width={50} height={50} src="/star-full.png" />
                  <Image width={50} height={50} src="/star-full.png" />
                </div>
                <p className="text-white">
                  Nuestros usuarios nos califican con 4 de 5 estrellas <br />{" "}
                  basado en mas de 32000+ reseñas
                </p>
              </div>
            </div>
            <div className="flex-1">
              <FormRegister />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Register;
