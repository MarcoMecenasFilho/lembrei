import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {

  const [actualList, setActualList ] = useState([]);
  const [idGlobal, setIdGlobal] = useState(0)

  const context = {
    actualList,
    setActualList,
    idGlobal,
    setIdGlobal
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
