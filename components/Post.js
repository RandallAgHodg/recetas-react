import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils/dateFormatter";
import { PostDialog } from "./PostDialog";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const Post = ({ data, width, height, isUpdate, categories }) => {
  const router = useRouter();
  const [imagehover, setImagehover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const editPost = () => {
    setIsOpen(true);
  };

  const removePost = () => {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: "Seguro que desea borrar la receta?",
      confirmButtonText: "Ok",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = Cookies.get("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`,
          config
        );
        Swal.fire({
          icon: "success",
          title: "Receta eliminada",
          text: "La receta fue eliminada exitosamente",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setIsOpen(false);
            router.reload();
          }
        });
      }
    });
  };

  return (
    <>
      <div
        className="mt-7 h-fit
    bg-white rounded-md shadow-2xl"
      >
        <div className={`pb-6 relative`}>
          <Image
            width={width}
            height={height}
            layout="responsive"
            objectFit="cover"
            src={data.pictureUrl}
            alt={`Recipe ${data.title}`}
          />
          {isUpdate && (
            <div
              onMouseEnter={() => setImagehover(true)}
              onMouseLeave={() => setImagehover(false)}
              className="absolute -top-3 flex flex-col items-center transition ease-in-out duration-300 hover:bg-black hover:bg-opacity-20 w-full h-full"
            >
              <button
                className={`${
                  imagehover ? `` : "hidden"
                } delay-100 w-[30%] py-3 px-14 font-Nunito rounded-xl font-semibold border-white border-2 border-solid text-white
               text-4xl transition ease-in-out duration-300 mt-36 hover:cursor-pointer hover:bg-white hover:text-neutral-500`}
                onClick={(e) => editPost(e)}
              >
                Editar
              </button>
              <button
                className={`${
                  imagehover ? `` : "hidden"
                } delay-100 w-[30%] py-3 px-14 font-Nunito rounded-xl font-semibold mt-36 border-white border-2 border-solid text-white
               text-4xl transition ease-in-out duration-300  hover:cursor-pointer hover:bg-white hover:text-neutral-500`}
                onClick={() => removePost()}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
        <div className="flex-col w-[95%] mx-auto ">
          <h2 className=" font-Roboto text-5xl font-normal">{data.title}</h2>
          <div className="flex justify-between">
            <h3 className="text-imperialRed">
              {formatDate(data.publishedDate)}
            </h3>
            <h3>{`Score: ${data.score}`}</h3>
          </div>
          <div className="flex-col">
            <p className="description overflow-hidden">{data.description}</p>
            <Link href={`/usuario/${data.user.username}`}>
              <h3 className="mt-5 text-gray-400 text-2xl hover:underline hover:cursor-pointer">
                {data.user.username}
              </h3>
            </Link>
          </div>
          <Link href={`/post/${data.id}`}>
            <button className=" px-7 w-full py-3 my-5 font-Nunito bg-FieryRose text-4xl font-semibold text-white transition ease-in-out duration-200 hover:bg-BrightMaroon hover:cursor-pointer">
              Ver Receta
            </button>
          </Link>
        </div>
      </div>
      {categories && (
        <PostDialog
          isOpen={isOpen}
          data={data}
          isUpdate={isUpdate}
          setIsOpen={setIsOpen}
          categories={categories}
        />
      )}
    </>
  );
};
