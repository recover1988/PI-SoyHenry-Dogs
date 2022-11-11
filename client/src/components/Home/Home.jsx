import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import DogCard from "../DogCard/DogCard";
import styles from "./Home.module.css";
import {
  getDogs,
  getTemperaments,
  orderByWeight,
  orderByHeight,
  orderByName,
  getDogsByApi,
  getDogsByDB,
  getDogsByTemperaments,
} from "../../actions/actions";

export default function Home() {
  const dispatch = useDispatch();

  let allDogs = useSelector((state) => state.dogs);
  let allTemperaments = useSelector((state) => state.dogTemperaments);

  const [optionDB, setOptionDB] = useState("defaultValue");
  const [optionName, setOptionName] = useState("defaultValue");
  const [optionWeight, setOptionWeight] = useState("defaultValue");
  const [optionHeight, setOptionHeight] = useState("defaultValue");
  const [optionTemperament, setOptionTemperament] = useState("defaultValue");
  // const [orden, setOrden] = useState("");

  useEffect(() => {
    if(allDogs.length === 0){
    dispatch(getDogs());}
    dispatch(getTemperaments());
  }, []);

  function handleOptionsRequest(event) {
    event.preventDefault();

    if (["weightMin", "weightMax"].includes(event.target.value)) {
      setOptionName("defaultValue");
      setOptionWeight(event.target.value);
      return dispatch(orderByWeight(event.target.value, allDogs));
    }
    if (["heightMin", "heightMax"].includes(event.target.value)) {
      setOptionHeight(event.target.value);
      return dispatch(orderByHeight(event.target.value, allDogs));
    }

    if (["ascending", "descending"].includes(event.target.value)) {
      setOptionWeight("defaultValue");
      setOptionName(event.target.value);
      return dispatch(orderByName(event.target.value, allDogs));
    }

    if (event.target.value) {
      setOptionTemperament(event.target.value);
      setOptionDB("defaultValue");
      setOptionWeight("defaultValue");
      setOptionName("defaultValue");
      return dispatch(getDogsByTemperaments(event.target.value));
    }

    // setOrden(`Ordenado ${event.target.value}`);
  }

  function handleDataRequest(event) {
    event.preventDefault();
    setOptionDB(event.target.value);
    setOptionTemperament("defaultValue");
    setOptionWeight("defaultValue");
    setOptionName("defaultValue");
    let options = ["allDogs", "apiDogs", "CreatedDogs"];
    if (options[0] === event.target.value) dispatch(getDogs());
    if (options[1] === event.target.value) dispatch(getDogsByApi());
    if (options[2] === event.target.value) dispatch(getDogsByDB());
    // setOrden(`Ordenado ${event.target.value}`);
  }

  return (
    <div className={styles.ContainerHome}>
      <div className={styles.banner}>
        <p>a world of dogs!!!</p>
      </div>
      <div className={styles.navbar}>
        <NavBar />
      </div>

      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={optionDB}
          onChange={(e) => handleDataRequest(e)}
        >
          <option disabled value="defaultValue">
            Data From:
          </option>
          <option value="allDogs">All Dogs</option>
          <option value="apiDogs">Api Dogs</option>
          <option value="CreatedDogs">Created Dogs</option>
        </select>
        <select
          className={styles.select}
          value={optionTemperament}
          onChange={(e) => handleOptionsRequest(e)}
        >
          <option disabled value="defaultValue">
            Search By Temperament
          </option>
          {allTemperaments?.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={optionName}
          onChange={(e) => handleOptionsRequest(e)}
        >
          <option disabled value="defaultValue">
            Order by Name
          </option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <select
          className={styles.select}
          value={optionWeight}
          onChange={(e) => handleOptionsRequest(e)}
        >
          <option disabled value="defaultValue">
            Order by Weight
          </option>
          <option value="weightMin">Weight MIN</option>
          <option value="weightMax">Weight MAX</option>
        </select>
        <select
          className={styles.select}
          value={optionHeight}
          onChange={(e) => handleOptionsRequest(e)}
        >
          <option disabled value="defaultValue">
            Order by Height
          </option>
          <option value="heightMin">Height MIN</option>
          <option value="heightMax">Height MAX</option>
        </select>
      </div>
      <div className={styles.dogsContainer}>
        {allDogs.length > 0 ? (
          <Pagination
            data={allDogs}
            RenderComponent={DogCard}
            pageLimit={3}
            dataLimit={8}
          />
        ) : (
          <h1>No Dogs to display</h1>
        )}
      </div>
    </div>
  );
}
