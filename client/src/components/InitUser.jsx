import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/User";
import axios from "axios";

const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/profile", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setUser({
            isLoading: false,
            userName: res.data.username,
            userId: res.data.id,
          });
        }
      } catch (error) {
        setUser({
          isLoading: false,
          userName: null,
          userId: null,
        });
      }
    };
    checkProfile();
  }, []);

  return <></>;
};

export default InitUser;
