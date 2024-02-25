import {
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  myExternalCause_book_images,
  theJudge_book_images,
  passportal_book_images,
  loveDrunk_book_images,
} from "../constants/assetPaths";
import { Image } from "expo-image";

interface BookImagesCacheState {
  loadBookImages: (
    book: string,
    setBookImagesAreLoading: Dispatch<SetStateAction<boolean>>,
    updateBookImagesAreLoading: (isLoading: boolean) => void
  ) => void;
}

async function preloadImages(
  uris: string[],
  updateBookImagesAreLoading: (isLoading: boolean) => void
) {
  console.log("preloading book images...");
  await Promise.all(
    uris.map(async (uri) => {
      console.log("preloading book image:", uri);
      await Image.prefetch(uri);
    })
  );
  console.log("finished preloading book images");
  updateBookImagesAreLoading(false);
}

function loadBookImages(
  book: string,
  setBookImagesAreLoading: Dispatch<SetStateAction<boolean>>,
  updateBookImagesAreLoading: (isLoading: boolean) => void
) {
  switch (book) {
    case "My External Cause":
      console.log("loading My External Cause book images...");
      setBookImagesAreLoading(true);
      preloadImages(myExternalCause_book_images, updateBookImagesAreLoading);
      break;
    case "The Judge":
      console.log("loading The Judge book images...");
      setBookImagesAreLoading(true);
      preloadImages(theJudge_book_images, updateBookImagesAreLoading);
      break;
    case "Passportal":
      console.log("loading Passportal book images...");
      setBookImagesAreLoading(true);
      preloadImages(passportal_book_images, updateBookImagesAreLoading);
      break;
    case "Love Drunk":
      console.log("loading Love Drunk book images...");
      setBookImagesAreLoading(true);
      preloadImages(loveDrunk_book_images, updateBookImagesAreLoading);
      break;
    default:
      setBookImagesAreLoading(true);
      preloadImages([], updateBookImagesAreLoading);
  }
}

const initialState: BookImagesCacheState = {
  loadBookImages,
};

export const BookImagesCache =
  createContext<BookImagesCacheState>(initialState);

export default function BookImagesCacheProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    console.log("BookImagesCacheProvider mounted");
    return () => console.log("BookImagesCacheProvider unmounted");
  }, []);

  return (
    <BookImagesCache.Provider
      value={{
        loadBookImages,
      }}
    >
      {children}
    </BookImagesCache.Provider>
  );
}
