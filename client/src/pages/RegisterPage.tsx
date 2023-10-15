import React from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import useRegister from "../hooks/useRegister";

const RegisterPage: React.FC = () => {
  const {
    error,
    register,
    username,
    password,
    handleSetUsername,
    handlesetPassword,
  } = useRegister();
  return (
    <>
      {error ? (
        <ErrorPage />
      ) : (
        <form
          className="register  flex flex-col gap-4 items-center "
          onSubmit={register}
        >
          <h1 className="text-center font-semibold text-2xl py-5">Register</h1>
          <TextField
            required
            id="outlined-basic"
            label="UserName"
            color="primary"
            variant="outlined"
            className="w-full focus-visible:outline-black"
            value={username}
            onChange={handleSetUsername}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            className="w-full"
            value={password}
            onChange={handlesetPassword}
          />
          <button>Register</button>
          <h3>
            Allready registered?{" "}
            <Link to={"/login"} className="text-stone-600 underline text-lg">
              Login
            </Link>
          </h3>
        </form>
      )}
    </>
  );
};

export default RegisterPage;
