import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { userState } from "../store/atoms/User";
import { useSetRecoilState } from "recoil";
import ErrorPage from "./ErrorPage";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);

  async function login(e: React.FormEvent) {
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
        setUser({
          isLoading: false,
          userName: response.data.username,
          userId: response.data.id,
        });
        navigate("/");
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      return <ErrorPage />;
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