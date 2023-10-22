const axios = require('axios')
const URL = "https://api.thedogapi.com/v1/breeds/"
const {Dog} = require('../db')

async function getDogById(req,res){
    try {
        const {id} = req.params

        if(!isNaN(id)){
            const response = await axios(`${URL}${id}`)

            const dog = response.data

            const imgId = dog.reference_image_id

            const imgUrl = await axios(`https://api.thedogapi.com/v1/images/${imgId}`)

            const dogData={
                name: dog.name,
                id: dog.id,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: imgUrl.data.url
            }
    
            res.status(200).json(dogData)
        } else {
            const result = await getDogDb(id,res)
            res.status(200).json(result)
        }

        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function getDogDb(id,res){
    try {
        const searchDogDb = await Dog.findByPk(id)
        if(!searchDogDb){
            res.status(500).send("we couldn't find the dog with the provided ID")
        }
        return searchDogDb
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = getDogById