import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const defaultImage = '/Img/dogDefault_img.png';
export const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : 'https://dogs-appv3.vercel.app';


//? styles
import styles from './Detail.module.css'

function Detail(){
    const {id} = useParams()
    const [dogs,setDogs] = useState({})

    useEffect(()=>{
        axios(`${API_URL}/dogsapp/dogs/${id}`)
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
        <div className={styles.detailContainer}>
            <div className={styles.imgDetailContainer}>
                <img className={styles.detailImg} src={dogs.image || defaultImage} alt={dogs.name}/>
            </div>

            <div className={styles.textContainer}>
            <h2><span>ID:</span> {dogs.id}</h2>
            <h2><span>NAME:</span> {dogs.name}</h2>
            <h2><span>WEIGHT:</span> {dogs.weight}</h2>
            <h2><span>HEIGHT:</span> {dogs.height}</h2>
            <h2><span>Temperament:</span> {dogs.temperament}</h2>
            <h2><span>Life span:</span> {dogs.life_span}</h2>

            </div>
            <Link to='/home'>
            <button className={styles.backHomeBtn}>Back Home</button>
        </Link>

        </div>
    )
}

export default Detail