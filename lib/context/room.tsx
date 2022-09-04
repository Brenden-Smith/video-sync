import { DataSnapshot, getDatabase, onDisconnect, ref, set } from "firebase/database";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useObject } from "react-firebase-hooks/database";
import { getAuth } from "firebase/auth";

type Room = {
  id: string;
  player: YouTubePlayer | undefined;
  setPlayer: (player: YouTubePlayer) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  time: number;
  setTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: DataSnapshot | undefined;
};

export const RoomContext = createContext<Room>({} as Room);

export const RoomProvider = ({ children, id }: { children: ReactNode, id: string }) => {
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data] = useObject(ref(getDatabase(), `rooms/${id}`));

  // useEffect(() => {
  //   const userRef = ref(getDatabase(), `rooms/${id}/users/${getAuth().currentUser?.uid}`);
  //   set(userRef, {
  //     displayName: getAuth().currentUser?.displayName,
  //     photoURL: getAuth().currentUser?.photoURL,
  //     uid: getAuth().currentUser?.uid,
  //   });
  //   onDisconnect(userRef).remove();
  // }, [id]);

  return (
    <RoomContext.Provider
      value={{
        id,
        player,
        setPlayer,
        playing,
        setPlaying,
        time,
        setTime,
        duration,
        setDuration,
        visible,
        setVisible,
        data
      }}
    >
      {data && children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => useContext(RoomContext);

