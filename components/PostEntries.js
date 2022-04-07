import React, { useEffect, useState } from "react";
import { Post } from "./Post";

export const PostEntries = ({ data }) => {
  const [categoriesSize, setCategoriesSize] = useState(
    Object.values(data).filter((category) => category.length > 0).length
  );
  return (
    <div className="container mx-auto pb-5 min-h-[95vh] flex-col">
      {Object.values(data)
        .filter((data) => data.length > 0)
        .map((data, index) => {
          return (
            <div key={data} className="">
              {categoriesSize === index + 1 ? (
                <h1>Recetas mas votadas</h1>
              ) : (
                <h1>{data[0].category.name}</h1>
              )}
              <div className="h-[1px] w-[25vw] bg-slate-500" />
              <div className="grid grid-cols-4 gap-10">
                {data.map((data, index) => {
                  return (
                    <Post key={index} width={350} height={250} data={data} />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};
