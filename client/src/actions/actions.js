import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_DB,
  GET_DOGS_BY_API,
  GET_DOGS_BY_NAME,
  GET_DOG_BY_ID,
  GET_DOGS_BY_TEMPERAMENTS,
  ORDER_BY_WEIGHT,
  ORDER_BY_NAME,
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
      const dApi = response.data.filter((d) => d.userCreate === false);
      return dispatch({ type: GET_DOGS_BY_API, payload: dApi });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dogs?name=${name}`);
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
      const dTemp = response.data.filter((d) =>
        d.temperament.includes(temp.toLowerCase())
      );
      return dispatch({ type: GET_DOGS_BY_TEMPERAMENTS, payload: dTemp });
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function orderByWeight(option, dataBase) {
  return function (dispatch) {
    try {
      const dataBaseWithAverage = dataBase.map((d) => {
        if (!d.weight_min && !d.weight_max) d["weight_min"] = 200;
        if (d.weight_min && !d.weight_max) d["weight_max"] = d.weight_min;
        return d;
      });

      const dataOrdered = dataBaseWithAverage.sort((a, b) => {
        if (
          (parseInt(a.weight_min) + parseInt(a.weight_max)) / 2 >
          (parseInt(b.weight_min) + parseInt(b.weight_max)) / 2
        )
          return 1;
        if (
          (parseInt(b.weight_min) + parseInt(b.weight_max)) / 2 >
          (parseInt(a.weight_min) + parseInt(a.weight_max)) / 2
        )
          return -1;
        return 0;
      });
      if (option === "weightMin") {
        return dispatch({ type: ORDER_BY_WEIGHT, payload: dataOrdered });
      } else {
        return dispatch({
          type: ORDER_BY_WEIGHT,
          payload: dataOrdered.reverse(),
        });
      }
    } catch (error) {
      return new Error("Data not found", error);
    }
  };
}

export function orderByName(option, dataBase) {
  return function (dispatch) {
    try {
      const dataOrdered = dataBase.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      });
      if (option === "ascending") {
        return dispatch({ type: ORDER_BY_NAME, payload: dataOrdered });
      } else {
        return dispatch({
          type: ORDER_BY_NAME,
          payload: dataOrdered.reverse(),
        });
      }
    } catch (error) {}
  };
}

export function postDogCreate(dogCreate) {
  if (dogCreate.life_span_min === "" && dogCreate.life_span_max === "") {
    delete dogCreate.life_span_min;
    delete dogCreate.life_span_max;
  }
  if (dogCreate.image === "") delete dogCreate.image;

  return async function () {
    const data = await axios.post("/dogs/", dogCreate);
    return data;
  };
}
