import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogCreate } from "../../actions/actions";
import NavBar from "../NavBar/NavBar";
import validate from "./validator.js";
import styles from "./DogCreate.module.css";

export default function DogCreate() {
  const allTemperaments = useSelector((state) => state.dogTemperaments);
  const [errors, setErrors] = useState({});
  const [button, setButton] = useState(false);
  const [resetSelect, setResetSelect] = useState("defaultValue");
  const [dogCreate, setDogCreate] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    image: "",
    life_span_min: "",
    life_span_max: "",
    temperaments: [],
  });
  const [dogCreateSuccessfully, setDogCreateSuccessfully] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(dogCreate));

    if (
      Object.values(errors).every((e) => e === true) &&
      dogCreate.name.length > 0 &&
      dogCreate.height_min.length > 0 &&
      dogCreate.height_max.length > 0 &&
      dogCreate.weight_min.length > 0 &&
      dogCreate.weight_max.length > 0
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [dogCreate, button]);

  function handleChange(event) {
    event.preventDefault();
    let { name, value } = event.target;

    setDogCreate({ ...dogCreate, [name]: value });
  }

  function handleChangeTemperaments(event) {
    event.preventDefault();
    let { value } = event.target;
    !dogCreate.temperaments.includes(value) &&
    dogCreate.temperaments.length < 10
      ? setDogCreate({
          ...dogCreate,
          temperaments: [...dogCreate.temperaments, value],
        })
      : setResetSelect("defaultValue");
  }
  function handleDelete(el) {
    setDogCreate({
      ...dogCreate,
      temperaments: dogCreate.temperaments.filter((temp) => temp !== el),
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setDogCreateSuccessfully(true);
    setTimeout(() => {
      setDogCreateSuccessfully(false);
    }, 3000);
    dispatch(postDogCreate(dogCreate));
    setDogCreate({
      name: "",
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      image: "",
      life_span_min: "",
      life_span_max: "",
      temperaments: [],
    });
  }
  return (
    <div className={styles.container}>
      <NavBar />
      {dogCreateSuccessfully === true ? (
        <div className={styles.createSuccessfully}>
          <h3> the dog was create successfully!!!!</h3>
        </div>
      ) : (
        <form className={styles.formDog} onSubmit={handleSubmit}>
          <div className={styles.formName}>
            <h1>Create a Dog</h1>
          </div>

          {/* OPCIONES DE NOMBRE */}

          <div className={`${styles.optionName} ${styles.optionContNameUrl}`}>
            <div className={styles.optionContNameUrlTitle}>
              Name of the Breed:{" "}
              {errors.name === true ? null : (
                <span className={styles.errors}>(*req)</span>
              )}
            </div>

            <div className={styles.optionContNameUrlInput}>
              {" "}
              <input
                name="name"
                value={dogCreate.name}
                onChange={handleChange}
                type="text"
                placeholder="name"
              />
            </div>
            <div className={styles.optionContNameUrlErrors}>
              {errors.name ? (
                <p className={styles.errors}>{errors.name}</p>
              ) : null}
            </div>
          </div>

          {/* OPCIONES DE TEMPERAMENTOS */}

          <div className={` ${styles.optionTemperaments}`}>
            <div className={styles.optionTempTitle}>
              Temperaments (max of 10):
            </div>
            <div className={styles.optionTempSelect}>
              <select onChange={handleChangeTemperaments} value={resetSelect}>
                <option value="defaultValue" disabled>
                  Select:
                </option>
                {allTemperaments?.map((d) => (
                  <option value={d.name} key={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>{" "}
            </div>

            <div className={styles.optionTempSelected}>
              {dogCreate.temperaments?.map((el) => (
                <div
                  className={styles.tempButton}
                  key={el}
                  onClick={() => handleDelete(el)}
                >
                  <p>{`${el}`}</p>
                </div>
              ))}
            </div>
          </div>
          {/* OPCIONES DE ALTURA */}

          <div className={`${styles.optionHeight} ${styles.optionCont}`}>
            <div className={styles.optionTitle}>
              Height(centimeters):{" "}
              {errors.height_min === true &&
              errors.height_max === true ? null : (
                <span className={styles.errors}>(*requires both fields)</span>
              )}
            </div>

            <div className={styles.optiontMin}>
              minimun height
              <input
                name="height_min"
                value={dogCreate.height_min}
                onChange={handleChange}
                type="number"
                placeholder="MIN"
                min={1}
                max={300}
              />
            </div>
            <div className={styles.optiontMinErrors}>
              {errors.height_min ? (
                <p className={styles.errors}>{errors.height_min}</p>
              ) : null}
            </div>
            <div className={styles.optiontMax}>
              maximum height
              <input
                name="height_max"
                value={dogCreate.height_max}
                onChange={handleChange}
                type="number"
                placeholder="MAX"
                min={1}
                max={300}
              />
            </div>

            <div className={styles.optiontMaxErrors}>
              {errors.height_max ? (
                <p className={styles.errors}>{errors.height_max}</p>
              ) : null}
            </div>
          </div>

          {/* OPCIONES DE PESO */}

          <div className={`${styles.optionWeight} ${styles.optionCont}`}>
            <div className={styles.optionTitle}>
              Weight(kilograms):{" "}
              {errors.weight_min === true &&
              errors.weight_max === true ? null : (
                <span className={styles.errors}>(*requires both fields)</span>
              )}
            </div>

            <div className={styles.optiontMin}>
              minimun weight
              <input
                name="weight_min"
                value={dogCreate.weight_min}
                onChange={handleChange}
                type="number"
                placeholder="MIN"
                min={1}
                max={300}
              />
            </div>
            <div className={styles.optiontMinErrors}>
              {errors.weight_min ? (
                <p className={styles.errors}>{errors.weight_min}</p>
              ) : null}
            </div>
            <div className={styles.optiontMax}>
              maximum weight
              <input
                name="weight_max"
                value={dogCreate.weight_max}
                onChange={handleChange}
                type="number"
                placeholder="MAX"
                min={1}
                max={300}
              />
            </div>
            <div className={styles.optiontMaxErrors}>
              {errors.weight_max ? (
                <p className={styles.errors}>{errors.weight_max}</p>
              ) : null}
            </div>
          </div>

          {/* OPCIONES DE ESPECTATIVA DE VIDA */}

          <div className={`${styles.optionLifeSpan} ${styles.optionCont}`}>
            <div className={styles.optionTitle}>Life Span(years):</div>

            <div className={styles.optiontMin}>
              minimun life span
              <input
                name="life_span_min"
                value={dogCreate.life_span_min}
                onChange={handleChange}
                type="number"
                placeholder="MIN"
                min={1}
                max={25}
              />
            </div>
            <div className={styles.optiontMinErrors}>
              {errors.life_span_min ? (
                <p className={styles.errors}>{errors.life_span_min}</p>
              ) : null}
            </div>
            <div className={styles.optiontMax}>
              maximum life span
              <input
                name="life_span_max"
                value={dogCreate.life_span_max}
                onChange={handleChange}
                type="number"
                placeholder="MAX"
                min={1}
                max={25}
              />
            </div>
            <div className={styles.optiontMaxErrors}>
              {errors.life_span_max ? (
                <p className={styles.errors}>{errors.life_span_max}</p>
              ) : null}
            </div>
          </div>

          {/* OPCIONES DE IMAGEN EN URL */}

          <div className={`${styles.optionImage} ${styles.optionContNameUrl}`}>
            <div className={styles.optionContNameUrlTitle}> Image(URL):</div>

            <div className={styles.optionContNameUrlInput}>
              {" "}
              <input
                className={styles.inputUrl}
                name="image"
                value={dogCreate.image}
                onChange={handleChange}
                type="url"
                placeholder="url"
                maxLength={2000}
              />
            </div>

            {/* OPCIONES DE BOTON SUBMIT */}

            <div
              className={`${styles.optionSubmit} ${styles.optionContNameUrlErrors}`}
            >
              {errors.image ? (
                <p className={styles.errors}>{errors.image}</p>
              ) : null}
            </div>
          </div>
          <div className={styles.optionSubmit}>
            <button type="submit" disabled={!button}>
              SEND
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
