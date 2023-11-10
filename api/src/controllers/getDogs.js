const axios = require("axios")
const URL = "https://api.thedogapi.com/v1/breeds"

require('dotenv').config()

const {API_KEY} = process.env
const {Dog,Temperament} = require('../db')


async function getDogs(req, res) {
  try {
    // Fetch dogs from the API
    const apiResponse = await axios(`${URL}?api_key=${API_KEY}`);
    const apiData = apiResponse.data;

    // Fetch dogs from the database
    const dbDogs = await Dog.findAll({
      include: Temperament, // Include Temperament model to retrieve related temperaments
    });

    // Format and merge the dogs
    const apiDogs = apiData.map((dog) => ({
      name: dog.name,
      id: dog.id,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament,
      createdAtDatabase: false
    }));

    const dogs = dbDogs.map((dbDog) => ({
      name: dbDog.name,
      id: dbDog.id,
      height: dbDog.height,
      weight: dbDog.weight,
      life_span: dbDog.life_span,
      image: dbDog.image,
      temperament: dbDog.temperaments.map((temperament) => temperament.name).join(", "),
      createdAtDatabase: true,
    }));

    // Combine both sets of dogs
    const allDogs = [...dogs,...apiDogs ];
    console.log(allDogs)

    res.status(200).json(allDogs);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = getDogs;