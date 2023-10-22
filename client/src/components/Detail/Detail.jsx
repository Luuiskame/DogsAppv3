import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//? styles
import styles from './Detail.module.css'

function Detail(){
    const {id} = useParams()
    const [dogs,setDogs] = useState({})

    useEffect(()=>{
        axios(`http://localhost:3001/dogsapp/dogs/${id}`)
        .then(({data})=>{
            console.log(data)
            if(data.name){
                setDogs(data)
            } else {
                window.alert("l")
            }
        })
        return setDogs({})
    }, [id])

    return(
        <>
        <Link to='/home'>
            <button>Home</button>
        </Link>

            <div className={styles.imgDetailContainer}>
                <img className={styles.detailImg} src={dogs.image} alt={dogs.name}/>
            </div>
            <h2>ID: {dogs.id}</h2>
            <h2>NAME :{dogs.name}</h2>
            <h2>WEIGHT: {dogs.weight}</h2>
            <h2>HEIGHT: {dogs.height}</h2>
            <h2>Temper: {dogs.temperament}</h2>
            <h2>Life expectency: {dogs.life_span}</h2>
        </>
    )
}

export default Detail