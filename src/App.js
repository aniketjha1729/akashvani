import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./app.scss";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { currentProfile } from "./api/index";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "./store/authSlice";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth === true && user != null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await currentProfile();
        dispatch(setAuth({ user: data.user }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
