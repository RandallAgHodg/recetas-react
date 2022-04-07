import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CategoryTab } from "./CategoryTab";

export const Header = ({ auth, categories, user }) => {
  const Router = useRouter();
  const [appUser, setAppUser] = useState({});
  useEffect(() => {
    if (user) setAppUser(user);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Router.push("/");
  };

  return (
    <header className="">
      {auth ? (
        <>
          <div className="bg-LavenderBlush h-[10vh] font-Roboto font-medium text-prussianBlue border-b-[1px] border-slate-100">
            <nav className="container mx-auto flex justify-between items-center">
              <div className="mt-6">
                <Link href="/home">
                  <Image
                    width={100}
                    height={90}
                    src="/logocook.svg"
                    layout="fixed"
                    alt="logo"
                  />
                </Link>
              </div>

              <ul className="flex items-center cursor-pointer gap-8 text-4xl pb-1 ">
                <Link href={`/usuario/${appUser.username}`}>
                  <div className="flex items-center gap-8">
                    <div className="">
                      {appUser.profilePicUrl && (
                        <Image
                          width={50}
                          height={50}
                          layout="fixed"
                          src={appUser.profilePicUrl}
                          objectFit="cover"
                          alt="Profile picture"
                        />
                      )}
                    </div>
                    <li className="hover:underline">{appUser.username}</li>
                  </div>
                </Link>
                <Link href="/">
                  <li
                    onClick={() => handleLogout()}
                    className="px-14 text-Pink py-4 rounded-3xl bg-Claret2 border-0 transition ease-in-out duration-200 hover:bg-Claret cursor-pointer"
                  >
                    Salir
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className="bg-UltraRed">
            <nav className="container mx-auto">
              <ul className="flex">
                {Object.values(categories).map((category) => (
                  <CategoryTab key={category.id} category={category} />
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <>
          <div className="bg-LavenderBlush h-[10vh] font-Roboto font-medium text-prussianBlue border-b-[1px] border-slate-400">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/">
                <Image
                  width={100}
                  height={100}
                  src="/logocook.svg"
                  alt="logo"
                />
              </Link>

              <ul className="flex items-center cursor-pointer gap-x-8 text-4xl pb-1 ">
                <Link href="/Register">
                  <li className="px-3 text-Pink py-5 rounded-3xl bg-Claret2  transition ease-in-out duration-200 hover:bg-Claret cursor-pointer">
                    Registrarse
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
