import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedbyName } from "../actions";
import styles from "./SearchBar.module.css"



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
} else {
    dispatch(getBreedbyName(name));
    setName("");
}};


return (
    <span className={styles.container} >
        <input className={styles.searchbar} type= "text" required value = {name}  onChange = {(e) => handleInputChange(e)}/>
        <button className={styles.bn30} type = "submit" onClick = {(e) => handleSubmit (e)}> Search</button>
    </span>
    )
};