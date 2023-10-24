import {
  FILTER_BY_TEMPER,
  GET_ALL_TEMPERS,
  GET_DOGS,
  GET_DOGS_BY_NAME,
  ORDER,
  FILTER_ALPHABETICALLY,
} from "./action-types";

const initalState = {
  dogs: [],
  allDogs: [],
  allTempers: [],
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: [action.payload, ...state.dogs],
      };

    case GET_ALL_TEMPERS:
      return {
        ...state,
        allTempers: action.payload,
      };

    //order
    case ORDER:
      let orderDogs;
      if (action.payload === "upwards") {
        orderDogs = state.dogs.sort((a, b) => (a.id > b.id ? 1 : -1));
      }

      if (action.payload === "weight") {
        orderDogs = state.dogs.sort((a, b) => (a.weight > b.weight ? 1 : -1));
      }

      if (action.payload === "downwards") {
        orderDogs = state.dogs.sort((a, b) => (b.id > a.id ? 1 : -1));
      }
      return {
        ...state,
        dogs: [...orderDogs],
      };

    //filter
    case FILTER_BY_TEMPER:
      const filteredByTemper = state.allDogs.filter(
        (dog) => dog.temperament === action.payload
      );
      return {
        ...state,
        dogs: filteredByTemper,
      };

    case FILTER_ALPHABETICALLY:
      let filteredDogs;
      if (action.payload === "abc") {
        filteredDogs = state.dogs
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "xyz") {
        filteredDogs = state.dogs
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        dogs: filteredDogs,
      };

    default:
      return state;
  }
};

export default reducer;
