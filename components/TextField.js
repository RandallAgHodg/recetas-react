import React from "react";

export const TextField = ({ TextFields }) => {
  return (
    <>
      {TextFields.map((textfield) => {
        return (
          <input
            key={textfield.key}
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
            value={textfield.value}
            onChange={(e) => textfield.setState(e.target.value)}
            type={textfield.type}
            placeholder={textfield.name}
            name={textfield.name}
            autoComplete="off"
          />
        );
      })}
    </>
  );
};
