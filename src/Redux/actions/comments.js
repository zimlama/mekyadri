import axios from "axios";
import { CREATE_COMMENTS, GET_COMMENTS } from "../actions-types";
const { REACT_APP_CREATE_COMMENTS, REACT_APP_GET_COMMENTS } = process.env;

export function createComments(payload) {
  console.log("aca comment", payload);
  return async function (dispatch) {
    try {
      const newComment = await axios.post(REACT_APP_CREATE_COMMENTS, payload);

      return dispatch({
        type: CREATE_COMMENTS,
        payload: newComment.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function getComments() {
  return async function (dispatch) {
    try {
      const comments = await axios.get(REACT_APP_GET_COMMENTS);
      return dispatch({
        type: GET_COMMENTS,
        payload: comments,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
