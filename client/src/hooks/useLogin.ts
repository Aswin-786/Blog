import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/User";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { userInputParams } from "@aswin___786/common";

const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);

  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlesetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const userInput: userInputParams = { username, password };

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        {
          userInput,
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
      setError("error occurs");
    }
  };
  return {
    login,
    handleSetUsername,
    username,
    password,
    handlesetPassword,
    error,
  };
};

export default useLogin;
