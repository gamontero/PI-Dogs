const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db");
const { getTempAPI } = require("../controllers");

router.get("/", async (req, res) => {
  try {
    const tempsDb = await getTempAPI();
    tempsDb.forEach((g) => {
      if (g !== "") {
        Temperament.findOrCreate({
          where: { name: g },
        });
      }
    });

    const allTemperaments = await Temperament.findAll({
      attributes: ["name"],
    });

    return res.status(200).send(allTemperaments);
  } catch (e) {
    res.status(404).send("Cant access DB. GET TEMPERAMENT PROBLEMS");
  }
});

module.exports = router;
