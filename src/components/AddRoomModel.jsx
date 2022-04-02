import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createRoom as create } from "../api/index";
import { useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md";
import Button from "@material-ui/core/Button";

const AddRoomModel = ({ onClose }) => {
  const history = useHistory();
  const [topic, setTopic] = useState("");

  const createRoom = async () => {
    try {
      if (!topic) {
        return;
      }
      const { data } = await create({ topic });
      history.push(`/room/${data.id}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modalMask">
      <div className="modalBody">
        <div className="closeButton">
          <MdClose onClick={onClose} size="30px" />
        </div>
        <div className="modalHeader">
          <h3 className="heading">Enter the Name of The Room</h3>
          <TextField
            name="topic"
            label="Room Name"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="modalFooter">
          <h2>Create A New Room</h2>
          <Button onClick={createRoom} variant="contained" color="primary">
            Let's Go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
