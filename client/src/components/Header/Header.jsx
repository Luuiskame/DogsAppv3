import Searchbar from "../Searchbar/Searchbar"
import Filters from "../Filters/Filters"

import { Link } from "react-router-dom"

import styles from './Header.module.css'

function Header(){
    return(
        <header className={styles.nav}>
            <Searchbar/>
            <Link to='/create-dog'>
            <button>Create dog</button>
            </Link>
            <Filters/>
        </header>
    )
}

export default Header