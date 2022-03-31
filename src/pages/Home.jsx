import React from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      Welcome
      {user?.name}
    </div>
  );
};

export default Home;
