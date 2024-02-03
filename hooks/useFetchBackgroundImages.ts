import { useContext } from "react";
import { ThemeContext, ThemeType } from "../context/ThemeContext";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { serverURL } from "../constants/urls";
import {
  // backgroundImage_listen,
  // backgroundImage_notes,
  // backgroundImage_photos,
  // backgroundImage_reader,
  // backgroundImage_settings,
  // book_LoveDrunk,
  // book_MyExternalCause,
  // book_Passportal,
  allBackgrounds,
  Theme,
} from "../constants/assetPaths";

export interface UseFetchBackgroundImagesReturns {
  query: UseQueryResult;
  hasError: boolean;
  error: Error | null;
}

interface BackgroundImage {
  title: string;
  img: Blob;
}

async function fetchBackgroundImages(
  theme: ThemeType
): Promise<BackgroundImage[]> {
  const allPromises = Promise.all(
    allBackgrounds.map(async (background: Theme) => {
      const response = await fetch(`${serverURL}${background[theme]}`);
      const blob = await response.blob();
      return {
        title: background.title,
        img: blob,
      };
    })
  );

  return allPromises;
}

export default function useFetchBackgroundImages(): UseFetchBackgroundImagesReturns {
  const { currentTheme } = useContext(ThemeContext);

  const query = useQuery({
    queryKey: ["fetchBackgroundImages"],
    queryFn: () => fetchBackgroundImages(currentTheme),
  });

  const hasError = query.isError;
  const error = query.error;

  return {
    query,
    hasError,
    error,
  };
}
