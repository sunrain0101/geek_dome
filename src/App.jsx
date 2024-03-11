import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import AuthRoute from "./components/AuthRoute";
import { customHistory } from "./utils";
function App() {
  return (
    <Router history={customHistory}>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/home" component={Layout}></AuthRoute>
          <Redirect path="/" to="/home"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
