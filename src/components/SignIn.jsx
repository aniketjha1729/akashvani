import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signIn } from "../api/index";
import { MdLock } from "react-icons/md";
import { setAuth } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import BackImg from "../static/back.svg";

const SignIn = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signInFormData;

  const onHandleChange = (e) => {
    setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await signIn({
      email,
      password,
    });
    dispatch(setAuth({ user: data.user }));
  };

  if (isAuth === true && user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="formPage">
      <div className="formLeft">
        <img src={BackImg} alt="" />
      </div>
      <div className="formRight">
        <div className="formContainer">
          <div className="formHeading">
            <MdLock />Login
          </div>
          <form onSubmit={onSubmit}>
            <div className="fieldWrapper">
              <TextField
                name="email"
                value={email}
                label="Email"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                onChange={onHandleChange}
              />
            </div>
            <div className="fieldWrapper">
              <TextField
                name="password"
                type="password"
                value={password}
                label="Password"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                onChange={onHandleChange}
              />
            </div>
            <div className="fieldWrapper">
              <Button variant="contained" color="primary" type="submit">
                SignIn
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
