
import styles from "./Home.module.css";

//redux actions
import {
  getDogs,
  getAllTempers,
  prevPage,
  nextPage,
} from "../../../redux/actions";

// hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Card from "../Card/Card";
import Header from "../Header/Header";

function Home() {
  // getting the dogs global stage and dispatch method
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = useSelector((state) => state.dogsPerPage);

  const totalPages = Math.ceil(dogs.length / dogsPerPage)
  const start = (currentPage - 1) * dogsPerPage;
  const end = start + dogsPerPage;

  const currentDogs = dogs.slice(start, end);

  const nextPageHandle = () => {
    dispatch(nextPage());
  };

  const prevPageHandle = () => {
    dispatch(prevPage());
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllTempers());
  }, []);
  console.log(dogs);

  return (
    <div className={styles.cardsContainer}>
      <Header />
      {currentDogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            weight={dog.weight}
            temperament={dog.temperament}
          />
        );
      })}
      <div className={styles.homeBtnsContainer}>
      <button
        className={styles.pagBtn}
        onClick={prevPageHandle}
        disabled={currentPage === 1}
      >
        previous
      </button>
      <button className={styles.pagBtn} onClick={nextPageHandle} disabled={currentPage === totalPages}>
        Next
      </button>
        
      </div>

    </div>
  );
}

export default Home;
