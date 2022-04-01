import { useRef, useEffect, useCallback } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import { socketInit } from "../socket/index";
import { ACTIONS } from "../socketActions";
import freeice from "freeice";

export const useWebRtc = (roomID, user) => {
  const [clients, setClients] = useStateWithCallBack([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket = useRef(null);
  const clientRef = useRef([]);

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
      addNewClients({ ...user, muted: true }, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
        socket.current.emit(ACTIONS.JOIN, { roomID, user });
      });
    });

    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomID });
    };
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with ${peerId} (${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClients({ ...remoteUser, muted: true }, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();

        await connections.current[peerId].setLocalDescription(offer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });
    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  useEffect(() => {
    const handleRemoteSdp = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );
      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();
        connection.setLocalDescription(answer);
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };
    socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);
    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }
      delete connections.current[peerId];
      delete audioElements.current[peerId];
      setClients((list) => list.filter((client) => client.id !== userId));
    };
    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  useEffect(() => {
    clientRef.current = clients;
  }, [clients]);

  useEffect(() => {
    socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
      setMute(true, userId);
    });
    socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
      setMute(false, userId);
    });
    const setMute = (mute, userId) => {
      const clientIdx = clientRef.current
        .map((client) => client.id)
        .indexOf(userId);
      const connectedClient = JSON.parse(JSON.stringify(clientRef.current));
      if (clientIdx > -1) {
        connectedClient[clientIdx].muted = mute;
        setClients(connectedClient);
      }
    };
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  const handleMute = (isMute, userId) => {
    let settled = false;
    let interval = setInterval(() => {
      if (localMediaStream.current) {
        console.log(isMute);
        localMediaStream.current.getTracks()[0].enabled = !isMute;
        if (isMute) {
          socket.current.emit(ACTIONS.MUTE, {
            roomID,
            userId,
          });
        } else {
          socket.current.emit(ACTIONS.UNMUTE, {
            roomID,
            userId,
          });
        }
        settled = true;
      }
      if (settled) {
        clearInterval(interval);
      }
    }, 200);
  };

  return { clients, provideRef, handleMute };
};
