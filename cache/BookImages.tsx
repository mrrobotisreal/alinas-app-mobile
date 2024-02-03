import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Image } from "expo-image";
import { serverURL } from "../constants/urls";
import { ThemeContext, ThemeType } from "../context/ThemeContext";

interface BookImagesCacheState {
  MyExternalCause: ReactNode;
  LoveDrunk: ReactNode;
  Passportal: ReactNode;
  TheJudge?: ReactNode;
  bookImagesList: string[];
  imagesObj?: { [key: string]: string };
}

const preInitialState: BookImagesCacheState = {
  MyExternalCause: (
    <Image
      source={{
        uri: `${serverURL}/assets/backgrounds/my_external_cause_front_cover_purple.png`,
      }}
    />
  ),
  LoveDrunk: (
    <Image
      source={{
        uri: `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_purple.png`,
      }}
    />
  ),
  Passportal: (
    <Image
      source={{
        uri: `${serverURL}/assets/backgrounds/Passportal_front_cover_purple.png`,
      }}
    />
  ),
  bookImagesList: [],
};

const initialState: BookImagesCacheState = {
  // MyExternalCause: Image,
  // LoveDrunk: (
  //   <Image
  //     source={{
  //       uri: `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_purple.png`,
  //     }}
  //   />
  // ),
  // Passportal: (
  //   <Image
  //     source={{
  //       uri: `${serverURL}/assets/backgrounds/Passportal_front_cover_purple.png`,
  //     }}
  //   />
  // ),
  ...preInitialState,
  bookImagesList: [
    // preInitialState.MyExternalCause,
    // preInitialState.LoveDrunk,
    // preInitialState.Passportal,
  ],
};

export const BookImagesCache =
  createContext<BookImagesCacheState>(initialState);

async function preloadImages(
  setBookImagesList: React.Dispatch<React.SetStateAction<string[]>>,
  _theme: ThemeType
) {
  const uris: string[] = [];
  ["beach", "coral", "mint", "rose", "sun", "purple", "ocean"].forEach(
    (theme) => {
      uris.push(
        `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${theme}.png`,
        `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_${theme}.png`,
        `${serverURL}/assets/backgrounds/Passportal_front_cover_${theme}.png`
      );
    }
  );
  let loadedImages: string[] = [];

  console.log("preloading images...");
  await Promise.all(
    uris.map(async (uri) => {
      // console.log("preloading image:", uri);
      await Image.prefetch(uri);
      loadedImages.push(uri);
    })
  );
  console.log("finished preloading images");

  setBookImagesList(loadedImages);
}

export default function BookImagesCacheProvider({
  children,
}: {
  children: ReactNode;
}) {
  /**
   * State
   */
  const { currentTheme } = useContext(ThemeContext);
  const [MyExternalCause, setMyExternalCause] = useState<ReactNode>(
    initialState.MyExternalCause
  );
  const [LoveDrunk, setLoveDrunk] = useState<ReactNode>(initialState.LoveDrunk);
  const [Passportal, setPassportal] = useState<ReactNode>(
    initialState.Passportal
  );
  const [TheJudge, setTheJudge] = useState<ReactNode>(
    initialState.TheJudge || null
  );
  const [bookImagesList, setBookImagesList] = useState<string[]>([]);
  const [imagesObj, setImagesObj] = useState<{ [key: string]: string }>({});

  /**
   * Effects
   */
  useEffect(() => {
    console.log("BookImagesCacheProvider mounted");
    preloadImages(setBookImagesList, currentTheme);
    return () => console.log("BookImagesCacheProvider unmounted");
  }, []);

  useEffect(() => {
    // preloadImages(setBookImagesList, currentTheme);
    const newMyExternalCause: ReactNode = (
      <Image
        source={{
          uri: `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`,
        }}
      />
    );
    const newLoveDrunk: ReactNode = (
      <Image
        source={{
          uri: `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_${currentTheme}.png`,
        }}
      />
    );
    const newPassportal: ReactNode = (
      <Image
        source={{
          uri: `${serverURL}/assets/backgrounds/Passportal_front_cover_${currentTheme}.png`,
        }}
      />
    );
    // const newTheJudge: ReactNode = (
    //   <Image
    //   source={{
    //     uri: `${serverURL}/assets/backgrounds/The_Judge_front_cover_${currentTheme}.png`,
    //   }}/>
    // );
    setMyExternalCause(newMyExternalCause);
    setLoveDrunk(newLoveDrunk);
    setPassportal(newPassportal);
    // setTheJudge(<Image source={{ uri: `${serverURL}/assets/backgrounds/The_Judge_front_cover_${currentTheme}.png` }} />);
    // setBookImagesList([newMyExternalCause, newLoveDrunk, newPassportal]);
  }, [currentTheme]);

  useEffect(() => {
    const newImagesObj: { [key: string]: string } = {
      ...imagesObj,
    };

    bookImagesList.forEach((bookImage) => {
      if (bookImage?.toString().includes("my_external_cause")) {
        newImagesObj[bookImage] = bookImage;
      } else if (bookImage?.toString().includes("Love_Drunk")) {
        newImagesObj[bookImage] = bookImage;
      } else if (bookImage?.toString().includes("Passportal")) {
        newImagesObj[bookImage] = bookImage;
      } else {
        newImagesObj[bookImage] = bookImage;
      }
    });

    setImagesObj(newImagesObj);
  }, [bookImagesList]);

  return (
    <BookImagesCache.Provider
      value={{
        MyExternalCause,
        LoveDrunk,
        Passportal,
        TheJudge,
        bookImagesList,
        imagesObj,
      }}
    >
      {children}
    </BookImagesCache.Provider>
  );
}
