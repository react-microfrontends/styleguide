import React from "react";

export default function Button(props) {
  const {
    children,
    disabled = false,
    loading = false,
    ...remainingProps
  } = props;
  return (
    <button
      className={`mb-8 font-bold py-2 px-4 rounded ${
        disabled || loading ? `opacity-50 bg-secondary` : "bg-warning"
      }`}
      {...remainingProps}
    >
      {loading ? "Loading" : children}
    </button>
  );
}
