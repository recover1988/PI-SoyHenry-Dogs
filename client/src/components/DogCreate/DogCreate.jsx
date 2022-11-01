import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogCreate } from "../../actions/actions";
import validate from "./validator.js";

export default function DogCreate() {
  const allTemperaments = useSelector((state) => state.dogTemperaments);
  const [errors, setErrors] = useState({});
  const [button, setButton] = useState(false);
  console.log(errors);
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

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
  }, [dogCreate, setButton]);

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
    <div>
      <h1>Create a Dog</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name of the Breed:
          <input
            name="name"
            value={dogCreate.name}
            onChange={handleChange}
            type="text"
            placeholder="name"
          />
        </label>
        {errors.name ? <span>{errors.name}</span> : null}
        <br />

        <label>
          Temperaments:
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
          (max of 10)
        </label>
        <div>
          {dogCreate.temperaments?.map((el) => (
            <div key={el} onClick={() => handleDelete(el)}>
              <p>{`${el}`}</p>
            </div>
          ))}
        </div>

        <br />

        <label>
          Height(centimeters): MIN
          <input
            name="height_min"
            value={dogCreate.height_min}
            onChange={handleChange}
            type="number"
            placeholder="Min height"
          />
          MAX
          <input
            name="height_max"
            value={dogCreate.height_max}
            onChange={handleChange}
            type="number"
            placeholder="Max height"
          />
        </label>
        <br />
        <label>
          Weight(kilograms): MIN
          <input
            name="weight_min"
            value={dogCreate.weight_min}
            onChange={handleChange}
            type="number"
            placeholder="Min Weight"
          />
          MAX
          <input
            name="weight_max"
            value={dogCreate.weight_max}
            onChange={handleChange}
            type="number"
            placeholder="Max Weight"
          />
        </label>
        <br />
        <label>
          Life Span(years): MIN
          <input
            name="life_span_min"
            value={dogCreate.life_span_min}
            onChange={handleChange}
            type="number"
            placeholder="max life span"
          />
          MAX
          <input
            name="life_span_max"
            value={dogCreate.life_span_max}
            onChange={handleChange}
            type="number"
            placeholder="min life span"
          />
        </label>
        <br />
        <label>
          Image(URL):
          <input
            name="image"
            value={dogCreate.image}
            onChange={handleChange}
            type="url"
            placeholder="url"
          />
        </label>
        <br />
        <button type="submit" disabled={!button}>
          SEND
        </button>
      </form>
    </div>
  );
}
