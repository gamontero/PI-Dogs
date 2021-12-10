const axios = require ('axios'); 
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');  

//FUNCIONES QUE UTILIZA LA RUTA /Dogs

const getInfoAPI = async () => {  // Fc para obtener todas las razas de la API
    try {
        const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const infoApi = urlApi.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                height: el.height.imperial,
                image: el.image.url,
                life_span: el.life_span,
                temperament: [el.temperament].join().split(",").map((el) => el.trim()),
                weight: el.weight.imperial,
            }
        })
        return infoApi;

    } catch (e) {
        return('No se pudo conectar a la API',e)
    }    
}

const getDBInfo = async () => {     // fc para obtener todos las razas de la B Datos, junto con los temperamentos
    try {      
        const dogsDB =  await Dog.findAll({
            include: Temperament
        });   
        const dbDatos=dogsDB.map(g => {
            return {
               id: g.dataValues.id,
               name: g.dataValues.name,
               height: g.dataValues.height,
               weight: g.dataValues.weight, 
               life_span: g.dataValues.life_span,
               createdID: g.dataValues.createdID,
               temperament: g.dataValues.temperaments.map(g => g.name)
            }        
        });
        console.log(dbDatos)
        return dbDatos;    
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }
}

const getAllData = async () => { //concatena lo de la api + lo de la BD
    try {
        const apiInfo= await getInfoAPI();
        const dbInfo= await getDBInfo();
        const allInfo= dbInfo.concat(apiInfo);
        return allInfo;
    } catch (e) {
        return ('error en la obtencion de datos',e)
    }
}

const getOneByIdAPI = async function(idRaza){  // funcion que busca una raza x id en la Api

    var allDogs= await getInfoAPI();
    for(var i=0; i< allDogs.length; i++){
        if (allDogs[i].id === Number(idRaza)){      
            return allDogs[i]
        }
    }        
}


const getOneByIdBD = async function(idRaza){// Para encontrar un dog en la BD x id UUIV
    try {
        var oneDogBD= [await Dog.findOne({
            where: {id: idRaza},
            include: Temperament,
        })]
        if(oneDogBD){  
            const dbDatos=oneDogBD.map(g => {
                return {
                   id: g.dataValues.id,
                   name: g.dataValues.name,
                   height: g.dataValues.height,
                   weight: g.dataValues.weight, 
                   life_span: g.dataValues.life_span,
                   createdID: g.dataValues.createdID,
                   temperament: g.dataValues.temperaments.map(g => g.name)
                }    
            });
                    
            return dbDatos;    
        }
    } catch (error) {
        return ("problems get details by id", error)
    }
    
}

const getTempAPI = async () => {  
    try {  
        const tempApi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const tempDb = tempApi.data.map( el => el.temperament ).join().split(',')
        const tempsDbTrim = tempDb.map( el => el.trim())
        
        return tempsDbTrim;
    } catch (e) {
        res.status(404).json('Temp Controller problem')   
    }    
}

module.exports = {
    getInfoAPI,
    getDBInfo,
    getAllData,
    getOneByIdAPI,
    getOneByIdBD,
    getTempAPI
}