import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { baseURL } from "./baseURL";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(
      err => console.log("errr", err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  // let data = [];
  // data.push(item);
  // console.log('item data', data)
  // localStorage.setItem('data', data)
  // axios
  //   .post("/api/items", item, tokenConfig(getState))
  //   .then(res =>
  //     dispatch({
  //       type: ADD_ITEM,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err =>
  //     dispatch(returnErrors(err.response.data, err.response.status))
  //   );
    let header = tokenConfig(getState);
    fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(res => console.log("Success: responce", JSON.stringify(res)))
      .catch(error => console.log("Error:", error));
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
