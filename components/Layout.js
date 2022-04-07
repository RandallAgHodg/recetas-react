import Head from "next/head";
import React from "react";
import { Header } from "./Header";

export const Layout = ({ children, title, auth, categories, user }) => {
  return (
    <div>
      <Head>
        <title>Comidin - {title}</title>
        <link rel="shortcut icon" href="/food.svg" type="image/x-icon" />
        <meta name="description" content="Restaurant web site" />
      </Head>
      <Header auth={auth} user={user} categories={categories} />
      {children}
    </div>
  );
};
