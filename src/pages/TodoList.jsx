import React, {useContext} from 'react';
import { useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';


export default function TodoList() {
  const {actualList, setActualList, idGlobal } = useContext(AppContext);

  useEffect(() => {
    if(!localStorage.getItem('checkbox-items')) {
      localStorage.setItem('checkbox-items', JSON.stringify([]))
    }
  }, [])

  function deleteProduct({target}) {
    const listFiltered = actualList.filter((ids) => (Number(target.value) !== ids.idProduct
      ))
      setActualList(listFiltered)
      localStorage.setItem('list', JSON.stringify({
        buyList: listFiltered,
        id: idGlobal,
      }))
      
    const checkboxStore = JSON.parse(localStorage.getItem('checkbox-items'))
    const checkboxFiltered = checkboxStore.filter((elem) => (
      elem !== target.value
    ))

    localStorage.setItem('checkbox-items', JSON.stringify(checkboxFiltered))
  }

  
  function cheboxLocal({target}) {
    const checkboxStore = JSON.parse(localStorage.getItem('checkbox-items'))
    console.log(target.value)
    if(checkboxStore.some((id) => Number(id) === Number(target.value))) {
      const checkboxFiltered = checkboxStore.filter((elem) => (
        elem !== target.value
      ))

      localStorage.setItem('checkbox-items', JSON.stringify(checkboxFiltered))
    }
    if(!checkboxStore.some((id) => Number(id) === Number(target.value))) {
      localStorage.setItem('checkbox-items', JSON.stringify([...checkboxStore, target.value]))
    }
  }

  function checkedBox(value) {
    const checkboxStore = JSON.parse(localStorage.getItem('checkbox-items'))
    if (checkboxStore.some((id) => Number(id) === Number(value))) {
      return true;
    }
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
          <input type="checkbox" value={elem.idProduct} checked={checkedBox(elem.idProduct)}  onClick={(e) => cheboxLocal(e)} />
          <button type="button">Edit</button>
          <button type="button" value={elem.idProduct} onClick={(e) => deleteProduct(e)} >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
