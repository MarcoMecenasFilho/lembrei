import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import { InicialLocalStore } from '../services/localStorageFunctions'

export default function AppProvider({ children }) {

  const [actualList, setActualList ] = useState([]);
  const [idGlobal, setIdGlobal] = useState(0)
  const [checkboxList, setCheckboxList] = useState([])

  useEffect(() => {
    InicialLocalStore(setIdGlobal, setActualList, setCheckboxList);
  }, [])

  const context = {
    actualList,
    setActualList,
    idGlobal,
    setIdGlobal,
    checkboxList, 
    setCheckboxList
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
