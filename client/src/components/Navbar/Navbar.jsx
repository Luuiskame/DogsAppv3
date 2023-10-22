import Searchbar from "../Searchbar/Searchbar"

import styles from './Navbar.module.css'

function Navbar(){
    return(
        <nav className={styles.nav}>
            <Searchbar/>
        </nav>
    )
}

export default Navbar