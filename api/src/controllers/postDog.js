const {Dog, Temperament} = require('../db')

async function postDog(req,res){
    try {
        const {name, height, weight, life_span, temperaments} = req.body
       
        if(!name || !height || !weight || !life_span || !temperaments ){
            res.status(400).send("not sending all data required")
        }

        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span
        })

        if(!newDog){
            res.status(400).send("something went wrong when creating the dog")
        }

        const foundTemperaments = await Temperament.findAll({
            where: {
                name: temperaments
            },
        })

        if(foundTemperaments.length > 0){
            await newDog.setTemperaments(foundTemperaments)
        }

        await newDog.reload({include: Temperament})

        console.log("dog created succesfuly")
        res.status(200).json(newDog)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = postDog