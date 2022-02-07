import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import subcategoryFunction from '../services/subcategoryFunction';


export default function Header() {
  const [category, setCategory] = useState('')
  const [subcategories, setSubcategories] = useState([])
  const [subcategorySelected, setSubcategorySelected] = useState("");
  const [categoryText, setCategoryText] = useState("")
  const [subcategoryText, setSubcategoryText] = useState("")
  const [note, setNote]   = useState('');
  const [quantity, setQuantity] = useState(0)
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
    setCategory("");
    setSubcategorySelected("");
    setCategoryText("");
    setSubcategoryText("");
    setNote('');
    setQuantity(0);
    setUnit("Kg");
    setIdGlobal(idGlobal + 1)
    setValidate(false)
  }

  const units = ["Kg", "g", "Unidade", "Cx", "L", "mL", "Pacote",];

  const categories = 
  ["Bebidas","Carnes", "Frios", "Higiene", "Hortifruit","Laticínios", 
    "Limpeza", "Matinais", "Mercearia", "Padaria", "PetShop", "Utilidades_Domésticas",
    "Outros",];

  return (
  <div>
    <form onSubmit={ (e) => clickSubmit(e) }>
      <select onChange={(e) => handleCategory(e)} name="category">
        <option value="categoria">Categoria</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      {category === "Outros"  ? (
        <>
          <input value={categoryText} name="categoryOther" type="text" onChange={ (e) => handleChange(e)} placeholder='Categoria' required />
          <input value={subcategoryText} name="subcategoryOther" type="text" onChange={ (e) => handleChange(e)} placeholder='Subcategoria' required />
        </>
      ) : (
        <select name="subcategory" onChange={(e) => handleChange(e)}>
          <option>Subcategoria</option>
          {validate && subcategories.map((subcat) => (
            <option value={subcat}>{subcat}</option>
          ))}
      </select>
      )}
      {subcategorySelected === "Outros" && (
        <>
          <input value={subcategoryText} name="subcategoryOther" type="text" onChange={ (e) => handleChange(e)} placeholder='Subcategoria' required />
        </>
      )}
      <label> Quantidade
        <input value={quantity} name="quantity" type="number" onChange={ (e) => handleChange(e)} placeholder='Quantidade' required/>
      </label>
      <select name="unit" onChange={(e) => handleChange(e)}>
        {units.map((unidade) => (
          <option value={unidade}>{unidade}</option>
          ))}
      </select >
      <label>Observação
        <textarea rows={3} value={note} name="note" type="text" onChange={ (e) => handleChange(e)} />
      </label>
      <button type='submit'>Salvar </button>
    </form>
  </div>
  );
}
