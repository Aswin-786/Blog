import { ChangeEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { userInputParams } from "@aswin___786/common";
import { BASE_URL } from "../shared/config";

const useRegister = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlesetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const userInput: userInputParams = { username, password };

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axios.post(
        `${BASE_URL}/user/register`,
        {
          userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      setError("error occurs");
    }
  };
  return {
    error,
    username,
    password,
    register,
    handleSetUsername,
    handlesetPassword,
  };
};

export default useRegister;
