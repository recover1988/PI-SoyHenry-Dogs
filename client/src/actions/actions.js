import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_DB,
  GET_DOGS_BY_API,
  GET_DOGS_BY_NAME,
  GET_DOG_BY_ID,
  GET_DOGS_BY_TEMPERAMENTS,
  POST_DOG_CREATE,
} from "./actionTypes";
import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/dogs/");
      const dataDogs = response.data;
      return dispatch({ type: GET_DOGS, payload: dataDogs });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/temperaments/");
      return dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getDogsByDB() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/dogs/");
      const dCreated = response.data.filter((d) => d.userCreate === true);
      return dispatch({ type: GET_DOGS_BY_DB, payload: dCreated });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getDogsByApi() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/dogs/");
      const dApi = response.data.filte((d) => d.userCreate === false);
      return dispatch({ type: GET_DOGS_BY_API, payload: dApi });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dogs?name=${name}/`);
      return dispatch({ type: GET_DOGS_BY_NAME, payload: response.data });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getDogById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get("/dogs/" + id);
      return dispatch({ type: GET_DOG_BY_ID, payload: response.data });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getDogsByTemperaments(temp) {
  return async function (dispatch) {
    try {
      const response = await axios.get("/dogs/");
      const dTemp = response.data.filter(
        (d) =>
          d.temperaments.toLowerCase() === temp.toLowerCase() ||
          d.temperaments.toLowerCase().includes(temp.toLowerCase())
      );
      return dispatch({ type: GET_DOGS_BY_TEMPERAMENTS, payload: dTemp });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function postDogCreate(dog) {
  return axios.post("/dogs", dog);
}
