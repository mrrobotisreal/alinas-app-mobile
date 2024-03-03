import { serverURL } from "../constants/urls";
import { useContext, useState, useEffect, useMemo } from "react";

export interface VideoObject {
  id: string;
  title: string;
  index: number;
  videoId: string;
}

export interface PlaylistObject {
  id: string;
  title: string;
  index: number;
  videos: VideoObject[];
}

interface UseGetPlaylistsReturns {
  playlists: PlaylistObject[];
}

export default function useGetPlaylists(): UseGetPlaylistsReturns {
  const playlists: PlaylistObject[] = useMemo(
    () => [
      {
        id: "theJudgeTextsList.main_title",
        title: "The Judge",
        index: 0,
        videos: [
          {
            id: "theJudgeTextsList.chapter_1_title",
            title: "Chapter 1: The judge and the auras",
            index: 0,
            videoId: "BONaNWF1-dc",
          },
          {
            id: "theJudgeTextsList.chapter_2_title",
            title: "Chapter 2: High profile cases",
            index: 1,
            videoId: "PCY62WQK_T8",
          },
        ],
      },
      {
        id: "playlists.forYouAlina",
        title: "For You Alina ❤️",
        index: 1,
        videos: [
          {
            id: "playlists.forYouAlina.videos.forYouAlina",
            title: "For You Alina ❤️",
            index: 0,
            videoId: "DAD9NQIbCaE",
          },
        ],
      },
    ],
    []
  );

  return { playlists };
}
