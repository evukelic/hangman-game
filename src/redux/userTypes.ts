export const SET_USERNAME = "SET_USERNAME";
export const CLEAR_USERNAME = "CLEAR_USERNAME";

interface SetUsernameAction {
  type: typeof SET_USERNAME;
  payload: string;
}

interface ClearUsernameAction {
  type: typeof CLEAR_USERNAME;
}

export type UserActionTypes = SetUsernameAction | ClearUsernameAction;
