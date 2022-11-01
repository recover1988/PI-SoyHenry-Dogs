import React from "react";
import { Link,  } from "react-router-dom";
import {
  
} from "../../actions/actions";

import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {

return(
    <nav>
        <ul>
            <li><Link to='/home' >ICONO</Link></li>
            <li><Link to='/home' >HOME</Link></li>
            <li><Link to='/dogCreate'>DOG CRATE</Link></li>
            <li><SearchBar /></li>
        </ul>
    </nav>
)

}
