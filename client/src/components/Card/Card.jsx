
import { Link } from "react-router-dom"

function Card({id,image,name}){

    return(
        <div key={id}>
            <Link to={`/detail/${id}`}>
            <button>About</button>
            </Link>
            <p>ID: {id}</p>
            <div>
                <img src={image} alt={name} />
            </div>
            <h2>NAME: {name}</h2>
        </div>
    )
} 


export default Card