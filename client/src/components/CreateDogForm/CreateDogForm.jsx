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
    minHeight: "",
    maxHeight: "",
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
        } else {
          window.alert("temperament already selected")
          return prevData
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
    if(formData.temperaments.length === 0){
      window.alert("Please select at least one temperament")
      return 
    }
    const dog = {
      name: formData.name,
      height: `${formData.minHeight} - ${formData.maxHeight}`,
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

  const canSubmit = !formData.name ||
  !formData.maxHeight ||
  !formData.minHeight ||
  !formData.minWeight ||
  !formData.maxWeight ||
  !formData.life_span ||
  !formData.temperaments ||
  errors.name 
    ? false
    : true

  return (
    <form className={styles.formContainer} onSubmit={sendDog}>
      <div className={styles.labelsAndInputsContainer}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="minHeight">Min height:</label>
      <input type="number" name="minHeight" onChange={handleChange} />
      {errors.minHeight && <p>{errors.minHeight}</p>}

      <label htmlFor="maxHeight">Max height:</label>
      <input type="number" name="maxHeight" onChange={handleChange} />
      {errors.maxHeight && <p>{errors.maxHeight}</p>}

      <label htmlFor="minWeight">Min Weight:</label>
      <input type="number" name="minWeight" onChange={handleChange} />
      {errors.minWeight && <p>{errors.minWeight}</p>}

      <label htmlFor="maxWeight">max weight</label>
      <input type="number" name="maxWeight" onChange={handleChange} />
      {errors.maxWeight && <p>{errors.maxWeight}</p>}

      <label htmlFor="life_span">Life Span:</label>
      <input type="number" name="life_span" onChange={handleChange} />
      {errors.life_span && <p>{errors.life_span}</p>}

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

      
      <button type="submit" className={styles.submitFormBtn} disabled={!canSubmit}>Create</button>
        
      </div>



    </form>
  );
}

export default CreateDogForm;
