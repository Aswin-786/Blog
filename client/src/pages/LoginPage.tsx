import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import useLogin from "../hooks/useLogin";
import ErrorPage from "./ErrorPage";
const LoginPage: React.FC = () => {
  const {
    login,
    error,
    username,
    password,
    handleSetUsername,
    handlesetPassword,
  } = useLogin();

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : (
        <form
          className="login flex flex-col gap-4 items-center "
          onSubmit={login}
        >
          <h1 className="text-center font-semibold text-2xl py-5">Login</h1>
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
          <button>Login</button>
          <h3>
            Don't you have account?{" "}
            <Link to={"/register"} className="text-stone-600 underline">
              Register
            </Link>
          </h3>
        </form>
      )}
    </>
  );
};

export default LoginPage;
