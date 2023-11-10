
const CreateDogValidation = (data)=>{
    const errors = {}
    if (data.name.trim() === "") {
        errors.name = "Name is required";
      } else if (data.name.length > 20) {
        errors.name = "The name cannot be longer than 20 characters";
      }

      if(data.minHeight < 0){
        errors.minHeight = "Height values must be positive"
      } else if (data.minHeight > data.maxHeight){
        errors.minHeight = "Min height cannnot be greater or equal to max height"
      }

      if(data.maxHeight < 0){
        errors.maxHeight = "Height values must be positive"
      } else if (data.maxHeight <= data.minHeight){
        errors.maxHeight = "Max height should be greater to min height"
      }

      if(data.minWeight < 3){
        errors.minWeight = "min weight should be greater than 3 kilos"
      } else if (data.minWeight >= data.maxWeight){
        errors.minWeight = "Min weight cannot be greater than or equal the max weight"
      }

      if(data.maxWeight > 500){
        errors.maxWeight = "its a dog not a giant"
      }

      if (data.life_span < 0 || data.life_span > 50) {
        errors.life_span = "Life Span must be between 0 and 50";
      }

      return errors
   
}

export default CreateDogValidation