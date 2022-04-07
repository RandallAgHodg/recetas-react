import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { TextField } from "./TextField";
import axios from "axios";
import { useRouter } from "next/router";
import { userToFormData } from "../utils/formData";
import Cookies from "js-cookie";

const sendData = async (formData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return await axios.post(
    `${process.env.NEXT_API_URL}/accounts/register`,
    formData,
    config.headers
  );
};

export const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const router = useRouter();
  const passwordExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        username,
        password,
        firstname,
        lastname,
        email,
        profilePicture,
        description,
        birthdate,
        gender,
      ].includes("")
    ) {
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    if (password.length <= 6) {
      Swal.fire({
        icon: "error",
        title: "Error de validacion",
        text: "La contraseña debe de tener mas de 6 caracteres",
      });
      return;
    }

    // if (passwordExpression.test(password)) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error de validacion",
    //     text: "La contraseña debe tener al menos un numero y un caracter especial",
    //   });
    //   return;
    // }
    const userInfo = {
      username,
      password,
      email,
      description,
      profilepicture: profilePicture,
      firstname,
      lastname,
      gender,
      birthdate,
    };
    try {
      const bodyForm = userToFormData(userInfo);
      const result = await sendData(bodyForm);
      Swal.fire({
        icon: "success",
        title: "El usuario fue creado exitosamente",
        text: "Puede continuar en el sitio",
      });

      Cookies.set("token", result.data.token);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDescription("");
      setFirstName("");
      setLastName("");
      setGender("");
      setBirthdate("");
      router.push("/");
      return;
    } catch (error) {
      console.log(`${process.env.NEX_PUBLIC_API_URL}/accounts/register`);
      console.log(JSON.stringify(error));
      Swal.fire({
        icon: "error",
        title: "Error del servidor",
        text: "Hubo un error del lado del servidor",
      });
      return;
    }
  };

  return (
    <div className="flex flex-col relative border-t-Claret border-t-8  rounded-xl p-8 w-[30vw] shadow-2xl bg-white justify-around">
      <form className="pb-20 " onSubmit={handleSubmit}>
        <TextField
          TextFields={[
            {
              key: "TR1",
              name: "Usuario",
              type: "text",
              value: username,
              setState: setUsername,
            },
            {
              key: "TR2",
              name: "Email",
              type: "email",
              value: email,
              setState: setEmail,
            },
            {
              key: "TR3",
              name: "Contraseña",
              type: "password",
              value: password,
              setState: setPassword,
            },
            {
              key: "TR4",
              name: "Confirmar contraseña",
              type: "password",
              value: confirmPassword,
              setState: setConfirmPassword,
            },
          ]}
        />
        <textarea
          placeholder="Descripcion (Habla un poco de ti)"
          className={`
            my-6
            block
            py-4
            w-[28vw]
            text-3xl
            text-left
            rounded-md
            bg-gray-200
            border-transparent
            focus:border-gray-500`}
          rows="8"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="
            block
            w-full
            text-3xl
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mb-4
          focus:text-gray-700 focus:bg-white 
          focus:border-blue-600 focus:outline-none"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          type="file"
          name="Profile picture"
        />
        <div className="flex gap-8 -mt-4 justify-center">
          <input
            key="TR5"
            className={`
            my-6
            block
            py-4
            w-[28vw]
            text-3xl
            text-left
            rounded-md
            bg-gray-200
            border-transparent
            focus:border-gray-500`}
            type="text"
            placeholder="Nombre"
            name="PrimerNombre"
            autoComplete="off"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            key="TR6"
            className={`
              my-6
              block
              py-4
              w-[28vw]
              text-3xl
              text-left
              rounded-md
              bg-gray-200
              border-transparent
              focus:border-gray-500`}
            type="text"
            placeholder="Apellido"
            name="Apellido"
            autoComplete="off"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex gap-6 ">
          <div className="flex flex-col justify-center">
            <h3>Genero</h3>
            <div className="flex h-[5vh] items-end gap-6">
              <div className="flex items-center">
                <input
                  className="
                  mr-4
                  h-8
                  w-8
                  cursor-pointer
                  border-gray-300
                  text-prussianBlue
                  shadow-sm
                  hover:scale-110
                  focus:border-indigo-300
                  focus:ring
                  focus: 
                  focus:ring-inset
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50"
                  type="radio"
                  id="RM1"
                  name="Gender"
                  value="Masculino"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="Masculino">Masculino</label>
                <input
                  className="
                  mx-4
                  h-8
                  w-8
                  cursor-pointer
                  border-gray-300
                  text-prussianBlue
                  shadow-sm
                  hover:scale-110
                  focus:border-indigo-300
                  focus:ring
                  focus: 
                  focus:ring-inset
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50"
                  type="radio"
                  id="RM1"
                  name="Gender"
                  value="Femenino"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="Femenino">Femenino</label>
              </div>
            </div>
          </div>
          <div className="ml-9">
            <label className="ml-9">Fecha de nacimiento</label>
            <input
              type="date"
              className="
                    mt-1
                    ml-9
                    text-3xl
                    block
                    w-[13vw]
                    h-[5vh]
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="absolute w-full bottom-0 left-0 rounded-b-xl mt-4 p-4  text-white uppercase font-bold bg-Claret transition ease-in-out duration-200 hover:bg-FieryRose cursor-pointer"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
