import { useState } from "react";
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

export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN });

    const data = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());

    if (data.token) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({ type: USER_LOGIN_FAILED, payload: "Invalid User!!" });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: USER_LOGIN_FAILED, payload: "Login Failed" });
  }
};

export const LogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const RegisterUser = (user) => async (dispatch) => {
  dispatch({ type: USER_REG });
  try {
    const data = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
      }),
    }).then((res) => res.json());
    console.log("response", data);
    dispatch({ type: USER_REG_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: USER_REG_FAILED, payload: e });
  }
};

export const UpdateUserProfileAction =
  (userData) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE });
    console.log("updating", JSON.stringify(userData));
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(`Bearer ${userInfo.token}`);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const data = await fetch("http://localhost:5000/api/users/profile", {
        method: "POST",
        ...config,
        body: JSON.stringify(userData),
      }).then((res) => res.json());
      if (data.token) dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      else dispatch({ type: USER_UPDATE_FAILED, payload: data });
    } catch (e) {
      dispatch({ type: USER_UPDATE_FAILED, payload: e });
    }
  };
