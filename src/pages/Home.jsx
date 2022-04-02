import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddRoomModel from "../components/AddRoomModel";
import RoomCard from "../components/RoomCard";
import { getAllRooms } from "../api/index";

const Home = () => {
  const [showModel, setShowModel] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
      console.log(data);
    };
    getRooms();
  }, []);

  const onToggleModel = () => {
    setShowModel(!showModel);
  };

  return (
    <div className="home">
      <Button onClick={onToggleModel} variant="contained" color="primary">
        Start Room
      </Button>
      <div className="roomContainer">
        {rooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
      {showModel ? <AddRoomModel onClose={onToggleModel} /> : ""}
    </div>
  );
};

export default Home;
