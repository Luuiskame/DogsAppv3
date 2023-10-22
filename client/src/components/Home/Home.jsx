import { Link } from "react-router-dom"

//redux actions
import { getDogs } from "../../../redux/actions"

// hooks
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// components
import Card from '../Card/Card'
import Searchbar from "../Searchbar/Searchbar"

function Home(){
    // getting the dogs global stage and dispatch method
    const dispatch = useDispatch()
    const dogs = useSelector(state=> state.dogs)

    useEffect(()=>{
        dispatch(getDogs())
    },[])
    console.log(dogs)

    return(
        <div>
           <Searchbar/>
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