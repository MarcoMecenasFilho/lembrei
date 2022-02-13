import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import subcategoryFunction from '../services/subcategoryFunction';
import { units, categories } from '../services/datas';
import Form from 'react-bootstrap/Form';
import FloatingLabel  from 'react-bootstrap/FloatingLabel';
import '../style/Header.css';

export default function Header() {
  const [category, setCategory] = useState('')
  const [subcategories, setSubcategories] = useState([])
  const [subcategorySelected, setSubcategorySelected] = useState("");
  const [categoryText, setCategoryText] = useState("")
  const [subcategoryText, setSubcategoryText] = useState("")
  const [note, setNote]   = useState('');
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState("Kg");
  const [validate, setValidate] =useState(false);
  
  const {actualList, setActualList, idGlobal,
    setIdGlobal } = useContext(AppContext);


  function handleChange({ target }) {
    if(target.name === "subcategory") {
      setSubcategorySelected(target.value);
    }
    if(target.name === "quantity") {
      setQuantity(target.value)
    }
    if(target.name === "note") {
      setNote(target.value)
    }
    if( target.name === "unit")  {
      setUnit(target.value)
    }
    if (target.name === "categoryOther") {
      setCategoryText(target.value)
    }
    if (target.name === "subcategoryOther") {
      setSubcategoryText(target.value)
    }
  }

  function handleCategory({target}) {
    setCategory(target.value);
    setSubcategories(subcategoryFunction(target.value))
    setValidate(true)
  }

  const newProduct = [...actualList,
    { 
      idProduct: idGlobal,
      category,
      subcategory: subcategorySelected,
      categoryText,
      subcategoryText,
      note,
      quantity,
      unit,
    }
  ] 
  
  function clickSubmit(e) {
    e.preventDefault()
    setActualList(newProduct)
    localStorage.setItem('list', JSON.stringify({
      buyList: newProduct,
      id: idGlobal + 1,
    }))
    setCategoryText("");
    setSubcategoryText("");
    setNote('');
    setUnit("Kg");
    setIdGlobal(idGlobal + 1)
  }


  return (
    <Form onSubmit={ (e) => clickSubmit(e) } className="Forms">
      <div className='form-div'>
          <Form.Select    onChange={(e) => handleCategory(e)} name="category" required>
            <option value="categoria">Categoria</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </Form.Select>
          {category !== "Outros" && (
            <Form.Select  name="subcategory" onChange={(e) => handleChange(e)} required>
            <option>Nome</option>
            {validate && subcategories.map((subcat) => (
              <option value={subcat}>{subcat}</option>
            ))}
        </Form.Select>
          )}
          {category === "Outros"  && (
            <>
              <FloatingLabel
              controlId="floatingInput"
              label="Digite a categoria"
              className="mb-3 input" >
                <Form.Control  value={categoryText} name="categoryOther" type="text" onChange={ (e) => handleChange(e)} placeholder='Digite a categoria' required />
              </FloatingLabel>
              <FloatingLabel
              controlId="floatingInput"
              label="Digite o nome"
              className="mb-3 input" >
                <Form.Control  value={subcategoryText} name="subcategoryOther" type="text" onChange={ (e) => handleChange(e)} placeholder='Digite a subcategoria' required  />
              </FloatingLabel>
            </>  
          )}
          {(subcategorySelected === "Outros" && category !== "Outros")  && (
            <>
                <FloatingLabel
              controlId="floatingInput"
              label="Digite o nome"
              className="mb-3 input">
                <Form.Control value={subcategoryText} name="subcategoryOther" type="text" onChange={ (e) => handleChange(e)} placeholder='Digite a subcategoria' required  />
              </FloatingLabel>
            </>
          )}
        <FloatingLabel
            controlId="floatingInput"
            label="Quantidade"
            className="mb-3 input ">
              <Form.Control  value={quantity} name="quantity" type="number" onChange={ (e) => handleChange(e)} placeholder='Quantidade' required />
        </FloatingLabel>
        <Form.Select name="unit" onChange={(e) => handleChange(e)}>
          {units.map((unidade) => (
            <option value={unidade}>{unidade}</option>
            ))}
        </Form.Select >
        <FloatingLabel className='mb-3 input' controlId="floatingTextarea" label="Obeservação" >
          <Form.Control  as="textarea" placeholder="observação"  value={note} name="note" type="text" onChange={ (e) => handleChange(e)}/>
        </FloatingLabel>
        
        <button className='save' type='submit'>Salvar</button>
        </div>
    </Form>
  );
}
