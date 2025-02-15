import { CLEAR_USERNAME, SET_USERNAME, UserActionTypes } from "./userTypes";

export const setUsername = (username: string): UserActionTypes => ({
  type: SET_USERNAME,
  payload: username,
});

export const clearUsername = (): UserActionTypes => ({
  type: CLEAR_USERNAME,
});
