import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextField from "@material-ui/core/TextField";
import { createRoom as create } from "../api/index";
import { useHistory } from "react-router-dom";
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
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextField
            name="topic"
            label="Topic"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
