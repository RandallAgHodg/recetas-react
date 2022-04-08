import React, { useState } from "react";
import Swal from "sweetalert2";
import { TextField } from "./TextField";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export const FormLogin = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const sendData = async (userInfo) => {
    console.log(`${process.env.API_URl}`);
    return await axios.post(
      `${process.env.PUBLIC_NEXT_API_URL}/api/v1/accounts/login`,
      userInfo
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([username, email, password].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    try {
      const user = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      const result = await sendData(user);
      router.push("/home");
      Cookies.set("user", decodeURIComponent(JSON.stringify(result.data.user)));
      Cookies.set("token", result.data.token);
      return;
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      Swal.fire({
        icon: "error",
        text: "Las credenciales son incorrectas",
      });
      return;
    }
  };
  return (
    <div className="flex rounded-3xl shadow-2xl flex-col h-[55vh] w-[35vw] bg-white max-w-7xl justify-around">
      <form
        className="flex flex-col gap-14 self-center"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center font-medium text-5xl">Bienvenido</h3>
        <TextField
          TextFields={[
            {
              key: "Tl1",
              name: "Usuario",
              type: "text",
              value: username,
              setState: setUsername,
            },
            {
              key: "TL2",
              name: "Email",
              type: "email",
              value: email,
              setState: setEmail,
            },
            {
              key: "Tl3",
              name: "Contraseña",
              type: "password",
              value: password,
              setState: setPassword,
            },
          ]}
        />

        <input
          className="block rounded-2xl p-4 text-white uppercase bg-Claret transition ease-in-out duration-200 hover:bg-FieryRose cursor-pointer"
          type="submit"
          value="Ingresar"
        />
      </form>
    </div>
  );
};
