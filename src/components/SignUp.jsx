import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signUp } from "../api/index";
const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    name: "test1",
    email: "test1@gmial.com",
    password: "test@1234",
  });

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
    console.log(data);
  };

  return (
    <div className="signupform">
      <form onSubmit={onSubmit}>
        <div>
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
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
