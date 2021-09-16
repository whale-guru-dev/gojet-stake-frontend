import { handleActions } from "redux-actions";

const initialState = { data: [] };

export const pools = handleActions({

  INIT_POOLS_STATE: (state, { payload }) => ({
    ...initialState
  }),

  SET_POOLS_DATA_REQUEST: (state) => ({
    ...state,
    requesting: true,
    data: null,
    error: null,
  }),
  SET_POOLS_DATA_SUCCESS: (state, { payload }) => ({
    ...state,
    requesting: false,
    data: payload.data,
    error: null,
  }),
  SET_POOLS_DATA_FAIL: (state, { payload }) => ({
    ...state,
    requesting: false,
    data: null,
    error: payload.error,
  }),


  SET_POOLS_USER_DATA: (state, { payload }) => ({
    ...state,
    data: state.data.map((pool) => {
      const userPoolData = payload.find((entry) => entry.id === pool.id);
      if (userPoolData) {
        return {
          ...pool,
          userData: userPoolData
        }
      } else {
        return {
          ...pool,
          userData: {}
        }
      }
    })
  }),

  SET_POOLS_PUBLIC_DATA: (state, { payload }) => ({
    ...state,
    data: state.data.map((pool) => {
      const livePoolData = payload.find((entry) => entry.id === pool.id);
      if (livePoolData) {
        return {
          ...pool,
          ...livePoolData
        }
      }
      return {
        ...pool
      }
    })

  }),

  /** UPDATE POOLS USER DATA **/
  UPDATE_POOLS_USER_DATA: (state, { payload }) => {
    const { field, value, id } = payload;
    const newState = state.data.map((pool) => {
      if (pool.id === id) {
        return {
          ...pool,
          userData: {
            ...pool.userData,
            [field]: value
          }
        }

      } else {
        return { ...pool }
      }
    });
    return {
      data: newState
    };
  }
}, initialState);

export default pools;
