import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signIn } from "../api/index";
import { setAuth } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  const [signInFormData, setSignInFormData] = useState({
    email: "aniket@gmail.com",
    password: "test@1234",
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
    console.log(data);
  };

  if (isAuth === true && user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signupform">
      <form onSubmit={onSubmit}>
        <div>
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
        <div>
          <TextField
            name="password"
            value={password}
            label="Password"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            onChange={onHandleChange}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
