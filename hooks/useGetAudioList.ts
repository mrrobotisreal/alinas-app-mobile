import { useEffect, useState, useContext } from "react";
import { BookContext } from "../context/BookContext";

type AudioObject = {
  id: string;
  uri: string;
  title: string;
};

const myExternalCauseAudioList: AudioObject[] = [
  {
    id: "myExternalCause.introduction",
    uri: "../assets/audio/000_introduction.m4a",
    title: "Introduction",
  },
  {
    id: "myExternalCause.anatomy_of_everything",
    uri: "../assets/audio/001_anatomy_of_everything.m4a",
    title: "The Anatomy of Everything",
  },
  {
    id: "myExternalCause.my_love",
    uri: "../assets/audio/002_my_love.m4a",
    title: "My Love",
  },
  {
    id: "myExternalCause.my_happiness",
    uri: "../assets/audio/003_my_happiness.m4a",
    title: "My Happiness",
  },
  {
    id: "myExternalCause.my_strength",
    uri: "../assets/audio/004_my_strength.m4a",
    title: "My Strength",
  },
  {
    id: "myExternalCause.my_inspiration_and_my_motivation",
    uri: "../assets/audio/005_my_inspiration_and_my_motivation.m4a",
    title: "My Inspiration and My Motivation",
  },
  {
    id: "myExternalCause.my_peace",
    uri: "../assets/audio/006_my_peace.m4a",
    title: "My Peace",
  },
  {
    id: "myExternalCause.my_home",
    uri: "../assets/audio/007_my_home.m4a",
    title: "My Home",
  },
  {
    id: "myExternalCause.where_are_they_going",
    uri: "../assets/audio/008_where_are_they_going_where_are_we_going.m4a",
    title: "Where are they going?\nWhere are WE going?",
  },
  {
    id: "myExternalCause.i_want_everything_with_you",
    uri: "../assets/audio/009_I_want_everything_with_you.m4a",
    title: "I want EVERYTHING with you",
  },
  {
    id: "myExternalCause.outro_part_1",
    uri: "../assets/audio/outro_part_1.m4a",
    title: "Особлива кінцівка, частина 1",
  },
  {
    id: "myExternalCause.outro_part_2",
    uri: "../assets/audio/outro_part_2.m4a",
    title: "Особлива кінцівка, частина 2",
  },
];

const theJudgeAudioList: AudioObject[] = [
  {
    id: "theJudge.title_page",
    uri: "",
    title: "Title Page",
  },
  {
    id: "theJudge.chapter1",
    uri: "",
    title: "Chapter 1: The judge and the auras",
  },
  {
    id: "theJudge.chapter2",
    uri: "",
    title: "Chapter 2: High profile cases",
  },
  {
    id: "theJudge.chapter3",
    uri: "",
    title: "Chapter 3: Publicity",
  },
];

export function useGetAudioList() {
  const { currentBook } = useContext(BookContext);
  const [audioList, setAudioList] = useState<AudioObject[]>(
    myExternalCauseAudioList
  );

  useEffect(() => {
    switch (currentBook) {
      case "My External Cause":
        setAudioList(myExternalCauseAudioList);
        break;
      case "The Judge":
        setAudioList(theJudgeAudioList);
        break;
      case "Passportal":
        // setAudioList(audioList);
        break;
      case "Love Drunk":
        // setAudioList(audioList);
        break;
    }
  }, [currentBook]);

  return {
    audioList,
  };
}
