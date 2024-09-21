
import styles from "./Home.module.css";

//redux actions
import {
  getDogs,
  getAllTempers,
  prevPage,
  nextPage,
  goToFirstPage,
  goToLastPage
} from "../../../redux/actions";

// hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Card from "../Card/Card";
import Header from "../Header/Header";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = useSelector((state) => state.dogsPerPage);


  const totalPages = Math.ceil(dogs.length / dogsPerPage);
  const start = (currentPage - 1) * dogsPerPage;
  const end = start + dogsPerPage;

  const currentDogs = dogs.slice(start, end);

  const nextPageHandle = () => {
    dispatch(nextPage());
  };

  const prevPageHandle = () => {
    dispatch(prevPage());
  };

  const firstPageHandle = () => {
    dispatch(goToFirstPage()); // Disparar acción para ir a la primera página
  };

  const lastPageHandle = () => {
    dispatch(goToLastPage(totalPages)); // Disparar acción para ir a la última página
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllTempers());
  }, []);

  return (
    <div className={styles.cardsContainer}>
      <Header />
      {currentDogs.length === 0 ? ( // Conditionally render a message when dogs array is empty
        <div className={styles.loadingCircle}></div>
      ) : (
        currentDogs.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            weight={dog.weight}
            temperament={dog.temperament}
          />
        ))
      )}
      <div className={styles.homeBtnsContainer}>
        <button
          className={styles.pagBtn}
          onClick={prevPageHandle}
          disabled={currentPage === 1}
        >
          previous
        </button>

        <button
          className={styles.pagBtn}
          onClick={firstPageHandle}
          disabled={currentPage === 1}
        >
          {currentPage}
        </button>

        <button
          className={styles.pagBtn}
          onClick={lastPageHandle}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>

        <button
          className={styles.pagBtn}
          onClick={nextPageHandle}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
