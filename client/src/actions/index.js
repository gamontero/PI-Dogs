import axios from "axios";

export function getBreeds() {
  return async function (dispatch) {
  try{
    var json = await axios.get("/dogs");
      
        return dispatch({
          type: "GET_BREEDS",
          payload: json.data,
        });

  }catch (error)  {
        alert("Get Breed not Working", error)
      }
      
  }
}


// export function getBreeds() {
//   return function (dispatch) {
//     return axios.get("/dogs")
//       .then((response) => {
//         dispatch({
//           type: "GET_BREEDS",
//           payload: response.data,
          
//         });

//       })
//       .catch((error) => {
//         alert("Get Breed not Working", error)
//       }
//       )
//   }
// }

export function getBreedbyName(name) {
    return async function (dispatch) {
      try {
        var json = await axios.get(`/dogs?name=${name}`);

        return dispatch({
          type: "GET_NAME_BREED",
          payload: json.data,
        });
      } catch (error) {
        alert("Breed Not Found");
      }
    };
  }

export function getDetail(id) {
  return async function (dispatch) {
        try {
          // let payload = await axios.get(`/dogs?id=${id}`);
        let payload = await axios.get(`/dogs/${id}`);
            return dispatch({
            type: "GET_DETAIL",
            payload: payload.data,
          });
        } catch (error) {
          alert("Breed Not Found Front", error)
        }
      };
    }
  
export function getTemperaments() {
    return async function (dispatch) {
      try {
        var info = await axios.get("/temperaments", {});
        return dispatch({ type: "GET_TEMPERAMENTS", 
        payload: info.data });
      } catch (error) {
        alert("Temperament Not Found")
      }
    }
  }

export function postBreed(payload) {
    return async function () {
      try {
        const response = await axios.post("/createBreed", payload);
       
        return response;
      } catch (error) {
        alert("Post Not Working action")
      }
    }
  }


export function filterCreatedDB(payload) {
    return {
      type: "FILTER_CREATED",
      payload,
    };
  }

export function filterByTemperament(payload) {
     return {
      type: "FILTER_BY_TEMPERAMENT",
      payload,

    };
  }


export function filterByOrigen(payload) {
    return {
      type: "FILTER_BY_ORIGEN",
      payload,

    };
  }

export function orderByName(payload) {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  }

export function orderByWeight(payload) {
    return {
      type: "ORDER_BY_WEIGHT",
      payload,
    };
  }




