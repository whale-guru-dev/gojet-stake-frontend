import { handleActions } from "redux-actions";

const initialState = { data: null };

export const prices = handleActions({
  UPDATE_PRICES_SUCCESS: (state, { payload }) =>  ({
    ...state,
    data: {
      ...state.data,
      ...payload
    }
  }),
}, initialState);

export default prices;
