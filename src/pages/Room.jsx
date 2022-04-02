import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import { MdMic } from "react-icons/md";
import { MdMicOff } from "react-icons/md";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { useWebRtc } from "../hooks/useWebRtc";
import { useSelector } from "react-redux";
import { getRoomById } from "../api/index";

const useStyles = makeStyles((theme) => ({
  mic: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: "#ffffff",
  },
  person: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  micContainer: {
    cursor: "pointer",
    width: theme.spacing(4),
    height: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#BDBDBD",
  },
}));

const Room = () => {
  const classes = useStyles();
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
    <div className="room">
      <Typography variant="h3">Participants</Typography>
      <Typography variant="h5"> {room?.topic}</Typography>
      <div className="peopleContainer">
        {clients.map((client) => (
          <div key={client.id}>
            <audio
              ref={(instance) => {
                provideRef(instance, client.id);
              }}
              autoPlay
            ></audio>
            <div>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div
                    className={classes.micContainer}
                    onClick={() => handleMuteClick(client.id)}
                  >
                    {client.muted ? (
                      <MdMicOff className={classes.mic} />
                    ) : (
                      <MdMic className={classes.mic} />
                    )}
                  </div>
                }
              >
                <Avatar className={classes.person} />
              </Badge>
              <div className="clientName">
                <Typography variant="body1">{client.name}</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
