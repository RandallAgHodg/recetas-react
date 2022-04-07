import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

export const ReviewDialog = ({
  isOpen,
  setIsOpen,
  postInfo,
  isUpdate,
  reviewInfo,
}) => {
  const { title, username, id } = postInfo;
  const [score, setScore] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(0);

  useEffect(() => {
    if (isUpdate) {
      setScore(reviewInfo.scoreReview);
      setComment(reviewInfo.commentReview);
      setReviewId(reviewInfo.reviewId);
    }
  }, []);

  const createReview = async (e) => {
    e.preventDefault();
    if (comment === "") {
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    try {
      const reviewBody = { score: Number(score), comment };
      const token = Cookies.get("token");
      if (!token) throw new Error("Auth cookie not found");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/reviews`,
        reviewBody,
        config
      );
      Swal.fire({
        icon: "success",
        title: "Review publicado",
        text: "La review fue publicado exitosamente",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsOpen(false);
          Router.reload();
        }
      });
    } catch (error) {
      const reviewBody = { score: Number(score), comment };
      console.log(reviewBody);
      console.log(error.response.data);
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/reviews`);
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: error.response.data,
      });
      return;
    }
  };

  const updateReview = async (e) => {
    e.preventDefault();
    if (comment === "") {
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    try {
      const reviewBody = { score: Number(score), comment };
      const token = Cookies.get("token");
      if (!token) throw new Error("Auth cookie not found");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/reviews/${reviewId}`,
        reviewBody,
        config
      );
      Swal.fire({
        icon: "success",
        title: "Review publicado",
        text: "La review fue editada exitosamente",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsOpen(false);
          Router.reload();
        }
      });
    } catch (error) {
      const reviewBody = { score: Number(score), comment };
      console.log(reviewBody);
      console.log(error.response.data);
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/reviews`);
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: error.response.data,
      });
      return;
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-slate-300 bg-opacity-60"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-[40vw] h-[47vh] p-6 my-8  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-4xl mt-4 font-Nunito  text-center font-semibold leading-6 text-gray-900"
              >
                Realizar review
              </Dialog.Title>
              <form
                onSubmit={
                  isUpdate ? (e) => updateReview(e) : (e) => createReview(e)
                }
                className="flex flex-col gap-9 items-center mt-10"
              >
                <p className="text-3x">
                  {`Puntua la receta ${title} del chef ${username}`}
                </p>
                <input
                  className="h-0.5 mt-6 w-1/2"
                  type="range"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  min="1"
                  max="5"
                  list="tickmarks"
                />
                <datalist id="tickmarks">
                  <option value="1" />
                  <option value="2" />
                  <option value="3" />
                  <option value="4" />
                  <option value="5" />
                </datalist>

                <textarea
                  placeholder="Comenta sobre la receta"
                  className={`
                    font-B612
                    mt-6
                    block
                    py-4
                    w-[28vw]
                    text-3xl
                    text-left
                    rounded-md
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500`}
                  rows="10"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="my-4">
                  <button
                    type="submit"
                    className="px-4 py-2 w-full text-3xl font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onSubmit={
                      isUpdate ? (e) => updateReview(e) : (e) => createReview(e)
                    }
                  >
                    {isUpdate ? "Editar" : "Publicar"}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
