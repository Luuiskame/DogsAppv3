import { useState } from "react";
import { useDispatch } from "react-redux";

import { getDogsByName } from "../../../redux/actions";

import styles from './Searchbar.module.css'

function Searchbar(){
    const [dogName, setDogName] = useState('')
    const dispatch = useDispatch()

    const handleSearch = ()=>{
        dispatch(getDogsByName(dogName))
    }
   
    return(
        <nav className={styles.searchbarContainer}>
        <input 
        className={styles.searchbar}
        type="search" 
        value={dogName}
        onChange={(event)=> setDogName(event.target.value)}
        placeholder="Name here"
        />

        <div className={styles.searchModeContainer}>
            <button className={styles.searchBtn} onClick={handleSearch}>search</button>
            <button className={styles.addRandomBtn}>random</button>
        </div>

    </nav>
    )
}

export default Searchbar