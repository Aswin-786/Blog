import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/User";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../shared/config";

const InitUser: React.FC = () => {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res: AxiosResponse = await axios.get(`${BASE_URL}/user/profile`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (res.status === 200) {
          setUser({
            isLoading: false,
            userName: res.data.info.username,
            userId: res.data.info.id,
          });
          localStorage.setItem("token", res.data.token);
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
