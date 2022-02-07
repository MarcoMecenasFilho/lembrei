import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import subcategoryFunction from '../services/subcategoryFunction';


export default function Header() {
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState([])
  const [name, setName] = useState('')
  const [brand, setBrand]   = useState('');
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState("Kg");
  const {actualList, setActualList } = useContext(AppContext);
  const [validate, setValidate] =useState(false);

  function handleChange({ target }) {
    if(target.name === "name") {
      setName(target.value)
    }
    if(target.name === "quantity") {
      setQuantity(target.value)
    }
    if(target.name === "brand") {
      setBrand(target.value)
    }
    if( target.name === "unit")  {
      setUnit(target.value)
    }
  }

  function handleCategory({target}) {
    setCategory(target.value);
    setSubcategory(subcategoryFunction(target.value))
    setValidate(true)
  }

  function clickSubmit(e) {
    e.preventDefault()
    setActualList(
      [...actualList,
        {
          category,
          name,
          brand,
          quantity,
          unit,
        }
      ]
    )
    setName('')
    setBrand('')
    setQuantity(0)
    setUnit("Kg")
  }
  const units = ["Kg", "g", "Unidade", "Cx", "L", "mL"];

  const categories = ["Bebidas","Carnes", "Frios", "Higiene", "Hortifruit","Laticínios", 
                    "Limpeza", "Matinais", "Mercearia", "Padaria", "PetShop", "Utilidades_Domésticas",
                    "Outros",];

  return (
  <div>
    <form onSubmit={ (e) => clickSubmit(e) }>
      <select onChange={(e) => handleCategory(e)} name="category">
        <option value="">Categoria</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <select>
        <option>subcategory</option>
        {validate && subcategory.map((subcat) => (
          <option value={subcat}>{subcat}</option>
        ))}
      </select>
      <input value={name} name="name" type="text" onChange={ (e) => handleChange(e)} placeholder='Produto' required />
      <input value={brand} name="brand" type="text" onChange={ (e) => handleChange(e)}  placeholder='Marca' required />
      <input value={quantity} name="quantity" type="number" onChange={ (e) => handleChange(e)} placeholder='Quantidade' required/>
      <select name="unit" onChange={(e) => handleChange(e)}>
        {units.map((unidade) => (
          <option value={unidade}>{unidade}</option>
        ))}
      </select>
      <button type='submit'>Salver </button>
    </form>
  </div>
  );
}
