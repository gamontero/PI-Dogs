import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from "./LandingPage.module.css"


export default function Landing() { 
    return ( 
        <div className={styles.LandingWelcome}>
            <div className={styles.container}>
        <div className={styles.textContainer }>

            
            <p>Welcome to Breeds!
            A Dog library developed as an individual project. 
            Please take the time to explore the website, search for your favorite breed 
            or even create your own.
            Have fun! and thank you for the support. </p>
        </div>    
            <div>
             <Link to="/home"> 
                 <button className={styles.bn1}> Enter </button>
             </Link>
            </div>
            </div>
        </div> )

}