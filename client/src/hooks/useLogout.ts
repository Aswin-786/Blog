import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/User";
import axios, { AxiosResponse } from "axios";

const useLogout = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
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
  return logout;
};

export default useLogout;
