const axios = require('axios')
const {Dog} = require('../db')
const URL = "https://api.thedogapi.com/v1/breeds/"
// const imgUrl = "https://api.thedogapi.com/v1/images/"

async function getByName(req,res){
    const {name} = req.query
    try {
        const dbCall = await getDogFromDb(name)
        if(dbCall){
            res.status(200).json(dbCall)
        } else {
            const apiCall = await getDogApi(name,res)
            
            if(apiCall.length > 0){
                const dog = apiCall[0]

                const imgId = dog.reference_image_id

                const imageUrl = await axios(`https://api.thedogapi.com/v1/images/${imgId}`)

                const dogData={
                    name: dog.name,
                    id: dog.id,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    temperament: dog.temperament,
                    image: imageUrl.data.url
                }
                res.status(200).send(dogData)
            }
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getDogFromDb = async(name)=>{
    const dogDb = await Dog.findOne({
        where:{
            name:name
        }
    })
    return dogDb
}

const getDogApi = async (name) => {
    try {
        const searchNameCleaned = name.replace(/\s/g, '').toLowerCase()
      const {data} = await axios.get(`${URL}`);

      const info = data.filter((perro)=>{return perro.name.replace(/\s/g, '').toLowerCase() == searchNameCleaned})
      return info
    } catch (error) {
      console.error("Error when calling the API:", error);
      return null;
    }
  }

module.exports = getByName