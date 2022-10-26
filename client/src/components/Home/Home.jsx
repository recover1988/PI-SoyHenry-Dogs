import React from "react";
import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link , NavLink} from 'react-router-dom';
import {
    getDogs,
    getTemperaments,
    getDogsByDB,
    getDogsByApi,
    getDogsByName,
    getDogById,
    getDogsByTemperaments
} from "../../actions/actions";
import NavBar from "../NavBar/NavBar";

export default function Home() {
    return(
        <div>
            <NavBar />
            Home
            </div>
    )
};