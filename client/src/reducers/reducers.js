import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_API,
  GET_DOGS_BY_DB,
  GET_DOGS_BY_NAME,
  GET_DOG_BY_ID,
  GET_DOGS_BY_TEMPERAMENTS,
  POST_DOG_CREATE,
  ORDER_BY_WEIGHT,
  ORDER_BY_NAME
} from "../actions/actionTypes";

// when you use more component upgrade the state with the spread operator use array and inside the spread operator action.payload

const initialState = {
  dogs: [],
  dogCreated: [],
  dogDetail: [],
  dogTemperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return { ...state, dogs:[ ...action.payload] };
    case GET_TEMPERAMENTS:
      return { ...state, dogTemperaments: action.payload };
    case GET_DOGS_BY_DB:
      return { ...state, dogs: action.payload };
    case GET_DOGS_BY_API:
      return { ...state, dogs: action.payload };
    case GET_DOGS_BY_NAME:
      return { ...state, dogs: action.payload };
    case GET_DOG_BY_ID:
      return { ...state, dogDetail: action.payload };
    case GET_DOGS_BY_TEMPERAMENTS:
      return { ...state, dogs:[ ...action.payload] };
    case POST_DOG_CREATE:
      return { ...state, dogTemperaments: action.payload };
    case ORDER_BY_WEIGHT:
      return { ...state, dogs: [...action.payload] };
    case ORDER_BY_NAME:
      return { ...state, dogs:[ ...action.payload] };
    default:
      return { ...state };
  }
}
