import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./app.scss";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const isAuth = false;
const authToken = "abc";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth == true && authToken != null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
