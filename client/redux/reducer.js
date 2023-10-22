import { GET_DOGS, GET_DOGS_BY_NAME } from "./action-types";

const initalState = {
    dogs: [],
    allDogs: [],
}

const reducer = (state = initalState, action)=>{
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
            case GET_DOGS_BY_NAME:
                return {
                    ...state,
                    dogs: [action.payload, ...state.dogs]
                }

        default:
            return state
    }
}

export default reducer