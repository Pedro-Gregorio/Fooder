import React from "react";

export default function Input({ title, type, identifier, ...props }) {
  return (
    <p className="flex flex-col items-start justify-between space-y-1 my-1">
      <label htmlFor={identifier} className="font-bold text-lg">
        {title}
      </label>
      <input
        id={identifier}
        name={identifier}
        type={type}
        className="outline-none border border-tertiary w-full rounded-lg px-2 py-1"
        required
        {...props}
      />
    </p>
  );
}
