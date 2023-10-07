import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import TextField from "@mui/material/TextField";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userInfo = response.data;
        setUserInfo(userInfo);
        navigate("/");
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (
    <form className="login flex flex-col gap-4 items-center " onSubmit={login}>
      <h1 className="text-center font-semibold text-2xl py-5">Login</h1>
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
      <button>Login</button>
      <h3>
        Don't you have account?{" "}
        <Link to={"/register"} className="text-stone-600 underline">
          Register
        </Link>
      </h3>
    </form>
  );
};

export default LoginPage;
