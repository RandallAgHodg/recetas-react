import React from "react";
import { Post } from "./Post";

export const UserPosts = ({ posts, isUpdate, categories }) => {
  console.log();
  return (
    <>
      {posts.length === 0 ? (
        <h4 className="text-center font-Nunito mt-24 text-7xl">
          El usuario no ha publicado ninguna receta
        </h4>
      ) : (
        <div className="grid grid-cols-3 gap-5 bg-Linen p-6 pb-16 my-11 shadow-xl">
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                categories={categories}
                isUpdate={isUpdate}
                data={post}
                width={350}
                height={250}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
