import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
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
      console.error("Error during registration:", error);
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
