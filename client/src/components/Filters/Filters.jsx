import { useDispatch, useSelector } from "react-redux";

import styles from "./Filters.module.css";

import { orderCards, filterByTemper, filterAlphabetically, filterFromDb, resetFilters } from "../../../redux/actions";

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

    const handleFilterDb = (event)=>{
      console.log(event.target.value)
      dispatch(filterFromDb(event.target.value))
    }

    const handleReset = ()=>{
      dispatch(resetFilters())
    }
  return (
    <div className={styles.filtersContainer}>
      {/* <select onChange={handleFilterDb}>
        <option value="api">App list</option>
        <option value="db">my dogs</option>
      </select> */}
      <div className={styles.flexSelect}>

      <select onChange={handleAlphabeticalFilter}>
        <option value="abc">A-Z</option>
        <option value="xyz">Z-A</option>
      </select>

      <select onChange={handleOrder}>
        <option value="upwards">upwards filter</option>
        <option value="downwards">downwards filter</option>
        <option value="maxWeight">max weight</option>
        <option value="minWeight">Min weight</option>
      </select>

      </div>

      <div className={styles.flexSelect}>

      <select onChange={handleFilterByTemper}>
                <option value="All">All tempers</option>
           {allTempers.map((temperament, index)=>{
            return <option key={index} value={index}>{temperament}</option>
           })}
           </select>

           <button className={styles.resetBtn} onClick={handleReset}>reset</button>

      </div>

      
    </div>
  );
}

export default Filters;
