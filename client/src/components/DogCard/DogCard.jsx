import React from "react";
import style from "./DogCard.module.css"

export default function DogCard(props) {
  const { name, image, temperament } = props.data;
  return (
    <div className={style.Card}>
      <h2>{name}</h2>
      <img src={image} alt="Not found" />
      <h3>{temperament.join(', ')}</h3>
    </div>
  );
}
