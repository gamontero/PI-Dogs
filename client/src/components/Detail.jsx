import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions/index";
import NavBar from "./NavBar";
import styles from "./Detail.module.css"


export default function Detail(props) {
  
const { id } = useParams();
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);
  var detail = useSelector((state) => state.detail);
  console.log(typeof(detail))
  console.log(Array.isArray(detail))

const defaultImage = "https://cdnb.artstation.com/p/assets/images/images/036/628/681/4k/ivanov-alvarado-arcade-stylized-video-game-asset-1.jpg?1618196293"

return (
    <div>
      {detail.length === 0 ? (
        <div>
        <div><NavBar/></div>
          <p>...Loading</p>
        </div>
    
      ) : (
        <div >
        <div>
          <NavBar/>
        </div>

        <div className={styles.detailContainer}>
          <img src={detail.image || defaultImage} className={styles.imgDetail}  alt="img not found"
                />
          <div>
            <p>
              <strong>Name: </strong> {detail.name}
            </p>

            <p>
              <strong>Temperament: </strong>
              {detail.temperament}
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
      )}
    </div>
    
  );
}