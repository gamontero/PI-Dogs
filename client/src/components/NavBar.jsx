import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
    < div >
      <header className={styles.container}>
        <div >
          <Link to="/"className={styles.Title}>Welcome</Link>
        </div>
        <div>
          <Link className={styles.link1} to="/home">Home</Link>
        </div>
        <div >
           <Link className={styles.link1} to='/createbreed'> Create</Link>
        </div>
        
      </header> 
    </div>
    );
}