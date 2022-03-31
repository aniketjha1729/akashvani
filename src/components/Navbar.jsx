import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/signin">SignIn</Link>
      <Link to="/">SignUp</Link>
    </div>
  );
};

export default Navbar;
