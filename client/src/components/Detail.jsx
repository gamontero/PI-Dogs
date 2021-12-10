import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions/index";
import NavBar from "./NavBar";
import styles from "./Detail.module.css"
import background from "../media/Dog3.jpeg"

export default function Detail() {
const { id } = useParams();
const dispatch = useDispatch();
let detail = useSelector((state) => state.detail);


useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

if (Array.isArray(detail) === true)  {
    detail = detail[0]
  } 
 
return (
    <div>
      {!detail ? (
        <div>
        <div><NavBar/></div>
          <p>...Loading</p>
        </div>
    
      ) : (
        <div >
        <div>
          <NavBar/>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.detailContainer}>
            <div className={styles.imageContainer}>
          <img src={detail.image || background} className={styles.imgDetail}  alt="img not found"
                />
            </div>
          <div className={styles.textContainer}>
            <p>
              <strong>Name: </strong> {detail.name}
            </p>

            <p>
              <strong>Temperament: </strong>
              {detail.temperament + ', '}
            </p>

            <p>
              <strong>Height-Metric (min - max): </strong>
              {detail.height}
            </p>

            <p>
              <strong>Weight-Metric (min - max): </strong>
              {detail.weight}
            </p>

            <p>
              <strong>Life span: </strong>
              {detail.life_span}
            </p>

           </div>
        </div>
        </div>
        </div>
      )}
      
    </div>
    
  );
}