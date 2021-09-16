import { handleActions } from 'redux-actions';
import { get } from 'lodash';

const initialState = {
  allProjects: {
    result: [],
    error: null,
    requesting: false,
  },
  project: {
    result: null,
    error: null,
    requesting: false,
  }
};

export const user = handleActions({
  /** FETCH ALL PROJECTS **/
  FETCH_ALL_PROJECTS_REQUEST: (state) => ({
    ...state,
    allProjects: {
      ...state.allProjects,
      requesting: true,
      error: null,
    },
  }),
  FETCH_ALL_PROJECTS_SUCCESS: (state, { payload }) => ({
    ...state,
    allProjects: {
      ...state.allProjects,
      requesting: false,
      result: payload.data,
      error: null,
    },
  }),
  FETCH_ALL_PROJECTS_FAIL: (state, { payload }) => ({
    ...state,
    allProjects: {
      ...state.allProjects,
      requesting: false,
      result: null,
      error: payload.error,
    },
  }),

  /** FETCH PROJECT **/
  FETCH_PROJECT_REQUEST: (state) => ({
    ...state,
    project: {
      ...state.project,
      requesting: true,
      error: null,
    },
  }),
  FETCH_PROJECT_SUCCESS: (state, { payload }) => ({
    ...state,
    project: {
      ...state.project,
      requesting: false,
      result: payload.data,
      error: null,
    },
  }),
  FETCH_PROJECT_FAIL: (state, { payload }) => ({
    ...state,
    project: {
      ...state.project,
      requesting: false,
      result: null,
      error: payload.error,
    },
  }),
  LISTEN_MEPAD_CONTRACT: (state, { payload }) => ({
    ...state,
    contractSelected: payload
  }),
  SET_PROJECT_INFO_FROM_CONTRACT: (state, { payload }) => ({
    ...state,
    project: get(state, 'project.result.smartContractAddress') === get(payload, 'smartContract') ? {
      ...state.project,
      result: {
        ...state.project.result,
        ...payload.data
      }
    } : state.project
  }),
}, initialState);

export default user;
