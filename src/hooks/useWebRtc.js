import { useRef, useEffect, useCallback } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import { socketInit } from "../socket/index";
import { ACTIONS } from "../socketActions";

export const useWebRtc = (roomID, user) => {
  const [clients, setClients] = useStateWithCallBack([]);
  const audioElemets = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const addNewClients = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor === undefined) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    const startAudioCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };
    startAudioCapture().then(() => {
      addNewClients(user, () => {
        const localElement = audioElemets.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
        socket.current.emit(ACTIONS.JOIN, { roomID, user });
      });
    });
  }, []);

  useEffect(() => {
    const handleNewPeer = async({peerId,createOffer,user:remoteUser})=>{
      
    }
    socket.current.on(ACTIONS.ADD_PEER,handleNewPeer)
  }, [])
  

  const provideRef = (instance, userId) => {
    audioElemets.current[userId] = instance;
  };

  return { clients, provideRef };
};
