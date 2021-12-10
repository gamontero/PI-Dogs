import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBreeds, getTemperaments, filterCreatedDB, filterByTemperament, orderByName, orderByWeight} from '../actions';
import GameCard from './BreedCard'
import Paginado from './Paginado';
import NavBar from './NavBar';
import styles from "./Home.module.css"
import SearchBar from './SearchBar';

export default function Home() {
    
    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.reducerBreeds); 
    const ReducerTemperaments = useSelector((state) => state.allTemperaments);
    const allTemperaments = ReducerTemperaments.map((g) => g);
    
    const [_order, setOrden] = useState("");
    
    //----------------------------------


    //PAGINADO ------------
    const [currentPage, setCurrentPage] = useState(1)
    const BreedsPerPage = 8 // aca defino los personajes por pagina 
    const indexOfLastBreed = currentPage * BreedsPerPage // en el estado incial el indexoflast... es 8, xq es el ultimo de la pagina actual (la 1 en el estado inicial)
    const indexOfFirstBreed = indexOfLastBreed - BreedsPerPage // deberia ser 0, el inicio 
    const currentBreed = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //------------------------------

    useEffect(() => {
        dispatch(getBreeds()) 
        dispatch(getTemperaments())
    }, [dispatch]) 

    function handleClick(e) {
        e.preventDefault(); 
        dispatch(getBreeds());
    }

    function handleFilterCreated(e) {
        e.preventDefault(); 
        dispatch(filterCreatedDB(e.target.value))
        setCurrentPage(1)
        setOrden(e.target.value);
    }

    function handleFilterTemperament(e) {
        dispatch(filterByTemperament(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    function handleScore(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }



    // -----------------------------------------
    return (
        <div className={styles.mainscreen}>
            <div>
               <NavBar/>
            </div>
                        
            <button className={styles.btn31} onClick={e => { handleClick(e) }}> 
                Erase Filters
            </button>
            <div className={styles.container2}>
                <SearchBar />
            </div>  
            <div>
                 {/* filtros y ordenamientos */}
                <div className={styles.span1}>
                    <span>
                    <select className={styles.formStyle} selected="false" defaultValue={"DEFAULT"} onChange={e => handleSort(e)}>
                        <option  value="DEFAULT" name="DEFAULT">Order ⇵</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A </option>
                    </select>

                    <select className={styles.formStyle}  selected="false" defaultValue={"DEFAULT"} onChange={e => handleScore(e)}>
                        <option value="DEFAULT">Weight ⇵ </option>
                        <option value='top'>Highest </option>
                        <option value='low'> Lowest </option>
                    </select>

                    <select className={styles.formStyle} selected="false" name="filterTemperaments" defaultValue={"DEFAULT"} onChange={e => handleFilterTemperament(e)}>
                        <option value="DEFAULT" >Filter by Temperament</option>
                        <option value='all'>All Temperament</option>
                        {allTemperaments.map((temperament) => (
                            <option key={temperament} value={temperament}>
                                {temperament}
                            </option>
                        ))};
                    </select>

                    <select className={styles.formStyle} selected="false" defaultValue={"DEFAULT"} onChange={e => handleFilterCreated(e)} >
                        <option value="DEFAULT">Breeds</option>
                        <option value='all'>All</option>
                        <option value='created'>Created </option>
                        <option value='API'>API</option>
                    </select>


                    </span>
                </div>
                
            <div className={styles.paginado}>
                <Paginado  
                    BreedsPerPage={BreedsPerPage}
                    allBreeds={allBreeds.length}
                    paginado={paginado}
                />
            </div>

                <ul className={styles.gameGrid}>
                    {currentBreed?.map((g) => {
                        return (
                            <div key={g.id}>
                                <GameCard
                                    
                                    id={g.id}
                                    name={g.name}
                                    image={g.image}
                                    temperament={g.temperament}
                                    weight={g.weight}
                                />
                            </div>                           
                        );
                    })}
                </ul>

            </div>
        </div>
    )
}
