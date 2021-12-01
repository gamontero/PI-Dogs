
const initialState = {
  reducerBreeds: [],
  allBreeds: [],
  allTemperaments: [],
  detail: [],
 
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BREEDS":
      return {
        ...state,
        reducerBreeds: action.payload, //envio todo lo que esta en la accion 
        allBreeds: action.payload, // OJO esto es para siempre tener una copia del estado y no se me borre cuando los filte             
      };


    case "GET_TEMPERAMENTS":
      return {
        ...state,
        allTemperaments: action.payload,
          
      };

    case "GET_NAME_BREED":
      return {
        ...state,
        reducerBreeds: action.payload,
      };


    case "POST_VIDEOGAME": 
      return {
        ...state,

      };


    case "FILTER_BY_TEMPERAMENT": 
     
      let breedFiltered = action.payload === "all" ? state.allBreeds : state.allBreeds.filter((g) => g.temperament?.includes(action.payload));
      return {
        ...state,
        reducerBreeds: breedFiltered,
      };

  
    case "FILTER_CREATED":
      
       const createdFilter = action.payload === "API" ? state.allBreeds.filter((g) => !g.createdID) : state.allBreeds.filter((g) => g.createdID);
      return {
        ...state,
        reducerBreeds: action.payload === 'all' ? state.allBreeds : createdFilter,
      };

    case "ORDER_BY_NAME":
      let sort =
        action.payload === "asc"
          ? state.reducerBreeds.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          : state.reducerBreeds.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        reducerBreeds: sort,
      };


    case "ORDER_BY_WEIGHT":
      let sortWeight = action.payload === "top" ?
          
          state.reducerBreeds.sort(function (a, b) {
            if (
              Number(a.weight.split(' - ')[1]) >
              Number(b.weight.split(' - ')[1])
            ) {
              return -1;
            }
            if (
              Number(b.weight.split(' - ')[1]) >
              Number(a.weight.split(' - ')[1])
            ) {
              return 1;
            }
            return 0;
          })
          : state.reducerBreeds.sort(function (a, b) {
          if (
            parseInt(a.weight.split(' - ')[0]) >
            parseInt(b.weight.split(' - ')[0])
          ) {
            return 1;
          }
          if (
            parseInt(b.weight.split(' - ')[0]) >
            parseInt(a.weight.split(' - ')[0])
          ) {
            return -1;
          }
          return 0;
        })

      return {
        ...state,
        reducerBreeds: sortWeight,
      };
      
        case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };




    default:
      return state;

  }

}

export default rootReducer;