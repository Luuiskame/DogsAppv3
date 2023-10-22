import Searchbar from "../Searchbar/Searchbar"

import styles from './Header.module.css'

function Header(){
    return(
        <header className={styles.nav}>
            <Searchbar/>
        </header>
    )
}

export default Header