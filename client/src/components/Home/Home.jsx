import { Link } from "react-router-dom"

//redux actions
import { getDogs } from "../../../redux/actions"

// hooks
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Card from '../Card/Card'

function Home(){
    // getting the dogs global stage and dispatch method
    const dispatch = useDispatch()
    const dogs = useSelector(state=> state.allDogs)

    useEffect(()=>{
        dispatch(getDogs())
    },[])

    return(
        <div>
            <Link to='/'>
            <button>Out</button>
            </Link>

            {dogs.map(dog=>{
                return(
                    <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    weight={dog.weight}
                    temperament={dog.temperament}
                    
                    />
                )
            })}

        </div>
    )
}


export default Home