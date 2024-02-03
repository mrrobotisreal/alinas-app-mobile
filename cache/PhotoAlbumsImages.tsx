import {
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  austriaAlbum,
  parisAlbum,
  portugalAlbum,
  portugalPhotoshootAlbum,
} from "../constants/assetPaths";
import { Image } from "expo-image";

interface PhotoAlbumsImagesCacheState {
  loadAlbumImages: (
    album: string,
    setAlbumIsLoading: Dispatch<SetStateAction<boolean>>,
    updateAlbumIsLoading: (isLoading: boolean) => void
  ) => void;
}

async function preloadImages(
  uris: string[],
  updateAlbumIsLoading: (isLoading: boolean) => void
) {
  console.log("preloading photo albums images...");
  await Promise.all(
    uris.map(async (uri) => {
      console.log("preloading photo albums image:", uri);
      await Image.prefetch(uri);
    })
  );
  console.log("finished preloading photo albums images");
  updateAlbumIsLoading(false);
}

function loadAlbumImages(
  album: string,
  setAlbumIsLoading: Dispatch<SetStateAction<boolean>>,
  updateAlbumIsLoading: (isLoading: boolean) => void
) {
  switch (album) {
    case "austria":
      console.log("loading austria album images...");
      setAlbumIsLoading(true);
      preloadImages(austriaAlbum, updateAlbumIsLoading);
      break;
    case "paris":
      console.log("loading paris album images...");
      setAlbumIsLoading(true);
      preloadImages(parisAlbum, updateAlbumIsLoading);
      break;
    case "portugal":
      console.log("loading portugal album images...");
      setAlbumIsLoading(true);
      preloadImages(portugalAlbum, updateAlbumIsLoading);
      break;
    case "portugal_photoshoot":
      console.log("loading portugal photoshoot album images...");
      setAlbumIsLoading(true);
      preloadImages(portugalPhotoshootAlbum, updateAlbumIsLoading);
      break;
    default:
      setAlbumIsLoading(true);
      preloadImages([], updateAlbumIsLoading);
  }
}

const initialState: PhotoAlbumsImagesCacheState = {
  loadAlbumImages,
};

export const PhotoAlbumsImagesCache =
  createContext<PhotoAlbumsImagesCacheState>(initialState);

export default function PhotoAlbumsImagesCacheProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    console.log("PhotoAlbumsImagesCacheProvider mounted");
    return () => console.log("PhotoAlbumsImagesCacheProvider unmounted");
  }, []);

  return (
    <PhotoAlbumsImagesCache.Provider value={{ loadAlbumImages }}>
      {children}
    </PhotoAlbumsImagesCache.Provider>
  );
}
