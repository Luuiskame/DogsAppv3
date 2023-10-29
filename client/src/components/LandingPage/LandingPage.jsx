import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'
const apiDoc = "https://www.thedogapi.com/"


function LandingPage(){
    return(
        <section className={styles.mainLandingContainer}>
        <nav className={styles.landingNav}>
        <p className={styles.logo}><span className={styles.spanLogo}>Happ</span>Dog</p>
        <Link to='/home'>
        <button className={styles.takeHomeBtn}><i className="material-icons">home</i></button>
        </Link>
        </nav>
        <div className={styles.imgAndTextContainer}>
       
        <h1 className={styles.h1Landing}> All dogs data you need directly from <span className={styles.h1Gradient}>thedogApi</span></h1>

        <button className={styles.takeApiBtn}><a href={apiDoc} target="_blank" rel="noopener noreferrer">Learn more</a></button>
            <div className={styles.imgContainer}>
            <img src="/Img/undraw_good_doggy_re_eet7.svg"/>
            </div>

        </div>

        <div className={styles.aboutContainer}>
            <h2 className={styles.landingNumbers}>1</h2>
            <h3 className={styles.numberTitles}>Search your favorites dogs by breed</h3>
            <p className={styles.landingP}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur consectetur iusto dicta facere quos quo praesentium quibusdam quidem deleniti maxime impedit nulla.</p>

            <h2 className={styles.landingNumbers}>2</h2>
            <h3 className={styles.numberTitles}>Filter them by all options we provide</h3>
            <p className={styles.landingP}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur consectetur iusto dicta facere quos quo praesentium quibusdam quidem deleniti maxime impedit nulla.</p>

            <h2 className={styles.landingNumbers}>3</h2>
            <h3 className={styles.numberTitles}>Create your own dog using AI</h3>
            <p className={styles.landingP}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur consectetur iusto dicta facere quos quo praesentium quibusdam quidem deleniti maxime impedit nulla.</p>

        </div>
        
    </section>
    )
}

export default LandingPage