import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CreateDogValidation from "./CreateDogValidation";
import { getAllTempers } from "../../../redux/actions";

import styles from "./createDogForm.module.css";

function CreateDogForm() {
  const temperaments = useSelector((state) => state.allTempers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTempers());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    height: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        if (checked) {
          return {
            ...prevData,
            temperaments: [...prevData.temperaments, value],
          };
        } else {
          return {
            ...prevData,
            temperaments: prevData.temperaments.filter(
              (temp) => temp !== value
            ),
          };
        }
      } else if (name === "temperament") {
        // Agregar el temperamento seleccionado al array
        if (!prevData.temperaments.includes(value)) {
          return {
            ...prevData,
            temperaments: [...prevData.temperaments, value],
          };
        }
      } else {
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
      weight: `${formData.minWeight} - ${formData.maxWeight}`,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/dogsapp/dogs",
        dog
      );

      if (response.data) {
        console.log("Dog created", response.data.id);
        navigate(`/detail/${response.data.id}`);
      } else {
        console.log("Server couldn't provide an ID for this dog");
      }
    } catch (error) {
      console.log("Error when creating dog", error, formData);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={sendDog}>
      <div className={styles.labelsAndInputsContainer}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="height">Height:</label>
      <input type="text" name="height" onChange={handleChange} />

      <label htmlFor="minWeight">Min Weight:</label>
      <input type="text" name="minWeight" onChange={handleChange} />

      <label htmlFor="maxWeight">max weight</label>
      <input type="text" name="maxWeight" onChange={handleChange} />

      <label htmlFor="life_span">Life Span:</label>
      <input type="text" name="life_span" onChange={handleChange} />

      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="temperament">Temperaments</label>
        <select name="temperament" onChange={handleChange} value="">
          <option value="" disabled>
            Select a temperament
          </option>
          {temperaments.map((temp) => (
            <option key={temp} value={temp}>
              {temp}
            </option>
          ))}
        </select>

        <div className={styles.tempersTextContainer}>
        Selected Temperaments:
        <ul>
          {formData.temperaments.map((temp, index) => (
            <li key={index}>{temp}</li>
          ))}
        </ul>
      </div>

      
      <button type="submit" className={styles.submitFormBtn}>Create</button>
        
      </div>



    </form>
  );
}

export default CreateDogForm;
