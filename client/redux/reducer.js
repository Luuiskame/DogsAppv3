import {
  FILTER_BY_TEMPER,
  GET_ALL_TEMPERS,
  GET_DOGS,
  GET_DOGS_BY_NAME,
  ORDER,
  FILTER_ALPHABETICALLY,
  GET_DOGS_FROM_DB,
  RESET_FILTERS,
  NEXT_PAGE,
  PREV_PAGE,
} from "./action-types";
import { prevPage } from "./actions";

const initalState = {
  dogs: [],
  allDogs: [],
  dogsOrigin: "All",
  allTempers: [],
  currentPage: 1,
  dogsPerPage: 8
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
        dogs: action.payload,
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

      if (action.payload === "maxWeight") {
        orderDogs = [...state.dogs].sort((a,b)=>{
          const weightA = parseInt(a.weight.split(" - ")[1])
          const weightB = parseInt(b.weight.split(" - ")[1])
          return weightB - weightA
        })
      }

      if(action.payload === "minWeight"){
        orderDogs = [...state.dogs].sort((a,b)=>{
          const weightA = parseInt(a.weight.split(" - ")[1])
          const weightB = parseInt(b.weight.split(" - ")[1])
          return weightA - weightB
        })
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
      const index = action.payload
      const temperToFilter = state.allTempers[index]
      const filteredDogsByTemper = state.dogs.filter((dog) => dog.temperament && dog.temperament.includes(temperToFilter))              
      if(action.payload==="All"){
      return{...state, dogs: state.allDogs }
    }
    return {
      ...state, 
      dogs: filteredDogsByTemper}

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

    case GET_DOGS_FROM_DB:
      const newDogsOrigin = action.payload; // API / DB
      const filteredDogsOrigin = state.allDogs.filter((dog) => {
        return newDogsOrigin === "api" ? !dog.createdAtDatabase : dog.createdAtDatabase;
      });
      return { 
        ...state, 
        dogs: filteredDogsOrigin, 
        dogsOrigin: newDogsOrigin 
      };

      case RESET_FILTERS:
        return{
          ...state,
          dogs: state.allDogs
        }

      case NEXT_PAGE:
        return {
          ...state,
          currentPage: state.currentPage +1
        }

      case PREV_PAGE:
        return {
          ...state,
          currentPage: state.currentPage -1
        }

    default:
      return state;
  }
};

export default reducer;
