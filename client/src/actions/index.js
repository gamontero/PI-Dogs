
import axios from "axios";

export function getVideoGames() {
  return function (dispatch) {
    return axios.get("/dogs")
      .then((response) => {
        dispatch({
          type: "GET_BREEDS",
          payload: response.data,
          
        });

      })
      .catch((error) => {
        alert("Get VideoGames not Working", error)
      }
      )
  }
}

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

  export function getTemperaments() {
    return async function (dispatch) {
      try {
        var info = await axios.get("/temperaments", {});
        return dispatch({ type: "GET_TEMPERAMENTS", 
        payload: info.data });
      } catch (error) {
        alert("Genre Not Found")
      }
    }
  }

  export function postBreed(payload) {
    
    return async function () {
      try {
        const response = await axios.post("/dogs", payload);
        return response;
      } catch (error) {
        alert("Post Not Working")
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


  export function filterByPlatform(payload) {
    return {
      type: "FILTER_BY_PLATFORM",
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

  export function getDetail(id) {
     if (id) {
      return async function (dispatch) {
        try {
          let gameDetail = await axios.get("/dogs/" + id);
          
          return dispatch({
            type: "GET_DETAIL",
            payload: gameDetail.data,
          });
        } catch (error) {
          alert("Game Not Found Front", error)
        }
      };
    }
    return {
      type: "RESET",
    };
  }


