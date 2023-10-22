import {GET_DOGS, GET_DOGS_BY_NAME} from './action-types'
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