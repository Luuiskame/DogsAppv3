import {GET_DOGS} from './action-types'
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