import React, { useState, useEffect } from "react";
import { getTemperaments, postBreed } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BreedCreate.module.css";
import NavBar from "./NavBar";

function validate(input) {
  let errorValidate = {};
  var letters = /^[A-Za-z]+$/;

  //name validation
  if (!input.name.trim()) {
    errorValidate.name = "Name required";
  }
  else if ( input.name.length > 30) { 
    errorValidate.name = "Name too long. Maximun 30 characters";
  }
  else if (!input.name.match(letters)) {
    errorValidate.name = "Only letters allowed";
  }

  //height validation
  else if (!input.heightMin) {
    errorValidate.heightMin = "Minimum height required";
  }
  else if (isNaN(parseInt(input.heightMin))) {
    errorValidate.heightMin = 'Minimum height must be a number';
  }
  else if (input.heightMin <= 0) {
    errorValidate.heightMin = 'Your breed can´t be shorter than or equal to 0';
  }
  else if (!input.heightMax) {
    errorValidate.heightMax = 'Maximum height is required!!';
  }
  else if (isNaN(parseInt(input.heightMax))) {
    errorValidate.heightMax = 'Maximum height must be a number';
  }
  else if (input.heightMax > 150) {
    errorValidate.heightMax = 'number too large, 150 maximun allowed';
  }
  else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
    errorValidate.heightMin = 'Minimum height should be lower than maximum height';
  }

  //weight validation  
  else if (!input.weightMin) {
    errorValidate.weightMin = "Minimum weight required";
  }
  else if (isNaN(parseInt(input.weightMin))) {
    errorValidate.weightMin = 'Minimum weight must be a number';
  }
  else if (input.weightMin <= 0) {
    errorValidate.weightMin = 'Your breed can´t weight less than or equal to 0';
  }
  else if (!input.weightMax) {
    errorValidate.weightMax = 'Maximum weight is required!!';
  }
  else if (isNaN(parseInt(input.weightMax))) {
    errorValidate.weightMax = 'Maximum weight must be a number';
  }
  else if (input.weightMax > 200) {
    errorValidate.weightMax = 'number too large, 200 maximun allowed';
  }
  else if (parseInt(input.weightMin) >= parseInt(input.weightMax)) {
    errorValidate.weighttMax = 'Minimum weight must be lower than maximum weight';
  }
//life span validation  
  else if (!input.life_spanMin) {
    errorValidate.life_spanMin = 'Minimum life is required!!';
  }
  else if (!input.life_spanMax) {
    errorValidate.life_spanMax = 'Maximum life is required!!';
  }
  else if (isNaN(parseInt(input.life_spanMin))) {
    errorValidate.life_spanMin = 'Minimum life should be a number';
  }
  else if (isNaN(parseInt(input.life_spanMax))) {
    errorValidate.life_spanMax = 'Maximum life should be a number';
  }
  else if (input.life_spanMax > 40) {
    errorValidate.life_spanMax = "number too large, 40 maximun allowed";
  }
  else if (input.life_spanMin <= 0) {
    errorValidate.life_spanMin = 'Your breed life must be greater than 0';
  }
  else if (parseInt(input.life_spanMin) >= parseInt(input.life_spanMax)) {
    errorValidate.life_spanMax = 'Minimum life must be lower than maximum life';
  }

  

  return errorValidate;
}

export default function GameCreated() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_spanMin: "",
    life_spanMax: "",
    temperaments: [],
   
  });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectTemperaments(e) {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });

    setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
  }

  function handleDelete(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((g) => g !== e),
    });
  }

  function clearForm() { // limpia el Form y los errores, cdo se quiere crear otra raza
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_spanMin: "",
      life_spanMax: "",
      temperaments: [],
    });

    setError({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    
    if (!Object.getOwnPropertyNames(error).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_spanMin && input.life_spanMax && input.temperaments.length) {
      console.log(input)
      dispatch(postBreed(input));
      alert("Breed created!");
      setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_spanMin: "",
      life_spanMax: "",
      temperaments: [],
       
      });
    } else {
      alert("Incomplete information, breed can´t be created without it");
      return;
    }
  }

  return (
    <div>
      <div className={styles.mainscreen}>
        <div>
          <NavBar />
        </div>
        <div className={styles.CreateVideogame}>
          <h1 className={styles.Title}>New Breed</h1>
          <form
            className={styles.CreationForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label className={styles.label}>Name: </label>
              <div  className={styles.formStyle}>
              <input
               
                type="text"
                value={input.name}
                name="name"
                pattern="[a-zA-Z áéíóú]{2,20}"
                title="Solo letras, hasta 20 caracteres ej: Abc..."
                onChange={(e) => handleChange(e)}
              />
              {error.name && <p className={styles.errors}>{error.name}</p>}
               </div>
            </div>
            <div>
              <label className={styles.label}>Height Min: </label>
              <div className={styles.formStyle}>
              <input
                
                type="text"
                value={input.heightMin}
                name="heightMin"
                // placeholder="00-90 [min height (cm) - max height (cm)]"
                // pattern="[0-9]{1,2}[-][0-9]{1,2}"
                // title="numbers only (example: 0-90)"
                onChange={(e) => handleChange(e)}
              />
              {error.heightMin && (<p className={styles.errors}>{error.heightMin}</p>)}
            </div>
            </div>
            <div>
              <label className={styles.label}>Height Max: </label>
              <div className={styles.formStyle}>
              <input
                
                type="text"
                value={input.heightMax}
                name="heightMax"
                // placeholder="00-90 [min height (cm) - max height (cm)]"
                // pattern="[0-9]{1,2}[-][0-9]{1,2}"
                // title="numbers only (example: 0-90)"
                onChange={(e) => handleChange(e)}
              />
              {error.heightMax && (<p className={styles.errors}>{error.heightMax}</p>)}
            </div>
            </div>

            <div>
              <label className={styles.label}>Weight Min: </label>
              <div className={styles.formStyle}>
                  
                    <input
                      type="text"
                      name="weightMin"
                      value={input.weightMin}
                      // placeholder="00-90 [min weight (Kg) - max weight (Kg)]"
                      // pattern="[0-9]{1,2}[-][0-9]{1,2}"
                      // title="numbers only (example: 0-90)"
                      onChange={(e) => handleChange(e)}
                    />                   
                {error.weightMin && (<p className={styles.errors}>{error.weightMin}</p>)}
              </div>
            </div>
            <div>
              <label className={styles.label}>Weight Max: </label>
              <div className={styles.formStyle}>
                  
                    <input
                      type="text"
                      name="weightMax"
                      value={input.weightMax}
                      // placeholder="00-90 [min weight (Kg) - max weight (Kg)]"
                      // pattern="[0-9]{1,2}[-][0-9]{1,2}"
                      // title="numbers only (example: 0-90)"
                      onChange={(e) => handleChange(e)}
                    />                   
                {error.weightMax && (<p className={styles.errors}>{error.weightMax}</p>)}
              </div>
            </div>

            <div>
              <label className={styles.label}>Life Min: </label>
              <div className={styles.formStyle}>
              <input
               
                type="text"
                value={input.life_spanMin}
                name="life_spanMin"
                // placeholder="min 1, max 25"
                // pattern="[0-9]{1,2}"
                // title="numbers from 1 to 2 only. (example 15)"
                onChange={(e) => handleChange(e)}
              />
              {error.life_spanMin && (<p className={styles.errors}>{error.life_spanMin}</p>)}
            </div>
            </div> 

             <div>
              <label className={styles.label}>Life Max: </label>
              <div className={styles.formStyle}>
              <input
               
                type="text"
                value={input.life_spanMax}
                name="life_spanMax"
                // placeholder="min 1, max 25"
                // pattern="[0-9]{1,2}"
                // title="numbers from 1 to 2 only. (example 15)"
                onChange={(e) => handleChange(e)}
              />
              {error.life_spanMax && (<p className={styles.errors}>{error.life_spanMax}</p>)}
            </div>
            </div> 

            <div>
                <label className={styles.label}>Temperament: </label>
                <select name="temperaments" onChange={(e) => handleSelectTemperaments(e)} required>
                     {allTemperaments.map((g) => (             
                         <option value={g} key={g.id}> {g}</option>))} 
                </select>
                
             <div className={styles.label}>
             {input.temperaments.map((g) => (
              <div className={styles.te}>
                <span className={styles.letraTemp}>{g}</span>
                <button
                  type="button"
                  className={styles.tDelete}
                  key={g.id}
                  onClick={() => handleDelete(g)}
                >X</button>
              </div>
            ))}
          </div>
        </div>
              
         

        <span className={styles.containerSubmit}>   
            <div className={styles.divHome}>
              <button className={styles.btn} type="submit">
                Send
              </button>
            </div>
            <div className={styles.divHome}>
              <button className={styles.btn} 
              type="reset" 
              value = "create another breed"
              onClick = {clearForm}>
                Clear Form
              </button>
            </div>
        </span> 

          </form>
        </div>
      </div>
    </div>
  );
}
