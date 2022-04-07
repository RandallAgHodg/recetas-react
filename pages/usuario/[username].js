import axios from "axios";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostsAdmin } from "../../components/PostsAdmin";
import UserInfo from "../../components/UserInfo";
import { UserPosts } from "../../components/UserPosts";
import { getAppCookies } from "../../utils/cookies";

const User = ({
  dataPost,
  dataUser,
  dataCategories,
  token,
  pagesAmmount,
  user,
  errorMessage,
}) => {
  return (
    <>
      {errorMessage ? (
        <div className="w-full text-center">
          <p>{JSON.stringify(errorMessage)}</p>
        </div>
      ) : (
        <>
          <Layout
            title={dataUser.username}
            categories={dataCategories}
            user={user}
            auth={token}
          >
            <main className="flex flex-col min-h-[90vh]  bg-gray-100">
              <div className="container mx-auto">
                <UserInfo user={dataUser} appUser={user} />
                {dataUser.username === user.username && (
                  <PostsAdmin categories={dataCategories} />
                )}
                <h3 className="text-center font-Roboto mt-40 font-light text-4xl">{`Recetas publicadas por ${
                  dataUser.gender === "Masculino" ? "el" : "la"
                } Chef ${dataUser.username} `}</h3>
                <UserPosts
                  isUpdate={dataUser.username === user.username}
                  posts={dataPost}
                  categories={dataCategories}
                />
              </div>
            </main>
          </Layout>
        </>
      )}
    </>
  );
};

export async function getServerSideProps({ query: { username }, req }) {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { token, user } = getAppCookies(req);
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
    const urlPost = `${
      process.env.NEXT_PUBLIC_API_URL
    }/posts/search?username=${username.trim()}`;
    const urlUser = `${process.env.NEXT_PUBLIC_API_URL}/accounts/user/${username}`;
    const urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const [resultPost, resultUser, resultCategories] = await Promise.all([
      axios.get(urlPost, config),
      axios.get(urlUser, config),
      axios.get(urlCategories),
    ]);
    return {
      props: {
        dataPost: resultPost.data,
        dataUser: resultUser.data,
        dataCategories: resultCategories.data,
        token,
        pagesAmmount: resultPost.headers.pagesammount,
        user: JSON.parse(decodeURIComponent(user)),
      },
    };
  } catch (error) {
    console.log(error.response);
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
}

export default User;
