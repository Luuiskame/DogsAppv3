import { useState, useEffect, } from "react";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CreateDogValidation from './CreateDogValidation';
import { getAllTempers } from "../../../redux/actions";

function CreateDogForm() {
  const temperaments = useSelector(state => state.allTempers);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllTempers());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    height: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperaments: [], // Usar un array para almacenar temperamentos seleccionados
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        // Si es una casilla de verificación, maneja la selección de temperamentos
        if (checked) {
          return {
            ...prevData,
            temperaments: [...prevData.temperaments, value],
          };
        } else {
          return {
            ...prevData,
            temperaments: prevData.temperaments.filter((temp) => temp !== value),
          };
        }
      } else {
        // Para otros campos, simplemente actualiza el valor
        return {
          ...prevData,
          [name]: value,
        };
      }
    });

    setErrors(
      CreateDogValidation({
        ...formData,
        [name]: value,
      })
    );
  };

  const sendDog = async (event) => {
    event.preventDefault();
    const dog = {
      name: formData.name,
      height: formData.height,
      life_span: formData.life_span,
      temperaments: formData.temperaments,
      weight: `${formData.minWeight} - ${formData.maxWeight}`
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/dogsapp/dogs",dog
      );

      if (response.data) {
        console.log("Dog created", response.data.id);
        navigate(`/detail/${response.data.id}`)
      } else {
        console.log("Server couldn't provide an ID for this dog");
      }
    } catch (error) {
      console.log("Error when creating dog", error, formData);
    }
  };

  return (
    <form onSubmit={sendDog}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="height">Height:</label>
      <input type="text" name="height" onChange={handleChange} />

      <label htmlFor="minWeight">Min Weight:</label>
      <input type="text" name="minWeight" onChange={handleChange} />
      
      <label htmlFor="maxWeight">max weight</label>
      <input type="text" name="maxWeight" onChange={handleChange}/>

      <label htmlFor="life_span">Life Span:</label>
      <input type="text" name="life_span" onChange={handleChange} />

      <div>
        <label>Temperaments:</label>
        {temperaments.map((temper) => (
          <label key={temper}>
            <input
              type="checkbox"
              name="temperaments"
              value={temper}
              checked={formData.temperaments.includes(temper)} // Marcar las casillas de verificación seleccionadas
              onChange={handleChange}
            />
            {temper}
          </label>
        ))}
      </div>

      <button type="submit">Create</button>
    </form>
  );
}

export default CreateDogForm;