import { GET_DOGS } from "./action-types";

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

        default:
            return state
    }
}

export default reducer