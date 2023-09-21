import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUserInfo(data));
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
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
