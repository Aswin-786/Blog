import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/User";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../shared/config";

const useLogout = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  async function logout() {
    try {
      const res: AxiosResponse = await axios.post(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
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
