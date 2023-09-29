import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DarkModeToggle from "./DarkModeToggle";
import axios from "axios";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", {
        withCredentials: true,
      })
      .then((response) => setUserInfo(response.data));
  }, []);

  function logout() {
    axios.post("http://localhost:4000/logout", {
      withCredentials: true,
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="">
      <Link to="/" alt="" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <DarkModeToggle />
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>{username} Logout</a>
          </>
        )}
        {!username && (
          <>
            <DarkModeToggle />
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
