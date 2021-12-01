const { Router } = require('express');
const router = Router();
const { Temperament } = require("../db");
const { getTempAPI } = require('../controllers');


router.get('/', async (req,res)=> {
    
    try {
        
        const tempApi = await getTempAPI()
            
        // tempApi.forEach(async (g) => {
        //     await Temperament.findOrCreate({
        //         where: {name: g}
        //     }); //se llena la tabla con los temperamentos de la tabla      
        
        // })
        // const TotalTemp = await Temperament.findAll({
        //     attributes: ['name'] || null
        // // order: [['name', 'ASC'],]  //lo devuelvo ordenado alfabéticamente
        // })
    
       res.status(200).json(tempApi);    
    } catch (e) {
        res.status(404).send('Cant access DB. GET TEMPERAMENT PROBLEMS')        
    }   
})


// router.get('/genres', (req, res) => {
//   try {
//     axios.get(` https://api.rawg.io/api/genres?key=${API_KEY}`)
//       .then((response) => {

//         const genre = response.data.results;
//         const genre2 = genre.map((g) => g.name);
//         genre2.forEach(async (g) => {
//           await Genre.findOrCreate({
//             where: {
//               name: g
//             }
//           })
//           return Genre.findAll({
//             attributes: ["name"]
//           });
//         })
//         return res.status(200).json(genre2)

//       })
//   } catch (err) {
//     res.status(500).json(" problema con ruta genre")
//   }
// })


  module.exports = router;
