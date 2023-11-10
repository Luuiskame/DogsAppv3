
const canSubmit = (formData)=>{
    if( !formData.name ||
        !formData.height ||
        !formData.minWeight ||
        !formData.maxWeight ||
        !formData.life_span ||
        !formData.temperaments ||
        errors.name ||
        errors.height ||
        errors.minWeight ||
        errors.maxWeight ||
        errors.life_span ||
        errors.temperaments ||
          ? false
          : true)
}

export default canSubmit