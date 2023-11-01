
import { Link } from "react-router-dom"
import styles from './Card.module.css'

const defaultImage = '/Img/dogDefault_img.png'

function Card({id,image,name,weight,temperament}){

    return(
        <div 
        className={styles.cardContainer}
        key={id}>
            
            <div className={styles.imgContainer}>
                <img className={styles.dogImg} src={image || defaultImage} alt={name} />
            </div>
            
            <div className={styles.textContainer}>
            <h2 className={styles.cardName}>NAME: {name}</h2>
            <p className={styles.cardWeight}>WEIGHT: {weight}</p>
            <p className={styles.cardTemp}>temperament: {temperament}</p>
            </div>

            <Link to={`/detail/${id}`}>
            <button className={styles.takeDetailBtn}>About</button>
            </Link>

        </div>
    )
} 


export default Card