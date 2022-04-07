import React, { useState } from "react";
import { PostDialog } from "./PostDialog";

export const PostsAdmin = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className={`rounded-lg border-[1px] border-gray-400 p-4 bg-sky-300 uppercase text-white font-Nunito font-semibold transition ease-in-out duration-300 hover:bg-sky-400`}
        >
          Comparte una receta
        </button>
        <PostDialog
          isOpen={isOpen}
          categories={categories}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};
