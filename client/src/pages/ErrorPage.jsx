import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center mt-52">
      <h1 className="md:text-8xl text-5xl font-extrabold ">404</h1>
      <h2 className="md:text-4xl text-2xl text-stone-700 font-bold">
        Something Went Wrong
      </h2>
    </div>
  );
};

export default ErrorPage;
