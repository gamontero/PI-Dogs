const { Router } = require('express');
const router = Router();
const { getAllData, getOneByIdAPI, getOneByIdBD } = require('../controllers');

router.get('/', async (req, res) => {
    const { name } = req.query; 
    try {
    let allDogs = await getAllData();

    if (name) {
      let searchedGame = allDogs.filter((breed) => 
        breed.name.toLowerCase().includes(name.toLowerCase()));

      if (searchedGame.length >= 1) return res.status(200).send(searchedGame) 
      res.status(404).send("Breed does not exist")
    } else {
      let allDogs = await getAllData()
      res.status(200).json(allDogs)
    }
    } catch (error) {
      res.status(404).json("Get Breed Route Problems"); 
    }
  });


router.get('/:idRaza', async (req,res)=> {  // ruta para encontrar una raza en particular (el front me manda la id), 
                                            
    var {idRaza}=req.params;
      
    try {
        if(idRaza.includes("-")){  // es por que es una id de UUID => de mi bd

            const oneDogBD= await getOneByIdBD(idRaza);  // fc. q busca en la BD un dog x id 
            if(oneDogBD){
                res.status(200).json(oneDogBD);
            }else{
                res.send('Breed DB not found')
            }
        }else{   // busca en la Api
            const oneDog= await getOneByIdAPI(idRaza); //fc que busca un dog en la Api x id
            if (oneDog){
                res.status(200).json(oneDog);
            }else{
                res.send('Breed API not found')
            }
        }    
    } catch (e) {
        res.status(404).send('Problems with idBreed Route')
    }
})

module.exports = router;
