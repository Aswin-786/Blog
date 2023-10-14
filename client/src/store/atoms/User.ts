import { atom } from "recoil";

export interface UserState {
  isLoading: boolean;
  userName: string | null;
  userId: string | null;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    isLoading: true,
    userName: null,
    userId: null,
  },
});
