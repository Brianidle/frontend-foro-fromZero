import { CHANGUE_TOKEN } from "../actions/actionTypes";

const changueTokenReducer = (status = "", action) => {
  switch (action.type) {
    case CHANGUE_TOKEN:
      return action.newToken;
    default:
      return status;
  }
};

export { changueTokenReducer };
