import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDogsByName, errorsNameHandler } from "../../../redux/actions";
import styles from "./Searchbar.module.css";

function Searchbar() {
  const [dogName, setDogName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const errorName = useSelector(state=> state.errorName)
  
  const handleSearch = () => {
    if(dogName === ""){
      window.alert("you need to type a name, example: akita")
    } else {
      dispatch(getDogsByName(dogName));
    }
  };

  useEffect(()=>{
    if(errorName === "notfound"){
      navigate('/notfound')
      dispatch(errorsNameHandler(""))
    }
  },[errorName])

  return (
    <nav className={styles.searchbarContainer}>
      <div className={styles.searchbarAndBtnsContainer}>
        <input
          className={styles.searchbar}
          type="search"
          value={dogName}
          onChange={(event) => setDogName(event.target.value)}
          placeholder="Name here"
        />

        <div className={styles.searchModeContainer}>
          <button className={styles.searchBtn} onClick={handleSearch}>
            search
          </button>
        </div>
      </div>

    <div className={styles.createDogAndOutContainer}>
              <Link to="/create-dog">
        <button className={styles.createDogBtn}>Create dog</button>
      </Link>
      <Link to="/">
      <button className={styles.goLandingBtn} onClick={()=> navigate('/')}>Landing page</button>
      </Link>

    </div>

    </nav>
  );
}

export default Searchbar;
