import { useDispatch, useSelector } from "react-redux";

import styles from "./Filters.module.css";

import { orderCards, filterByTemper, filterAlphabetically } from "../../../redux/actions";

function Filters() {
    const dispatch = useDispatch()
    const allTempers = useSelector(state=> state.allTempers)

    const handleOrder = (event)=>{
        dispatch(orderCards(event.target.value))
    }

    const handleFilterByTemper = (event)=>{
        console.log(event.target.value)
        dispatch(filterByTemper(event.target.value))
    }

    const handleAlphabeticalFilter = (event) => {
        const filterValue = event.target.value; 
        dispatch(filterAlphabetically(filterValue));
      };
  return (
    <div className={styles.filtersContainer}>
      <select onChange={handleAlphabeticalFilter}>
        <option value="abc">A-Z</option>
        <option value="xyz">Z-A</option>
      </select>

      <select onChange={handleOrder}>
        <option value="upwards">upwards</option>
        <option value="downwards">downwards</option>
        <option value="weight">weight</option>
      </select>

      <select onChange={handleFilterByTemper}>
        {allTempers.map((temper) => (
          <option key={temper} value={temper}>
            {temper}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
