import React from "react";
import style from "./DogCard.module.css";
import { Link } from "react-router-dom";

export default function DogCard(props) {
  const { id, name, image, temperament, weight_min, weight_max } = props.data;
  function displayWeigth(weight_min, weight_max) {
    if (weight_min > 199 || !weight_min)
      return `We do not have an approximate weight registered.`;
    if (weight_min === weight_max)
      return `Has an approximate weight of ${weight_min} kilograms.`;
    else
      return `It weighs approximately between ${weight_min} and ${weight_max} kilograms.`;
  }

  return (
    <div key={id} className={style.Card}>
      <Link to={"/home/" + id}>
        <h2>{name}</h2>
      </Link>
      <img src={image} alt="Not found" />
      <div className={style.features}>
        <div>
          <h3>
            {temperament.length
              ? `They are known to be: ${temperament.join(", ")}.`
              : "We dont have registered temperaments."}
          </h3>
        </div>
        <div>
          <h4>{displayWeigth(weight_min, weight_max)}</h4>
        </div>
      </div>
    </div>
  );
}
