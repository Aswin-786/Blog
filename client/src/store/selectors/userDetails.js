import { selector } from "recoil";
import { userState } from "../atoms/User";

export const userEmailState = selector({
  key: 'userEmailState',
  get: ({ get }) => {
    const state = get(userState);
    return state.userName;
  },
});

export const userIdState = selector({
  key: 'userIdState',
  get: ({ get }) => {
    const state = get(userState)
    return state.userId;
  }
})