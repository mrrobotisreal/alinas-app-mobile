import { ReactNode, createContext, useEffect, useState } from "react";
import { emulatorURL, serverURL } from "../constants/urls";
import axios from "axios";

export interface Album {
  id: string;
  index: number;
  title: string;
}
export type PhotosStateContext = {
  albums: Album[];
  fetchAlbumLength: (
    albumId: string,
    setAlbumLength: (length: number) => void
  ) => void;
};
export type PhotosContextProps = {
  children?: ReactNode;
};

const fetchAlbumLength = async (
  albumId: string,
  setAlbumLength: (length: number) => void
) => {
  console.log("fetching album length for:", albumId);
  axios
    .post(`${serverURL}/getAlbumLength`, {
      albumId: albumId,
    })
    .then(({ data }) => {
      console.log("incoming album length:", data);
      const length = String(data);

      setAlbumLength(data);
    })
    .catch((err) => console.error(err));
};

const initialState: PhotosStateContext = {
  albums: [
    {
      id: "portugal",
      index: 0,
      title: "Portugal\n(with my love ❤️)",
    },
    {
      id: "portugalPhotoshoot",
      index: 1,
      title: "📸 Portugal Photoshoot with My Love ❤️",
    },
    {
      id: "austria",
      index: 2,
      title: "Austria\n(with my love ❤️)",
    },
    {
      id: "paris",
      index: 3,
      title: "Paris\n(❤️🗽 with my love 🗼🎄)",
    },
  ],
  fetchAlbumLength,
};

export const PhotosContext = createContext(initialState);

export function PhotosContextProvider({ children }: PhotosContextProps) {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    setAlbums(initialState.albums);
  }, []);

  // const fetchPhoto = async (path: string) => {
  //   const res = await axios.get(`${emulatorURL}/assets/${path}`);
  //   console.log("res:", res);
  // };

  return (
    <PhotosContext.Provider value={{ albums, fetchAlbumLength }}>
      {children}
    </PhotosContext.Provider>
  );
}
