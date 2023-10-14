"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdState = exports.userEmailState = void 0;
const recoil_1 = require("recoil");
const User_1 = require("../atoms/User");
exports.userEmailState = (0, recoil_1.selector)({
    key: 'userEmailState',
    get: ({ get }) => {
        const state = get(User_1.userState);
        return state.userName;
    },
});
exports.userIdState = (0, recoil_1.selector)({
    key: 'userIdState',
    get: ({ get }) => {
        const state = get(User_1.userState);
        return state.userId;
    }
});
