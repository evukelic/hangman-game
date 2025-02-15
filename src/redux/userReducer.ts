import { CLEAR_USERNAME, SET_USERNAME, UserActionTypes } from "./userTypes";

interface UserState {
  readonly username: string;
}

const initialState: UserState = {
  username: "",
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case CLEAR_USERNAME:
      return { ...state, username: "" };
    default:
      return state;
  }
};

export default userReducer;
