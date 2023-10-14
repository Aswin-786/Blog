import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState, userIdState } from "../store/selectors/userDetails";
import { userState } from "../store/atoms/User";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const userName = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const userId = useRecoilValue(userIdState);

  async function logout() {
    try {
      const res: AxiosResponse = await axios.post(
        "http://localhost:4000/logout",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser({
          isLoading: false,
          userName: null,
          userId: null,
        });
        navigate("/login");
      }
    } catch (error) {}
  }

  return (
    <header className="md:flex md:flex-row md:items-center md:justify-between flex flex-col items-start ">
      <Link to="/" className="logo">
        <span
          onClick={() => setToggle(false)}
          className="md:w-5 md:h-5 w-3 h-3 text-white bg-black rounded-full md:px-5 md:py-2 px-3 py-0 hover:opacity-80"
        >
          B
        </span>
      </Link>
      <div
        className="absolute right-4 text-3xl font-bold md:hidden transition-all delay-500 ease-in"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </div>
      <nav
        onClick={() => setToggle(!toggle)}
        className={`md:flex md:flex-row flex flex-col md:py-0 py-6 md:static overflow-hidden absolute md:bg-inherit bg-stone-700 text-white md:text-black md:z-auto z-[1] md:mt-0 mt md:w-auto w-full left-0 text-center transition-all md:duration-0 duration-500 ease-in ${
          toggle ? "top-20 opacity-100 " : "top-[-300px]"
        } md:opacity-100 opacity-0`}
      >
        <Link
          className="font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black"
          to={"/"}
        >
          Home
        </Link>
        {userName && (
          <>
            <Link
              to="/create"
              className="font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black"
            >
              Create new Post
            </Link>
            <div className="cursor-pointer flex flex-col gap-3 md:flex-row">
              <Link
                to={`/user/${userId}`}
                className="font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black"
              >
                {userName}
              </Link>{" "}
              <div
                onClick={logout}
                className="font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black"
              >
                Logout
              </div>
            </div>
          </>
        )}
        {!userName && (
          <>
            <Link
              to="/login"
              className="font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
