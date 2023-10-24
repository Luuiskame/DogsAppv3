import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'

//? styles
// import styles from './CreateDogForm/CreateDogForm.module.css'

// calling actions
import { getAllTempers } from "../../../redux/actions";

function CreateDogForm(){
    const temperaments = useSelector(state=> state.allTempers)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllTempers())
    },[])
    return (
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />

        <label htmlFor="height">Height:</label>
        <input type="range" min="5" max="200" name="height" />

        <label htmlFor="weight">Weight:</label>
        <input type="range" min="5" max="200" name="weight" />

        <label htmlFor="life_span">Life span:</label>
        <input type="range" min="0" max="200" name="life_span" />

        <div >
        <label htmlFor="temperaments">Temperaments:</label>
        {temperaments.map((temper) => (
          <label key={temper}>
            <input
              type="checkbox"
              name="types"
              value={temper}
            />
            {temper}
          </label>
        ))}
      </div>

        <button>Create</button>
      </form>
    );
}

export default CreateDogForm
