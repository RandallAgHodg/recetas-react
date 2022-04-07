import React from "react";

export const RadioRegister = ({ data }) => {
  return data.map((info) => {
    return (
      <div className="flex items-center" key={info.key}>
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
          id={info.id}
          name={info.name}
          value={info.value}
        />
        <label htmlFor={info.name}>{info.value}</label>
      </div>
    );
  });
};
