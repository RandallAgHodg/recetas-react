import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { TextField } from "./TextField";
import { postToFormData } from "../utils/formData";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const sendData = async (formData) => {
  const token = Cookies.get("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return await axios.post(
    "https://localhost:7154/api/v1/posts",
    formData,
    config
  );
};

export const PostDialog = ({
  isOpen,
  setIsOpen,
  categories,
  isUpdate,
  data,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [selected, setSelected] = useState(categories[0]);
  const [categoryId, setCategoryId] = useState(selected.id);

  useEffect(() => {
    if (isUpdate) {
      const { title, description, preparation, ingredients, category } = data;
      const selectedCategory = categories.find((x) => x.id === category.id);
      setTitle(title);
      setSelected(selectedCategory);
      setDescription(description);
      setPreparation(preparation);
      setIngredients(ingredients);
    }
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    setCategoryId(selected.id);
    const postInfo = {
      title,
      description,
      preparation,
      ingredients,
      picture: postPicture,
      categoryId,
    };

    try {
      const formData = postToFormData(postInfo);
      await sendData(formData);

      Swal.fire({
        icon: "success",
        title: "Receta publicada",
        text: "La receta fue publicado exitosamente",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsOpen(false);
          router.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error del servidor",
        text: error.response.data,
      });
      return;
    }
  };

  const editPost = async (e) => {
    e.preventDefault();
    setCategoryId(selected.id);
    const postInfo = {
      title,
      description,
      preparation,
      ingredients,
      picture: postPicture,
      categoryId,
    };
    console.log(selected);
    try {
      const formData = postToFormData(postInfo);
      const token = Cookies.get("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`,
        formData,
        config
      );

      Swal.fire({
        icon: "success",
        title: "Receta editada",
        text: "El post fue editado exitosamente",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsOpen(false);
          router.reload();
        }
      });
      return;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error del servidor",
        text: error.response.data,
      });
      return;
    }
  };

  const handleListboxChange = (e) => {
    setSelected(e);
    setCategoryId(e.id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-slate-300 bg-opacity-60 "
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
            <div className="inline-block w-[70vw] border-solid border-t-8 border-t-Claret2 min-h-fit p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-4xl mt-4 font-Nunito  text-center font-semibold leading-6 text-gray-900"
              >
                {isUpdate ? "Editar Receta" : "Publicar Receta"}
              </Dialog.Title>
              <form className="flex gap-9 m-10 justify-between">
                <div className="flex flex-col">
                  <TextField
                    TextFields={[
                      {
                        key: "TP1",
                        name: "Titulo",
                        type: "text",
                        value: title,
                        setState: setTitle,
                      },
                    ]}
                  />

                  <textarea
                    placeholder="Describa brevemente la receta"
                    className={`
                my-6
                block
                py-4
                w-[28vw]
                text-3xl
                text-left
                rounded-md
                bg-gray-200
                border-transparent
                focus:border-gray-500`}
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <textarea
                    placeholder="Mencione los ingredientes necesarios para la elaboración de la receta (preferiblemente con su unidad de medida)"
                    className={`
              my-6
              block
              py-4
              w-[28vw]
              text-3xl
              text-left
              rounded-md
              bg-gray-200
              border-transparent
              focus:border-gray-500`}
                    rows="15"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                  <input
                    className="
                    border border-solid border-gray-300"
                    type="file"
                    onChange={(e) => setPostPicture(e.target.files[0])}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
                <div
                  className="flex 
                    w-[35vw] flex-col"
                >
                  <div className="w-full">
                    <Listbox
                      value={selected}
                      onChange={(e) => handleListboxChange(e)}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative h-14 w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                          <span className="block truncate text-3xl font-Roboto font-light">
                            {selected.name}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="w-10 h-10 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.map((category) => (
                              <Listbox.Option
                                key={category.id}
                                className={({ active }) =>
                                  `cursor-default text-3xl font-Roboto font-light select-none relative py-2 pl-10 pr-4 ${
                                    active
                                      ? "text-amber-900 bg-Pink"
                                      : "text-gray-900"
                                  }`
                                }
                                value={category}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {category.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="w-7 h-7"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <textarea
                    placeholder="Explique el proceso de elaboración de la receta"
                    className={`
              mt-64
              block
              py-4
              text-3xl
              text-left
              rounded-md
              bg-gray-200
              border-transparent
              focus:border-gray-500`}
                    rows="20"
                    value={preparation}
                    onChange={(e) => setPreparation(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={
                      isUpdate ? (e) => editPost(e) : (e) => createPost(e)
                    }
                    className=" px-7 w-full py-3 my-5 font-Nunito bg-Claret text-4xl font-semibold text-white transition ease-in-out duration-200 hover:bg-Claret2 hover:cursor-pointer"
                  >
                    Realizar Publicación
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
