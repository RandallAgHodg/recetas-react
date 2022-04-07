import axios from "axios";
import React from "react";
import { DetailPost } from "../../components/DetailPost";
import { Layout } from "../../components/Layout";
import { getAppCookies } from "../../utils/cookies";

const Post = ({
  dataPost,
  dataCategories,
  dataReviews,
  token,
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
            title={dataPost.title}
            categories={dataCategories}
            user={user}
            auth={token}
          >
            <main className="flex min-h-[90vh] justify-center items-center bg-Linen ">
              <DetailPost
                key={dataPost.id}
                user={user}
                data={dataPost}
                reviews={dataReviews}
              />
            </main>
          </Layout>
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
    const urlPost = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;
    const urlReviews = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/reviews`;
    const urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const [resultPost, resultReviews, resultCategories] = await Promise.all([
      axios.get(urlPost, config),
      axios.get(urlReviews, config),
      axios.get(urlCategories),
    ]);
    return {
      props: {
        dataPost: resultPost.data,
        dataCategories: resultCategories.data,
        dataReviews: resultReviews.data,
        token,
        user: JSON.parse(decodeURIComponent(user)),
      },
    };
  } catch (error) {
    console.log(id);
    return {
      props: {
        error,
      },
    };
  }
}

export default Post;
