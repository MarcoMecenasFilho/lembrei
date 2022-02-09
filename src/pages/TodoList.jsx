import React, {useContext} from 'react';
import { useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import '../style/TodoList.css'
import Table from 'react-bootstrap/Table';


export default function TodoList() {
  const {actualList, setActualList, idGlobal, checkboxList, setCheckboxList } = useContext(AppContext);

  useEffect(() => {
    if(!localStorage.getItem('checkbox-items')) {
      localStorage.setItem('checkbox-items', JSON.stringify([]))
    }
    const checkList = JSON.parse(localStorage.getItem("checkbox-items"))
      setCheckboxList(checkList)
  }, [])

  function deleteProduct({target}) {          
    const listFiltered = actualList.filter((ids) => (Number(target.value) !== ids.idProduct
    ))
    setActualList(listFiltered)
    localStorage.setItem('list', JSON.stringify({
      buyList: listFiltered,
      id: idGlobal,
    }))
    const checkboxFiltered = checkboxList.filter((elem) => (
      elem !== target.value
    ))
    setCheckboxList(checkboxFiltered)
    localStorage.setItem('checkbox-items', JSON.stringify(checkboxFiltered))
      // document.location.reload()
  }

  
  function cheboxLocal({target}) {
    if(!checkboxList.some((id) => Number(id) === Number(target.value))) {
      setCheckboxList([...checkboxList, target.value])
      localStorage.setItem('checkbox-items', JSON.stringify([...checkboxList, target.value]))
    }
    if(checkboxList.some((id) => Number(id) === Number(target.value))) {
      const checkboxFiltered = checkboxList.filter((elem) => (
        elem !== target.value
      ))
        setCheckboxList(checkboxFiltered)
      localStorage.setItem('checkbox-items', JSON.stringify(checkboxFiltered))
    }
    console.log(checkedBox(target.value))
  }
  
  function checkedBox(idvalue) {  
    const result = checkboxList.some((id) => Number(idvalue) ===  Number(id))    
    if(result) {
      return true
    }
  }

  const tableHeader = [
    "Categoria",
    "Subcategoria",
    "Quantidade",
    "Unidade",
    "Observação",
    "Comprado",
    "Deletar"
  ]

  const list = (
    <div className='="table-list' >
      <Table responsive striped bordered hover>
        <thead>
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
    <div>
      <Header />
      {list}
    </div>
  );
}
