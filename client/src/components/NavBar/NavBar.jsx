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

import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.getDogsByTemperaments);
  //I brought from the store the dogs ShownPerPage
  const dogsShownPerPage = useSelector((state) => state.dogsShownPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  function pageShown(currentPage) {
    let final = currentPage * dogsShownPerPage;
    let inicio = final - dogsShownPerPage;
    let pagDogs = allDogs.slice(inicio, final);
    return pagDogs;
  }
useEffect(()=>{
    dispatch(getDogs());
    dispatch(getTemperaments());
}, []);

return(
    <nav>
        <ul>
            <li><Link to='/home' >ICONO</Link></li>
            <li><Link to='/home' >HOME</Link></li>
            <li>CREATE</li>
            <li><SearchBar /></li>
        </ul>
    </nav>
)

}
