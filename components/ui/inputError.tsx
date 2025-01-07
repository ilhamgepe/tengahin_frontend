import React from "react";

const InputError = ({ message }: { message?: string | string[] }) => {
  if (!message) return null;
  return <p className="text-sm text-red-500">{message}</p>;
};

export default InputError;
