
const createDogValidation = (data)=>{
    const errors = {}
    if(data.name.length > 20){
        errors.name = "The name connot be longer than 20 characters"
    }

    if(data.height < 10 || data.height > 150){
        errors.height = "A height between 15 cm to 70cm it's recommended if looking for realism"
    }

    if(data.weight < 5 || data.weight > 70){
        errors.height = "A weight between 7 to 50kg is recommended if looking for realism"
    }

    if(data.life_span < 3 || life_span > 20){
        errors.life_span = "The avarege life span for a healthy dog it's between 10 to 13 years!"
    }
}