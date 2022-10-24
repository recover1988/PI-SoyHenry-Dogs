import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_CREATED,
  GET_DOGS_BY_API,
  GET_DOGS_BY_DB,
  GET_DOGS_BY_NAME,
  GET_DOG_DETAIL,
} from "./actionTypes";
import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3000/dogs");
      return dispatch({ type: GET_DOGS, payload: response.data });
    } catch (error) {
      return console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
        const response = await axios.get("http://localhost:3000/temperaments");
        return dispatch({ type: GET_TEMPERAMENTS , payload: response.data})
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}
