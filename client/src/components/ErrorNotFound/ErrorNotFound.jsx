import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorNotFound.module.css";

const ErrorNotFound = () => {
  return (
    <div className={styles.errorContainer}>
      <h2>Dog not found</h2>
      <p>Sorry, the dog you're looking for is not in our database.</p>
      <Link to="/home">
        <button className={styles.homeButton}>Go Home</button>
      </Link>
    </div>
  );
};

export default ErrorNotFound
