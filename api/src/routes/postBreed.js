const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require("../db");

router.post("/", async (req, res) => {
  const { name, heightMin, heightMax, weightMin, weightMax, life_spanMin, life_spanMax, temperaments } = req.body;

  if (!name || !heightMax || !heightMin || !weightMax || !weightMin) {
    //database validation
    return res.status(404).send("data missing backend ");
  }
  try {
    const createdBreed = await Dog.create({
      name,
      height: heightMin + "-" + heightMax,
      weight: weightMin + "-" + weightMax,
      life_span: life_spanMin + "-" + life_spanMax + " years",
      
    });

  

    if (!temperaments) {
      res.send("Breed created without temperament(s)");
    } else {
      let dbTemperament = await Temperament.findAll({
        where: { name: temperaments },
      });

      createdBreed.addTemperament(dbTemperament);

      res.send("Breed has been created");
    }
  } catch (e) {
    res.status(404).send("Problems POST route");
  }
});

module.exports = router;
