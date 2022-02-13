import React, {useContext} from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import '../style/TodoList.css'
import Table from 'react-bootstrap/Table';
import { tableHeader } from '../services/datas';
import { setLocalStore } from '../services/localStorageFunctions';
import { useState } from 'react';


export default function TodoList() {
  const {actualList, setActualList, idGlobal,setIdGlobal, checkboxList, setCheckboxList } = useContext(AppContext);
  const [addProduct, setAddProduct] = useState(false)
  function deleteProduct({target}) {          
    const listFiltered = actualList.filter((ids) => (Number(target.value) !== ids.idProduct
    ))
    const obj = {
      buyList: listFiltered,
      id: idGlobal,
    }
    setActualList(listFiltered)
    setLocalStore('list',  obj)
    const checkboxFiltered = checkboxList.filter((elem) => (
      elem !== target.value
    ))
    setCheckboxList(checkboxFiltered)
    setLocalStore('checkbox-items', checkboxFiltered)
  }

  
  function cheboxLocal({target}) {
    const filtered = checkboxList.some((id) => Number(id) === Number(target.value))
    if(!filtered) {
      setCheckboxList([...checkboxList, target.value]);
      setLocalStore('checkbox-items', [...checkboxList, target.value]);
    }
    if(filtered) {
      const checkboxFiltered = checkboxList.filter((elem) => (
        elem !== target.value
      ))
        setCheckboxList(checkboxFiltered);
        setLocalStore('checkbox-items', checkboxFiltered);
        }
  }
  
  function checkedBox(idvalue) {  
    const result = checkboxList.some((id) => Number(idvalue) ===  Number(id))    
    if(result) {
      return true
    }
  }

  function clearTable() {
    setIdGlobal(0);
    setActualList([]);
    setCheckboxList([]);
    setLocalStore('checkbox-items', []);
    setLocalStore('list', {buyList: [], id:0});
  }

  const list = (
    <div className={addProduct ? 'add table-list' : 'noAdd table-list'} >
      <div className='btns-table'>
        <button className='addProduct-btn' type='button' onClick={() => setAddProduct(!addProduct)}>Adicionar despesa</button>
        <button type='button'  className='btn-clear' onClick={clearTable}>Limpar Tabela</button>
      </div>
      <Table responsive striped  bordered hover>
        <thead >
            <tr>
              <th>#</th>
              {tableHeader.map((elem, index) => (
                <th key={index}><p>{elem}</p></th>
              ))}
            </tr>
        </thead>
      <tbody>
        {actualList.map((elem, index) => (
          <tr key={index} className= {checkedBox(elem.idProduct) && "scratched" } >
            <td><p>{index}</p></td>
            {elem.categoryText === "" ? <td><p>{elem.category}</p></td> :
            <td><p>{elem.categoryText}</p></td>}
            {elem.subcategoryText === "" ? (<td><p>{elem.subcategory}</p></td>) :
            (<td><p>{elem.subcategoryText}</p></td>)}
            <td><p>{elem.quantity}</p></td>
            <td><p>{elem.unit}</p></td>
            <td><p>{elem.note}</p></td>
            <td>
              <button type='button ' value={elem.idProduct} onClick={(e) => cheboxLocal(e)}>Comprado</button>
            </td>
            <td>
              <button type="button" value={elem.idProduct} onClick={(e) => deleteProduct(e)} >Delete</button>
            </td>
          </tr>
      ))}
        
      </tbody>
    </Table>
  </div>   
  )

  return (
    <div className='main-container'>
      {addProduct && <Header/>}
      {list}
    </div>
  );
}
