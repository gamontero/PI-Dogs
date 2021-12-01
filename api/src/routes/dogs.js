const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require("../db");
const { getAllData, getOneByIdAPI, getOneByIdBD, addTemperaments, capitalizar } = require('../controllers');

router.get('/', async (req, res) => {
    const { name } = req.query; 
    try {
    let allDogs = await getAllData();
    if (name) {
      let searchedGame = allDogs.filter((game) => 
        game.name.toLowerCase().includes(name.toLowerCase()));
      if (searchedGame.length >= 1) return res.status(200).send(searchedGame) 
      res.status(404).send("Breed does not exist")
    } else {
      let allDogs = await getAllData()
      res.status(200).json(allDogs)
    }
    } catch (error) {
      res.status(500).json("Get Breed Route Problems"); 
    }
  });




router.get('/:idRaza', async (req,res)=> {  // ruta para encontrar una raza en particular (el front me manda la id), 
                                            
    var {idRaza}=req.params;
    
    if (typeof idRaza !== "string") idRaza.toString();
     console.log(idRaza)

    try {
        if(idRaza.length===36){  // es por que es una id de UUID => de mi bd

            var oneDogBD= await getOneByIdBD(idRaza);  // fc. q busca en la BD un dog x id 
            if(oneDogBD){
                res.status(200).json(oneDogBD);
            }else{
                res.send('Breed not found')
            }
        }else{   // busca en la Api
            var oneDog= await getOneByIdAPI(idRaza); //fc que busca un dog en la Api x id
            if (oneDog){
                res.status(200).json(oneDog);
            }else{
                res.send('Breed not found')
            }
        }    
    } catch (e) {
        res.status(404).send('Problems with idBreed Route')
    }
})


//-------------------------------------------------------------------------------------


// router.get('/videogames/id', async (req, res) => {
//   const {id} = req.query;
  
//   if (typeof id !== "string") id.toString();

//   try {
//     if (id.includes("-")) {
//       const gameDB = await Videogame.findOne({
//         where: { id: id },
//         include: [Genre],
//       });

//       return res.json(gameDB);

//     } else {
//       const apiGamesResponse = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
//       const apiGames = await apiGamesResponse.data
//       if (apiGames.name) {
//         const { name, background_image, genres, description, released, rating, platforms } = apiGames
//         const gameDetails = {
//           name,
//           description,
//           released,
//           background_image,
//           rating,
//           genres,
//           platforms,
//         }
//         res.status(200).json(gameDetails);
//       }
//     }
//   } catch (err) {
//     res.status(404).json("Id not found");
//   }
// });


// //--------------------------------------------------------------------------------------------------------------------







router.post('/', async (req,res) =>{
    const {name, height, weight, life_span, temperaments, created}= req.body; //!! temperaments es un array
    
    if (!name || !height || !weight || !life_span || !temperaments){ //database validation 
        return res.send('faltan datos ')
    }
    name=capitalizar(name);  //fc q capitaliza string
    try{
        const[dog, created]= await Dog.findOrCreate({
            where:{
              name: name,
            },
            defaults:{
                height: height,
                weight: weight,
                life_span: life_span, 
            },   
        });
        if ( created===true && temperaments!==undefined){ //se crean los temperaments pasados x body
            temperaments.forEach( te => {
                addTemperaments(te, dog);  //fc q agrega los temps en la tabla Temperament y los asocia al dog
            })   
        }
        res.status(200).send("Breed has been created");  
    }
    catch(e){ 
        res.status(404).send('Problems POST route')
    };
});

// //-------------------------------------------------------------------------------------------------------------------

// router.post('/videogames', async (req, res) => {
//   const { name, description, releaseDate, rating, genres, platforms, created } = req.body;
// try {
//   let gameCreated = await Videogame.create({
//     name,
//     description,
//     releaseDate,
//     rating,
//     created,
//     platforms,

//   });
// console.log(gameCreated)
//   let dbGenre = await Genre.findAll({
//     where: { name: genres },
//   });

//   gameCreated.addGenres(dbGenre);

//   res.status(200).send("Your game has been saved")
// } catch {
//   res.status(500).send("Problems Route Post")
// }
// })



  module.exports = router;
