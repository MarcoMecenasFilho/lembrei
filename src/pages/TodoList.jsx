import React, {useContext} from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';


export default function TodoList() {
  const {actualList, setActualList } = useContext(AppContext);
  
  return (
    <div>
      <Header />
      <div>
        {actualList.map((elem) => (
          <div style={{display: "flex"}}>
          {elem.categoryText === "" ? <p>{elem.category}</p> :
          <p>{elem.categoryText}</p>}
          {elem.subcategoryText === "" ? (<p>{elem.subcategory}</p>) :
          (<p>{elem.subcategoryText}</p>)}
          <p>{elem.quantity}</p>
          <p>{elem.unit}</p>
          <p>{elem.note}</p>
          <input type="checkbox" />
          <button type="button">Edit</button>
          <button type="submit">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
