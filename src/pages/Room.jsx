import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWebRtc } from "../hooks/useWebRtc";
import { useSelector } from "react-redux";
import { getRoomById } from "../api/index";
const Room = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: roomId } = useParams();
  const { clients, provideRef, handleMute } = useWebRtc(roomId, user);
  const [room, setRoom] = useState();
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  useEffect(() => {
    const getRoom = async () => {
      const { data } = await getRoomById(roomId);
      setRoom(data);
    };
    getRoom();
  }, [roomId]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) return;
    setIsMute((prev) => !prev);
  };

  return (
    <div>
      <h1>All Connected Clinets</h1>
      {room?.topic}
      {clients.map((client) => (
        <div key={client.id}>
          <audio
            ref={(instance) => {
              provideRef(instance, client.id);
            }}
            controls
            autoPlay
          ></audio>
          <h4>{client.name}</h4>
          <button onClick={() => handleMuteClick(client.id)}>
            Mute/UnMute
          </button>
          {client.muted ? <div> UnMute</div> : <div>Mute</div>}
        </div>
      ))}
    </div>
  );
};

export default Room;
