import Image from "next/image";
import React from "react";
import { formatDate, formatDateWithoutYear } from "../utils/dateFormatter";

const UserInfo = ({ user }) => {
  const {
    id,
    username,
    firstname,
    lastname,
    profilePicUrl: url,
    description,
    birthdate,
  } = user;
  return (
    <div className="flex  container mx-aut p-10 ">
      <div className="flex-1">
        <Image
          className=" border-4 border-solid border-blue-600 rounded-full"
          objectFit="cover"
          width={480}
          height={480}
          src={url}
          layout="fixed"
        />
      </div>
      <div className="flex flex-col px-9 gap-6 w-[40vw]">
        <h1 className="font-Roboto text-center text-Claret">{`Chef ${username}`}</h1>
        <div className="flex flex-col justify-between">
          <h2 className="font-Nunito text-4xl text-Claret2">{`${firstname} ${lastname}`}</h2>
          <h2>{formatDateWithoutYear(birthdate)}</h2>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default UserInfo;
