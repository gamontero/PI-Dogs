import React, { useState, useEffect } from "react";
import { getTemperaments, postBreed } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BreedCreate.module.css";
import NavBar from "./NavBar";

function validate(input) {
  let errorValidate = {};
  if (!input.name.trim()) {
    errorValidate.name = "Name required";
  }
  if (!input.height) {
    errorValidate.height = "height required";
  }
  if (!input.weight) {
    errorValidate.weight = "Weight required";
  }
  if (!input.life_span) {
    errorValidate.life_span = "Life span required";
  }
  if (!input.temperaments.length) {
    errorValidate.temperaments = "Temperament(s) selection required";
  }

  return errorValidate;
}

export default function GameCreated() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
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
      height: "",
      weight: "",
      life_span: "",
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
    
    if (Object.keys(error).length === 0) {
      
      dispatch(postBreed(input));
      e.target.reset();
      alert("Breed created!");
      setInput({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: [],
       
      });
    } else {
      alert("Incomplete information");
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
              <input
                className={styles.formStyle}
                type="text"
                value={input.name}
                name="name"
                pattern="[a-zA-Z áéíóú]{2,20}"
                title="Solo letras, hasta 20 caracteres ej: Abc..."
                onChange={(e) => handleChange(e)}
              />
              {error.name && <p className={styles.errors}>{error.name}</p>}
            </div>

            <div>
              <label className={styles.label}>Height: </label>
              <input
                className={styles.formStyle}
                type="text"
                value={input.height}
                name="height"
                placeholder="00-90 [min height (cm) - max height (cm)]"
                pattern="[0-9]{1,2}[-][0-9]{1,2}"
                title="numbers only (example: 0-90)"
                onChange={(e) => handleChange(e)}
              />
              {error.height && (<p className={styles.errors}>{error.height}</p>)}
            </div>

            <div>
              <label className={styles.label}>Weight: </label>
              <div className={styles.formStyle}>
                  
                    <input
                      
                      type="text"
                      name="weight"
                      value={input.weight}
                      placeholder="00-90 [min weight (Kg) - max weight (Kg)]"
                      pattern="[0-9]{1,2}[-][0-9]{1,2}"
                      title="numbers only (example: 0-90)"
                      onChange={(e) => handleChange(e)}
                    />                   
                {error.weight && (<p className={styles.errors}>{error.weight}</p>)}
              </div>
            </div>

            <div>
              <label className={styles.label}>Life Span: </label>
              <div className={styles.formStyle}>
              <input
               
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="min 1, max 25"
                pattern="[0-9]{1,2}"
                title="numbers from 1 to 2 only. (example 15)"
                onChange={(e) => handleChange(e)}
              />
              {error.life_span && (<p className={styles.errors}>{error.life_span}</p>)}
            </div>
            </div>      
            <div>
                <label className={styles.label}>Temperament: </label>
                <select name="temperaments" onChange={(e) => handleSelectTemperaments(e)}>
                     {allTemperaments.map((g) => (             
                         <option value={g} key={g.id}> {g}</option>))} 
                </select>
                {error.temperaments && <p className={styles.errors}>{error.temperament}</p>}
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
                Create Another Breed
              </button>
            </div>
        </span> 

          </form>
        </div>
      </div>
    </div>
  );
}
