import {
  NOTES_CREATE_REQ,
  NOTES_CREATE_REQ_FAILED,
  NOTES_CREATE_REQ_SUCCESS,
  NOTES_DELETE_REQ,
  NOTES_DELETE_REQ_FAILED,
  NOTES_DELETE_REQ_SUCCESS,
  NOTES_LIST_REQ,
  NOTES_LIST_REQ_FAILED,
  NOTES_LIST_REQ_SUCCESS,
  NOTES_UPDATE_REQ,
  NOTES_UPDATE_REQ_FAILED,
  NOTES_UPDATE_REQ_SUCCESS,
  NOTES_UPDATE_SET_NOTE,
} from "../constants/appConstants";

export const noteListReducer = (
  state = { loader: false, getNotes: [], error: {} },
  action
) => {
  switch (action.type) {
    case NOTES_LIST_REQ:
      return { ...state, loader: true };
    case NOTES_LIST_REQ_SUCCESS:
      return { ...state, loader: false, getNotes: action.payload };
    case NOTES_LIST_REQ_FAILED:
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};

export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQ:
      return { loader: true };
    case NOTES_CREATE_REQ_SUCCESS:
      return { loader: false, success: true };
    case NOTES_CREATE_REQ_FAILED:
      return { loader: false, error: action.payload };
    default:
      return state;
  }
};

export const noteUpdateReducer = (
  state = { loader: false, error: {}, note: {} },
  action
) => {
  switch (action.type) {
    case NOTES_UPDATE_REQ:
      return { loader: true };
    case NOTES_UPDATE_REQ_SUCCESS:
      return { ...state, loader: false, success: true };
    case NOTES_UPDATE_SET_NOTE:
      return { note: action.note };
    case NOTES_UPDATE_REQ_FAILED:
      return { loader: false, error: action.payload };
    default:
      return state;
  }
};
export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQ:
      return { loader: true };
    case NOTES_DELETE_REQ_SUCCESS:
      return { loader: false, success: true };
    case NOTES_DELETE_REQ_FAILED:
      return { loader: false, error: action.payload };
    default:
      return state;
  }
};
