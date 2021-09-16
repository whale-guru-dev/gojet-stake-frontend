import { handleActions } from "redux-actions";

const initialState = {
  currentBlock: 0
};

export const block = handleActions({
  SET_BLOCK: (state, { payload }) => {
    return {
      ...state,
      currentBlock: payload
    }
  }
}, initialState);
export default block;
