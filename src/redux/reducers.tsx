import { SET_TOKEN } from "./actions";

const initialState = {
  token: "",
}

function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

export default rootReducer;