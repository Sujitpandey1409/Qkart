import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
import ipConfig from "./ipConfig.json";
import ThemeProvider from "./theme.js";

export const config = {
  // endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
  endpoint: `${ipConfig.workspaceIp}/api/v1`,
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/thanks" component={Thanks} />
          <Route path="/" component={Products} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
