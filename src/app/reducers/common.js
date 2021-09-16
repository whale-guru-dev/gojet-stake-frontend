import { handleActions } from 'redux-actions';

import { getView } from '../util';

const initialState = {
  collapsed: !window.innerWidth > 1220,
  view: getView(window.innerWidth),
  height: window.innerHeight,
  openDrawer: false,
  releasedDate: '',
  showSubscribe: false,
  isOverBanner: false,
  isTransparentNavCustom: true,
  wrongNetwork: false
};

export const common = handleActions({
  CHECK_SERVICE_WORKER: (state, { payload }) => ({
    ...state,
    releasedDate: payload,
  }),
  TOGGLE_COLLAPSED: (state) => ({
    ...state,
    collapsed: !state.collapsed,
  }),
  TOGGLE_OPEN_DRAWER: (state) => ({
    ...state,
    openDrawer: !state.openDrawer,
  }),
  HANDLE_TOGGLE_ALL: (state, { payload }) => {
    if (state.view !== payload.view || payload.height !== state.height) {
      const height = payload.height ? payload.height : state.height;
      return {
        ...state,
        collapsed: payload.collapsed,
        view: payload.view,
        height,
      };
    }
    return state;
  },
  SET_SHOW_SUBSCRIBE_CONTAINER: (state, { payload }) => ({
    ...state,
    showSubscribe: payload,
  }),
  GET_OVER_SCALE_BANNER: (state, { payload }) => ({
    ...state,
    isOverBanner: payload,
  }),
  GET_TRANSPARENT_NAV: (state, { payload }) => ({
    ...state,
    isTransparentNavCustom: payload,
  }),
  CHECK_WRONG_NETWORK: (state, { payload }) => ({
    ...state,
    wrongNetwork: payload
  }),
}, initialState);

export default common;
