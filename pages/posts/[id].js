import React from "react";
import axios from "axios";
import { getAppCookies } from "../../utils/cookies";
import { Layout } from "../../components/Layout";
import { PostCategoryEntries } from "../../components/PostCategoryEntries";

const CategoryPosts = ({
  dataPost,
  dataCategories,
  token,
  user,
  pagesammount,
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
          {dataPost.length === 0 ? (
            <Layout auth={token} categories={dataCategories}>
              <div className="container mx-auto flex h-[45vh] items-center justify-center">
                <h1 className="font-B612 font-light">
                  No hay entradas para este post
                </h1>
              </div>
            </Layout>
          ) : (
            <Layout
              title={dataPost[0].category.name}
              categories={dataCategories}
              user={user}
              auth={token}
            >
              <main className="flex min-h-[90vh] justify-center items-center bg-Linen ">
                <PostCategoryEntries
                  key={dataPost[0].id}
                  pages={pagesammount}
                  data={dataPost}
                />
              </main>
            </Layout>
          )}
        </>
      )}
    </>
  );
};

export async function getServerSideProps({ query: { id }, req }) {
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
    const urlPost = `${process.env.NEXT_PUBLIC_API_URL}/posts/search?categoryId=${id}`;
    const urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const [resultPost, resultCategories] = await Promise.all([
      axios.get(urlPost, config),
      axios.get(urlCategories),
    ]);

    return {
      props: {
        dataPost: resultPost.data,
        dataCategories: resultCategories.data,
        token,
        pagesAmmount: resultPost.headers.pagesammount,
        user: JSON.parse(decodeURIComponent(user)),
      },
    };
  } catch (error) {
    // console.log(error.response);
    console.log(id);
    return {
      props: {
        error,
      },
    };
  }
}

export default CategoryPosts;
