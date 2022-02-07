import React, {useContext} from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';


export default function TodoList() {
  const {actualList, setActualList, idGlobal } = useContext(AppContext);

  function deleteProduct({target}) {
    const listFiltered = actualList.filter((ids) => (Number(target.value) !== ids.idProduct
      ))
    setActualList(listFiltered)
    localStorage.setItem('list', JSON.stringify({
      buyList: listFiltered,
      id: idGlobal,
    }))
  }
  
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
          <button type="button" value={elem.idProduct} onClick={(e) => deleteProduct(e)} >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
