import React from "react";
import { Route, Switch } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import TodoList from "./pages/TodoList";



function App() {
  return (
      <AppProvider>
        <Switch>
          <Route exact path="/" render={ () => <TodoList />} />
        </Switch>
      </AppProvider>
  );
}

export default App;
