import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REG,
  USER_REG_FAILED,
  USER_REG_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
} from "../constants/appConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegistration = (state = {}, action) => {
  switch (action.type) {
    case USER_REG:
      return { loading: true };
    case USER_REG_SUCCESS:
      return { load: false, userInfo: action.payload };
    case USER_REG_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return { loading: true, success: false };
    case USER_UPDATE_SUCCESS:
      return { load: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAILED:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
