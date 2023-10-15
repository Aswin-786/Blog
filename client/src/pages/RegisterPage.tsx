import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function register(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4000/register",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Registration successful");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      return <ErrorPage />;
    }
  }
  return (
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        className="w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
      <h3>
        Allready registered?{" "}
        <Link to={"/login"} className="text-stone-600 underline text-lg">
          Login
        </Link>
      </h3>
    </form>
  );
};

export default RegisterPage;
