import { ChangeEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

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

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("hi");

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
