import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  getDogsByDB,
  getDogsByApi,
  getDogsByName,
  getDogById,
  getDogsByTemperaments,
} from "../../actions/actions";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import DogCard from "../DogCard/DogCard";
import styles from "./Home.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  console.log(allDogs);
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  return (
    <div className={styles.ContainerHome}>
      <NavBar />
      <div>
        Opciones
        <select name="" id="">
          <option value="ascending">Ascending ⇑</option>
          <option value="descending">Descending ⇓</option>
        </select>
        <select name="" id="">
          <option value="weightUp">Weight ⇑</option>
          <option value="weightDown">Weight ⇓</option>
        </select>
      </div>
      <div>
        {allDogs.length > 0 ? (
          <>
            <Pagination
              data={allDogs}
              RenderComponent={DogCard}
              title="DOGS"
              pageLimit={3}
              dataLimit={6}
            />
          </>
        ) : (
          <h1>No Posts to display</h1>
        )}
      </div>
    </div>
  );
}
