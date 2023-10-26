import {GET_DOGS, GET_DOGS_BY_NAME, GET_ALL_TEMPERS,ORDER, FILTER_BY_TEMPER, FILTER_ALPHABETICALLY, POST_DOGS} from './action-types'
import axios from 'axios'

export const getDogs = ()=> async(dispatch)=>{
    try {
        const response = await axios('http://localhost:3001/dogsapp/dogs')
        const dogsData = response.data
        console.log(dogsData)

        dispatch({
            type: GET_DOGS,
            payload: dogsData
        })
    } catch (error) {
        window.alert(error)
    }
}

export const getDogsByName = (name)=> async(dispatch)=>{
    try {
        const response = await axios(`http://localhost:3001/dogsapp/dogs/name?name=${name}`)
        const data = response.data
        console.log(data)

        dispatch({
            type: GET_DOGS_BY_NAME,
            payload: data
        })
    } catch (error) {
        window.alert(error)
    }
}

export const getAllTempers = ()=> async(dispatch)=>{
    try {
        const response = await axios("http://localhost:3001/dogsapp/temperament")
        const temperaments = response.data
        console.log(temperaments)

        dispatch({
            type: GET_ALL_TEMPERS,
            payload: temperaments
        })

    } catch (error) {
        Window.alert(error)
    }
}

export const postDogs = (dog)=> async(dispatch)=>{
    try {
        const endpoint = "http://localhost:3001/dogsapp/dogs"
        const response = await axios.post(endpoint, dog)
        const data = response.data
        console.log(dog)

        dispatch({
            type: postDogs,
            payload: data
        })
    } catch (error) {
        window.alert(error)
    }
}

//? ORDER
 
export const orderCards = (order)=>{
    return {
        type: ORDER, 
        payload: order
    }
}

//? FILTER

export const filterByTemper = (temper)=>{
    return {
        type: FILTER_BY_TEMPER,
        payload: temper
    }
}

export const filterAlphabetically = (filterValue) => ({
    type: FILTER_ALPHABETICALLY,
    payload: filterValue,
  });