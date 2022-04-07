import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/dateFormatter";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { ReviewDialog } from "./ReviewDialog";
import Link from "next/link";

export const Review = ({ data, setIsReviewAble, postInfo }) => {
  const {
    id,
    comment,
    score,
    publishedDate,
    user: { username },
  } = data;

  const { id: postId, username: postUser, title } = postInfo;

  const router = useRouter();
  const [stars, setStars] = useState(Array(score).fill(""));
  const [isOpen, setIsOpen] = useState(false);
  const [appUser, setAppUser] = useState({});

  useEffect(() => {
    setAppUser(JSON.parse(Cookies.get("user")));
  }, []);
  const handleReviewRemove = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Auth cookie not found");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { id: postId } = router.query;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/reviews/${id}`,
        config
      );

      Swal.fire({
        icon: "info",
        title: "Review eliminado",
        text: "La review fue eliminada exitosamente",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) Router.reload();
      });
    } catch (error) {
      const { id: postId } = router.query;
      console.log(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/reviews/${id}`,
        error.response
      );
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: error.response.data,
      });
      return;
    }
  };

  const handleReviewUpdate = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={`flex ${
          username === appUser.username &&
          "order-first transition ease-in-out duration-500 hover:scale-[1.03] hover:cursor-pointer"
        } flex-col mb-10 rounded-md p-7 bg-white shadow-lg`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Link href={`/usuario/${username}`}>
              <h2 className="font-Nunito font-medium text-4xl hover:underline hover:cursor-pointer">
                {username}
              </h2>
            </Link>
            <h4>{formatDate(publishedDate)}</h4>
          </div>
          {username === appUser.username && (
            <div className="flex gap-2">
              <Image
                onClick={() => handleReviewUpdate()}
                className="cursor-pointer"
                width={30}
                height={30}
                src="/pencil.svg"
                layout="fixed"
              />
              <Image
                onClick={() => handleReviewRemove()}
                className="cursor-pointer"
                width={30}
                height={30}
                src="/trash.svg"
                layout="fixed"
              />
            </div>
          )}
        </div>

        <div className="mt-8">
          {stars.map((star, index) => {
            return (
              <Image
                key={index}
                width={20}
                height={20}
                src="/star-full.png"
                layout="fixed"
              />
            );
          })}
          <p className="font-Nunito font-bold">{comment}</p>
        </div>
      </div>
      {isOpen && (
        <ReviewDialog
          isOpen={isOpen}
          isUpdate={true}
          setIsOpen={setIsOpen}
          reviewInfo={{
            reviewId: id,
            scoreReview: score,
            commentReview: comment,
          }}
          postInfo={{ username: postUser, title, id: postId }}
        />
      )}
    </>
  );
};
