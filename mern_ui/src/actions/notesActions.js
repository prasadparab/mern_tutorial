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
} from "../constants/appConstants";

export const ListNotesAction = () => async (dispatch, getState) => {
  try {
    //console.log("list notes called");
    dispatch({ type: NOTES_LIST_REQ });
    const {
      userLogin: { userInfo },
    } = getState();
    //console.log(getState());
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await fetch("/api/notes", config).then((data) => data.json());
    //console.log("list all notes", data);
    if (data.length) dispatch({ type: NOTES_LIST_REQ_SUCCESS, payload: data });
    else dispatch({ type: NOTES_LIST_REQ_FAILED, payload: data });
  } catch (e) {
    dispatch({ type: NOTES_LIST_REQ_FAILED, payload: e });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_CREATE_REQ });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = await fetch("/api/notes/create", {
        ...config,
        method: "POST",
        body: JSON.stringify({ title, category, content }),
      }).then((res) => res.json());
      console.log(data);
      dispatch({ type: NOTES_CREATE_REQ_SUCCESS, payload: data });
    } catch (e) {
      console.log(e);
      dispatch({ type: NOTES_CREATE_REQ_FAILED, error: e });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_UPDATE_REQ });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = await fetch(`/api/notes/${id}`, {
        ...config,
        method: "PUT",
        body: JSON.stringify({ title, category, content }),
      }).then((res) => res.json());
      console.log(data);
      dispatch({ type: NOTES_UPDATE_REQ_SUCCESS, payload: data });
    } catch (e) {
      console.log(e);
      dispatch({ type: NOTES_UPDATE_REQ_FAILED, error: e });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQ });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const data = await fetch(`/api/notes/${id}`, {
      ...config,
      method: "DELETE",
    }).then((res) => res.json());
    console.log(data);
    dispatch({ type: NOTES_DELETE_REQ_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: NOTES_DELETE_REQ_FAILED, error: e });
  }
};
