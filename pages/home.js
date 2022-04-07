import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { PostEntries } from "../components/PostEntries";
import { getAppCookies } from "../utils/cookies";

const home = ({ dataPosts, dataCategories, token, user, errorMessage }) => {
  return (
    <>
      {errorMessage ? (
        <div className="w-full h-[100vh] flex flex-col justify-center text-center">
          <p className="font-light font-Roboto text-8xl">{errorMessage}</p>
          <Link href="/">
            <p className="text-5xl mt-24 hover:text-blue-700 hover:cursor-pointer underline">
              Haz click en este enlace para volver al login
            </p>
          </Link>
        </div>
      ) : (
        <Layout
          title="home"
          user={user}
          auth={token}
          categories={dataCategories}
        >
          <main className="flex justify-center items-center bg-Linen ">
            <PostEntries data={dataPosts} />
          </main>
        </Layout>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { token, user } = getAppCookies(context.req);
    if (!token) {
      return {
        props: {
          errorMessage:
            "El usuario no está autorizado para acceder a este sitio",
        },
      };
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const urlPosts = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
    const urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const [resultPosts, resultCategories] = await Promise.all([
      axios.get(urlPosts, config),
      axios.get(urlCategories),
    ]);
    return {
      props: {
        dataPosts: resultPosts.data,
        dataCategories: resultCategories.data,
        token,
        user: JSON.parse(decodeURIComponent(user)),
      },
    };
  } catch (error) {
    const { token, user } = getAppCookies(context.req);
    console.log(error.message);
    return {
      props: {
        error: error,
      },
    };
  }
}

export default home;
