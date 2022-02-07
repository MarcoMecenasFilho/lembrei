import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import TodoList from "./pages/TodoList";


function App() {
  return (
    <BrowserRouter >
      <AppProvider>
        <Switch>
          <Route exact path="/" render={ () => <TodoList />} />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
