import React from "react";
import Link from "next/link";
export const CategoryTab = ({ category }) => {
  const { id, name } = category;
  return (
    <Link href={`/posts/${id}`}>
      <li className="py-6 w-[20%] text-center font-Nunito font-medium text-4xl transition ease-in-out duration-300 cursor-pointer hover:bg-CherryBlossomPink">
        {name}
      </li>
    </Link>
  );
};
