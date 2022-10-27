import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogById } from "../../actions/actions.js";
import dogNotFound from "../../img/dogNotFound.gif";
import styles from "./DogDetail.module.css";
import NavBar from "../NavBar/NavBar.jsx";
export default function DogDetail(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch]);

  const dog = useSelector((state) => state.dogDetail);

  return (
    <div className={styles.Container}>
        <NavBar />
      {dog.length > 0 ? 
        <div>
          <h2>{dog[0].name}</h2>
          <img src={dog[0].image ? dog[0].image : dogNotFound.gif} alt="Dog" />
          <h3>
            Temperaments:{" "}
            {dog[0].temperament ? dog[0].temperament.join(", ") : "Not known"}.
          </h3>
          <span>
            Weight(kilograms):{" "}
            {dog[0].weight_min > 0 ? dog[0].weight_min : "Not known"}{" "}
            {dog[0].weight_max > 0 ? "- " + dog[0].weight_max : ""}
          </span>
          <span>
            Height(centimeters):{" "}
            {dog[0].height_min > 0 ? dog[0].height_min : "Not known"}{" "}
            {dog[0].height_max > 0 ? "- " + dog[0].height_max : ""}
          </span>
          <span>
            Life span(years):{" "}
            {dog[0].life_span_min > 0 ? dog[0].life_span_min : "Not known"}{" "}
            {dog[0].life_span_max > 0 ? "- " + dog[0].life_span_max : ""}
          </span>
        </div>
       : (
        <div>Dog no found</div>
      )}
      <Link to="/home" ><button >Volver</button></Link>
    </div>
  );
}
