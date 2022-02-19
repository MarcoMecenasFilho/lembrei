import React, {useContext} from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import '../style/TodoList.css'
import Table from 'react-bootstrap/Table';
import { tableHeader } from '../services/datas';
import { setLocalStore } from '../services/localStorageFunctions';
import remover from '../images/remover.png';
import comprado from '../images/comprado.png';
import naocomprado from '../images/naocomprado.png';
import logo from '../images/logo.png';
import printer from '../images/printer.png'
import add from '../images/add.png'
import trash from '../images/trash.png'
import closeHeader from '../images/closeHeader.png'


export default function TodoList() {
  const {actualList, setActualList, idGlobal,setIdGlobal, checkboxList, setCheckboxList,addProduct, 
    setAddProduct } = useContext(AppContext);
  function deleteProduct({currentTarget}) {          
    const listFiltered = actualList.filter((ids) => (Number(currentTarget.value) !== ids.idProduct
    ))
    const obj = {
      buyList: listFiltered,
      id: idGlobal,
    }
    setActualList(listFiltered)
    setLocalStore('list',  obj)
    const checkboxFiltered = checkboxList.filter((elem) => (
      elem !== currentTarget.value
    ))
    setCheckboxList(checkboxFiltered)
    setLocalStore('checkbox-items', checkboxFiltered)
  }

  
  function cheboxLocal({currentTarget}) {
    const filtered = checkboxList.some((id) => Number(id) === Number(currentTarget.value))
    if(!filtered) {
      setCheckboxList([...checkboxList, currentTarget.value]);
      setLocalStore('checkbox-items', [...checkboxList, currentTarget.value]);
    }
    if(filtered) {
      const checkboxFiltered = checkboxList.filter((elem) => (
        elem !== currentTarget.value
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

  function iconBuy(idProduct) {
    const result = checkedBox(idProduct)   
    if(result) {
      return comprado
    }
    return naocomprado
  }

  function print() {
    alert(`
Será aberta a opção de imprimir. 

Caso deseje uma cópia física, deve escolher a
impressora que preferir.

Para gerar um arquivo, deve se escolher a opção de
salvar em PDF.

Obs: Para melhor visualização escolher o layout que
melhor ficam os dados (Retrato/paisagem).

Ir em Mais definições e ativar Gráficos de segundo
plano e Desativar Cabeçalhos e rodapés.`);
      window.print();
  }

  const list = (
    <div className={addProduct ? 'add table-list' : 'noAdd table-list'} >
      <div className='btns-table'>
        <button src={add} className='addProduct-btn' type='button' onClick={() => setAddProduct(!addProduct)}>
          {addProduct ?  <img className='btn-icon' src={closeHeader} alt='fechar formulário'/> :
          <img className='btn-icon' src={add} alt='add'/>}
        </button>
        <button type='button'  className='btn-clear' src={trash} onClick={clearTable}><img className='btn-icon' src={trash} alt='trash'/></button>
        <button className='print' type='button' src={printer} onClick={() => print()}><img src={printer} className='btn-icon'  alt='printer'/></button>
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
              <button 
                className="buy-btn"
                type='button'
                value={elem.idProduct}
                onClick={(e) => cheboxLocal(e)}
                src={ iconBuy(elem.idProduct) }>
                  {<img src={iconBuy(elem.idProduct)} alt='comprado'/>}
              </button>
            </td>
            <td>
              <button
                type="button"
                src={remover}
                className="delete-btn"
                value={elem.idProduct}
                onClick={(e) => deleteProduct(e)} >
                  <img src={remover} alt='button delete'/>
              </button>
            </td>
          </tr>
      ))}
        
      </tbody>
    </Table>
  </div>   
  )
  document.title = 'Lembrei!!!'
  return (
    <div className='master'>
      <img className='master-img' src={logo} alt='logo' />
    <div className='main-container'>
      {addProduct && <Header/>}
      {list}
    </div>
    </div>
  );
}
