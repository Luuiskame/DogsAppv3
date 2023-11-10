import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogsByName } from "../../../redux/actions";

import styles from "./Searchbar.module.css";

function Searchbar() {
  const [dogName, setDogName] = useState("");
  const dispatch = useDispatch();
  const dogs = useSelector(state=> state.dogs)
  
  const handleSearch = () => {
    if(dogName === ""){
      window.alert("not found")
    } else {
      dispatch(getDogsByName(dogName));

    }
  };

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
          <button className={styles.addRandomBtn}>random</button>
        </div>
      </div>

    <div className={styles.createDogAndOutContainer}>
              <Link to="/create-dog">
        <button className={styles.createDogBtn}>Create dog</button>
      </Link>
      <Link to="/">
      <button className={styles.goLandingBtn}>Out</button>
      </Link>

    </div>

    </nav>
  );
}

export default Searchbar;
