import React from "react";
import { useSelector } from "react-redux";
import { currentProfile } from "../api/index";
const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const getCurrentProfile = async () => {
    const { data } = await currentProfile();
    console.log(data);
  };
  return (
    <div>
      Home
      <button onClick={getCurrentProfile}>Get Data</button>
    </div>
  );
};

export default Home;
