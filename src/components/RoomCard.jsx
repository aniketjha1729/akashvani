import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { MdPeopleAlt } from "react-icons/md";

const RoomCard = ({ room }) => {
  const history = useHistory();
  return (
    <div onClick={() => history.push(`/room/${room.id}`)} className="cards">
      <div className="roomName">{room.topic}</div>
      <div className="speakerName">
        <Avatar alt="Remy Sharp" /> &nbsp; John Doe
      </div>
      <div className="participants">
        <MdPeopleAlt/>
      </div>
    </div>
  );
};

export default RoomCard;
