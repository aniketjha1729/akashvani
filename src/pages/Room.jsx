import React from "react";
import { useParams } from "react-router-dom";
import { useWebRtc } from "../hooks/useWebRtc";
import { useSelector } from "react-redux";
const Room = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: roomID } = useParams();
  const { clients, provideRef } = useWebRtc(roomID, user);

  return (
    <div>
      <h1>All Connected Clinets</h1>
      {clients.map((client) => (
        <div key={client.id}>
          <audio
            ref={(instance) => provideRef(instance, client.id)}
            controls
            autoPlay
          ></audio>
          <h4>{client.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Room;
