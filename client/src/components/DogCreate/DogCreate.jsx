import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function DogCreate() {
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

return(
    <div>
        <form>
    <label htmlFor="">Name of the Breed:
        <input type="text" />
    </label>
    
        </form>
    </div>
)


}
