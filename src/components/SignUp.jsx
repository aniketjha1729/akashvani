import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signUp } from "../api/index";
import { MdLock } from "react-icons/md";
import BackImg from "../static/back.svg";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "test@1234",
  });
  const history = useHistory();
  const { name, email, password } = signUpFormData;

  const onHandleChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await signUp({
      name,
      email,
      password,
    });
    history.push(`/login`);
  };

  return (
    <div className="formPage">
      <div className="formLeft">
        <img src={BackImg} alt="" />
      </div>
      <div className="formRight">
        <div className="formContainer">
          <div className="formHeading">
            <MdLock />
            Sign Up
          </div>
          <form onSubmit={onSubmit}>
            <div className="fieldWrapper">
              <TextField
                name="name"
                value={name}
                label="Name"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                onChange={onHandleChange}
              />
            </div>
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
                value={password}
                label="Password"
                type="password"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                onChange={onHandleChange}
              />
            </div>
            <div className="fieldWrapper">
              <Button variant="contained" color="primary" type="submit">
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
