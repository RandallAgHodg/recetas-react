import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "../utils/dateFormatter";
import { ReviewDialog } from "./ReviewDialog";
import { Review } from "./Review";
import Link from "next/link";

export const DetailPost = ({ data, user, reviews }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReviewAble, setIsReviewAble] = useState(true);
  const [appUser, setAppUser] = useState({});
  const {
    id,
    title,
    pictureUrl,
    publishedDate,
    description,
    preparation,
    ingredients,
    score,
    category: { id: postId, name },
    user: { username },
  } = data;

  useEffect(() => {
    const setUser = () => {
      if (user) setAppUser(user);
    };

    const enableReview = () => {
      const existsReview = reviews.find(
        (review) => review.user.username === user.username
      );
      return !existsReview;
    };
    setUser();
    setIsReviewAble(enableReview());
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-white my-12 items-center container mx-auto p-10 rounded-xl shadow-lg flex flex-col">
        <h2 className="text-5xl font-Nunito font-bold">{title}</h2>
        <Image
          layout="fixed"
          width={1020}
          priority
          height={600}
          src={pictureUrl}
          alt={`image ${title}`}
        />
        <div className="container mx-auto flex flex-col items-start gap-5">
          <div className="container mx-auto bg-slate-100 flex items-baseline justify-between mt-5">
            <div className="flex flex-col">
              <h4 className="font-Roboto font-normal text-4xl">
                {formatDate(publishedDate)}
              </h4>
              <Link href={`/posts/${postId}`}>
                <p className="font-Nunito font-normal hover:underline hover:cursor-pointer hover:font-bold">
                  {name}
                </p>
              </Link>
            </div>
            <div className="flex w-80 flex-col">
              <Link href={`/usuario/${username}`}>
                <p className=" hover:underline hover:cursor-pointer">
                  {username}
                </p>
              </Link>
              <h4>{`Score: ${score}`}</h4>
            </div>
          </div>
          <div className="flex justify-between relative container mx-auto">
            <div className="flex flex-col">
              <div>
                <h4 className="font-Roboto font-bold">Descripción:</h4>
                <p>{description}</p>
              </div>
              <div>
                <h4 className="font-Roboto font-bold">Preparación:</h4>
                <p>{preparation}</p>
              </div>
              <div>
                <h4 className="font-Roboto font-bold">Ingredientes:</h4>
                <p>{ingredients}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className={
            isReviewAble
              ? `self-end mt-6 rounded-lg border-[1px] border-gray-400 p-4 bg-sky-300 uppercase text-white font-Nunito font-semibold transition ease-in-out duration-300 hover:bg-sky-400`
              : `self-end mt-6rounded-lg border-[1px] border-gray-400 p-4 bg-gray-300 uppercase text-white font-Nunito font-semibold cursor-not-allowed pointer-events-none`
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          Realizar Review
        </button>
      </div>
      <ReviewDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postInfo={{ username, title, id }}
      />
      <h3 className="font-B612">Reviews</h3>
      <div className="flex flex-col gap-10">
        {reviews.map((review) => {
          return (
            <Review
              key={review.id}
              setIsReviewAble={setIsReviewAble}
              postInfo={{ username, title, id }}
              data={review}
            />
          );
        })}
      </div>
    </div>
  );
};
