import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedbyName } from "../actions";
import styles from "./SearchBar.module.css"



var letters = /^[A-Za-z]+$/;
  
 
export default function SearchBar () {

const dispatch = useDispatch();
const [name, setName] = useState("");

function handleInputChange (e) {
e.preventDefault();
setName(e.target.value);
}

function handleSubmit(e) {
e.preventDefault()

if (!name) {
    alert("Breed's name needed"); 
}
else if (name.length > 20) { 
    alert("Name too long. Maximun 30 characters")
}
else if (!name.match(letters)) {
    alert("Only letters allowed")

} else {
    dispatch(getBreedbyName(name));
    setName("");
}};


return (
    <span className={styles.container} >
        <input className={styles.searchbar} type= "text" required value = {name}   pattern="[a-zA-Z áéíóú]{2,20}" title="letters only, maximun 20 characters allowed ex: Abc..." onChange = {(e) => handleInputChange(e)}/>
        <button className={styles.bn30} type = "submit" onClick = {(e) => handleSubmit (e)}> Search</button>
    </span>
    )
};