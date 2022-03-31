import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/login">SignIn</Link>
      <Link to="/register">SignUp</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;
