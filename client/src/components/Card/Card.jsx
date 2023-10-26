
import { Link } from "react-router-dom"
import styles from './Card.module.css'

const defaultImage = '../../../public/Img/dogDefault_img.png'

function Card({id,image,name,weight,temperament}){

    return(
        <div 
        className={styles.cardContainer}
        key={id}>
            
            <div className={styles.imgContainer}>
                <img className={styles.dogImg} src={image || defaultImage} alt={name} />
            </div>
            
            <div className={styles.textContainer}>
            <p>ID: {id}</p>
            <h2>NAME: {name}</h2>
            <p>WEIGHT: {weight}</p>
            <p>temperament: {temperament}</p>
            </div>

            <Link to={`/detail/${id}`}>
            <button>About</button>
            </Link>

        </div>
    )
} 


export default Card