const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const { Dog, Temperament } = require("../db");

require("dotenv").config();

const { API_KEY } = process.env;

async function getDogById(req, res) {
  try {
    const { id } = req.params;

    if (!isNaN(id)) {
      const response = await axios(`${URL}?api_key=${API_KEY}`);

      const data = response.data;

      const dog = data.find((dog) => dog.id === +id);

      const dogData = {
        name: dog.name,
        id: dog.id,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        temperament: dog.temperament,
        image: dog.image.url,
      };

      res.status(200).json(dogData);
    } else {
      const result = await getDogDb(id, res);
      const temperamentString = result
        ? result.temperaments.map((temperament) => temperament.name).join(", ")
        : "";
      const dogData = {
        name: result.name,
        id: result.id,
        height: result.height,
        weight: result.weight,
        life_span: result.life_span,
        temperament: temperamentString,
        image: result.image,
      };
      res.status(200).json(dogData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDogDb(id, res) {
  try {
    const searchDogDb = await Dog.findByPk(id, { include: Temperament });
    if (!searchDogDb) {
      res.status(500).send("we couldn't find the dog with the provided ID");
    }
    return searchDogDb;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = getDogById;
