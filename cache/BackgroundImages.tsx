import { createContext, useState, useEffect, ReactNode } from "react";
import { serverURL } from "../constants/urls";
import { Image } from "expo-image";

interface BackgroundImagesCacheState {
  backgroundImagesList: string[];
}

const initialState: BackgroundImagesCacheState = {
  backgroundImagesList: [],
};

export const BackgroundImagesCache =
  createContext<BackgroundImagesCacheState>(initialState);

async function preloadImages(
  setBookImagesList: React.Dispatch<React.SetStateAction<string[]>>
) {
  const uris: string[] = [];
  ["beach", "coral", "mint", "rose", "sun", "purple", "ocean"].forEach(
    (theme) => {
      uris.push(
        `${serverURL}/assets/backgrounds/photos_viewer_${theme}.png`,
        `${serverURL}/assets/backgrounds/hummingbird_reader_${theme}.png`,
        `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_${theme}.png`,
        `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_${theme}.png`,
        `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_${theme}.png`
      );
    }
  );
  let loadedImages: string[] = [];

  console.log("preloading background images...");
  await Promise.all(
    uris.map(async (uri) => {
      console.log("preloading background image:", uri);
      await Image.prefetch(uri);
      loadedImages.push(uri);
    })
  );
  console.log("finished preloading background images");

  setBookImagesList(loadedImages);
}

export default function BackgroundImagesCacheProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [backgroundImagesList, setBackgroundImagesList] = useState<string[]>(
    []
  );

  useEffect(() => {
    console.log("BackgroundImagesCacheProvider mounted");
    preloadImages(setBackgroundImagesList);
    return () => console.log("BackgroundImagesCacheProvider unmounted");
  }, []);

  return (
    <BackgroundImagesCache.Provider
      value={{
        backgroundImagesList,
      }}
    >
      {children}
    </BackgroundImagesCache.Provider>
  );
}
