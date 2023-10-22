const {Dog, Temperament} = require('../db')

async function postDog(req,res){
    try {
        const {name, height, weight, image, life_span, temperament} = req.body
       
        if(!name || !height || !weight || !image || !life_span || !temperament){
            res.status(400).send("not sending all data required")
        }

        const newDog = await Dog.create({
            name,
            height,
            weight,
            image,
            life_span
        })

        if(!newDog){
            res.status(400).send("something went wrong when creating the dog")
        }

        const foundTemperaments = await Temperament.findAll({
            where: {
                name: temperament
            },
        })

        if(foundTemperaments.length > 0){
            await newDog.setTemperaments(foundTemperaments)
        }

        await newDog.reload({include: Temperament})

        console.log("dog created succesfuly")
        res.status(200).json(newDog)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = postDog