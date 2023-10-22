import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'


function LandingPage(){
    return(
        <section className={styles.mainLandingContainer}>
        <nav className={styles.landingNav}>
        <p className={styles.logo}><span className={styles.spanLogo}>Happ</span>Dog</p>
        <Link to='/home'>
        <button className={styles.takeHomeBtn}><span>Home</span></button>
        </Link>
        </nav>
        <div className={styles.imgAndTextContainer}>
            <div className={styles.imgContainer}>
            <img />
            </div>
            
            <div className={styles.textContainer}>
            <h1><span className={styles.honeSpan}>Get</span> started</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur consectetur iusto dicta facere quos quo praesentium quibusdam quidem deleniti maxime impedit nulla.</p>

        </div>
        </div>

        <div className={styles.aboutContainer}>
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur consectetur iusto dicta facere quos quo praesentium quibusdam quidem deleniti maxime impedit nulla.</p>

        </div>
        
    </section>
    )
}

export default LandingPage