const axios = require('axios')
const {Dog, Temperament} = require('../db')
const URL = "https://api.thedogapi.com/v1/breeds/"
// const imgUrl = "https://api.thedogapi.com/v1/images/"

require('dotenv').config()

const {API_KEY} = process.env

const getByName = async (req, res) => {
  const { name } = req.query;
  try {
      const dbDogs = await getDogsFromDb(name);
      const apiDogs = await getDogsFromApi(name, res);
      
      // Combinar los resultados de la base de datos y la API, eliminando duplicados por ID
      const combinedDogs = [...dbDogs, ...apiDogs];
      const uniqueDogs = Array.from(new Set(combinedDogs.map(dog => dog.id)))
          .map(id => combinedDogs.find(dog => dog.id === id));

      res.status(200).json(uniqueDogs);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getDogsFromDb = async (name) => {
  const dogsFromDb = await Dog.findAll({
      where: {
          name: name
      },
      include: Temperament
  });

  return dogsFromDb;
};

const getDogsFromApi = async (name, res) => {
  try {
      const searchNameCleaned = name.replace(/\s/g, '').toLowerCase();
      const { data } = await axios.get(`${URL}?api_key=${API_KEY}`);

      const dogsFromApi = data
          .filter((dog) => dog.name.replace(/\s/g, '').toLowerCase() === searchNameCleaned)
          .map((dog) => ({
              name: dog.name,
              id: dog.id,
              height: dog.height.metric,
              weight: dog.weight.metric,
              life_span: dog.life_span,
              temperament: dog.temperament,
              image: dog.image.url
          }));

      return dogsFromApi;
  } catch (error) {
      console.error("Error when calling the API:", error);
      return [];
  }
};

module.exports = getByName;