import Searchbar from "../Searchbar/Searchbar"
import Filters from "../Filters/Filters"

import { Link } from "react-router-dom"

import styles from './Header.module.css'

function Header(){
    return(
        <header>
            <Searchbar/>
            <Filters/>
        </header>
    )
}

export default Header