import React from "react";
import { Post } from "./Post";

export const PostCategoryEntries = ({ data, pages }) => {
  return (
    <div className="w-[35vw] mx-auto">
      <h2 className="mt-20 font-Nunito text-center font-normal text-5xl">
        {data[0].category.name}
        {JSON.stringify(pages)}
      </h2>
      <div className="flex flex-col gap-7 last-of-type:mb-11">
        {data.map((post) => {
          return <Post key={data.id} data={post} width={670} height={450} />;
        })}
      </div>
    </div>
  );
};
