import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selectors/userDetails";

interface PostInfo {
  _id: string;
  cover: string;
  title: string;
}

interface UserInfo {
  userDoc: {
    _id: string;
    username: string;
  };
  postDoc: PostInfo[];
}

const UserDetails = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const userIds = useRecoilValue(userIdState);
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/${userId}`);
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  async function deltePost(id: string) {
    const res = await axios.delete(`http://localhost:4000/post/${id}`, {});
    if (res.status === 200) {
      navigate("/");
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-4 bg-gray-200 py-4 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-16 h-16 md:w-24 md:h-24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h1
          key={user?.userDoc?._id}
          className="text-3xl bg-stone-500 text-gray-200 px-3 py-1 rounded-xl"
        >
          {user?.userDoc?.username}
        </h1>
      </div>
      <div>
        <h2 className=" text-center text-2xl font-bold py-2 mb-3">User Post</h2>
        {user?.postDoc.map((item) => {
          return (
            <div
              key={item._id}
              className="flex items-center justify-between bg-gray-100 my-4 rounded-md cursor-pointer hover:bg-gray-200"
            >
              <div>
                <Link to={`/post/${item._id}`}>
                  <div className="flex items-center  gap-4">
                    <img
                      src={"http://localhost:4000/" + item.cover}
                      className="w-[100px] h-[100px] rounded-l-md"
                      alt=""
                    />
                    <p className="md:text-lg text-sm font-semibold uppercase">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </div>
              {user?.userDoc?._id === userIds && (
                <div
                  className="mr-3 hover:opacity-80"
                  onClick={() => deltePost(item._id)}
                >
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDetails;
