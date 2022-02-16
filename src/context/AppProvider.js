import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import { InicialLocalStore } from '../services/localStorageFunctions'

export default function AppProvider({ children }) {

  const [actualList, setActualList ] = useState([]);
  const [idGlobal, setIdGlobal] = useState(0)
  const [checkboxList, setCheckboxList] = useState([])
  const [addProduct, setAddProduct] = useState(true)

  useEffect(() => {
    InicialLocalStore(setIdGlobal, setActualList, setCheckboxList);
    setAddProduct(false);
  }, [])

  const context = {
    actualList,
    setActualList,
    idGlobal,
    setIdGlobal,
    checkboxList, 
    setCheckboxList,
    addProduct, 
    setAddProduct
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};
