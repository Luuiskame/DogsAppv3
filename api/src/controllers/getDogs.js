const axios = require("axios")
const URL = "https://api.thedogapi.com/v1/breeds"
const imgUrl = "https://api.thedogapi.com/v1/images/"

require('dotenv').config()

const {API_KEY} = process.env

async function getDogs(req,res){
    try {
        const response = await axios(`${URL}?api_key=${API_KEY}&limit=10`)
        const data = response.data


        const dogPromises = data.map(async (dog)=>{
   
            return {
                name: dog.name,
                id: dog.id,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                image: dog.image.url,
                temperament: dog.temperament
            };
        })

        const dogs = await Promise.all(dogPromises)

        
        res.status(200).json(dogs)
    } catch (error) {
        res.status(500).json({error: error})
    }
}


module.exports = getDogs