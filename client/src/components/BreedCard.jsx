import React from 'react'
import { Link } from "react-router-dom";
import styles from "./BreedCard.module.css"
import background from "../media/Dog3.jpeg"


export default function Card({ name, image, temperament, id, weight }) {

  const defaultImage =  background;
  
  // if (typeof genres[0] !== "string") {
  //   genres = genres.map((e) => e.name);
  // } else {
  //   genres = genres;
  // }

  return (
    <div>


      <ul className={styles.gameCard}>
        <Link to={"/breed/" + id}>
          <img
            className={styles.gameImage}
            src={image || defaultImage}
            alt="img not found"
          />
        </Link>

        <div className={styles.titleName}>{name}</div>
        <div className={styles.text}>Temperament(s): {temperament?.map((g) => g + ", ")}</div>
        <div className={styles.text}>Weight (metric): {weight}</div>

      </ul>


    </div>
  );
}