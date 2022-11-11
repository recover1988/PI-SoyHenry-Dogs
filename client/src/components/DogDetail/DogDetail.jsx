import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDogById, getDogsByTemperaments } from "../../actions/actions.js";
import styles from "./DogDetail.module.css";
import NavBar from "../NavBar/NavBar.jsx";

export default function DogDetail(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  const dog = useSelector((state) => state.dogDetail);

  function handleSearchTemp(event){
    event.preventDefault();
    dispatch(getDogsByTemperaments(event.target.value))
    history.push("/home")
  }
  return (
    <div className={styles.Container}>
      <NavBar />
      {dog.length > 0 ? (
        <div className={styles.card}>
          <div className={styles.dogTitle}>
            {" "}
            <h2>{dog[0].name}</h2>{" "}
          </div>
          <div className={styles.dogWeightAndHeight}>
            <div>
              {" "}
              <p>Weight(kilograms): </p>
              <p>
                {dog[0].weight_min > 0 ? dog[0].weight_min : "Not known"}{" "}
                {dog[0].weight_max > 0 ? "- " + dog[0].weight_max : ""}
              </p>
            </div>
            <div>
              {" "}
              <p>Height(centimeters): </p>
              <p>
                {dog[0].height_min > 0 ? dog[0].height_min : "Not known"}{" "}
                {dog[0].height_max > 0 ? "- " + dog[0].height_max : ""}
              </p>
            </div>
          </div>
          <div className={styles.dogLife}>
            {" "}
            <p>Life span(years): </p>
            <p>
              {dog[0].life_span_min > 0 ? dog[0].life_span_min : "Not known"}{" "}
              {dog[0].life_span_max > 0 ? "- " + dog[0].life_span_max : ""}
            </p>{" "}
          </div>

          <div className={styles.dogImage}>
            {" "}
            <img
              src={dog[0].image ? dog[0].image : "dogNotFound.gif"}
              alt="Dog"
            />
          </div>
          <div className={styles.dogTemperamets}>

            <div>
              Temperaments:{" "}
              {dog[0].temperament ? dog[0].temperament.map((t,index) => {
                return(<button key={index} onClick={handleSearchTemp} value={t} >{t}</button>)
                }) 
                : "Not known"}
              .
            </div>
          </div>
        </div>
      ) : (
        <div>Dog no found</div>
      )}
    </div>
  );
}
