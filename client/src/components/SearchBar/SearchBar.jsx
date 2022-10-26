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

export default function SearchBar() {
  
    const dispatch = useDispatch();
    const [name , setName] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        if(name !== ''){
            dispatch(getDogsByName(name));
            setName('')
        }
    }

    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value)
    }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <span className="visually-hidden">Search Dog</span>
      </label>
      <input type="text" id="search" placeholder="Search Dog" name="s" onChange={handleInputChange} />
      <button type="submit" onClick={handleSubmit}>Search</button>
    </form>
  );
}
