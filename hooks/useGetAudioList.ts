type AudioObject = {
  id: string;
  uri: string;
  title: string;
};

const audioList: AudioObject[] = [
  {
    id: "introduction",
    uri: "../assets/audio/000_introduction.m4a",
    title: "Introduction",
  },
  {
    id: "anatomy_of_everything",
    uri: "../assets/audio/001_anatomy_of_everything.m4a",
    title: "The Anatomy of Everything",
  },
  {
    id: "my_love",
    uri: "../assets/audio/002_my_love.m4a",
    title: "My Love",
  },
  {
    id: "my_happiness",
    uri: "../assets/audio/003_my_happiness.m4a",
    title: "My Happiness",
  },
  {
    id: "my_strength",
    uri: "../assets/audio/004_my_strength.m4a",
    title: "My Strength",
  },
  {
    id: "my_inspiration_and_my_motivation",
    uri: "../assets/audio/005_my_inspiration_and_my_motivation.m4a",
    title: "My Inspiration and My Motivation",
  },
  {
    id: "my_peace",
    uri: "../assets/audio/006_my_peace.m4a",
    title: "My Peace",
  },
  {
    id: "my_home",
    uri: "../assets/audio/007_my_home.m4a",
    title: "My Home",
  },
  {
    id: "where_are_they_going",
    uri: "../assets/audio/008_where_are_they_going_where_are_we_going.m4a",
    title: "Where are they going?\nWhere are WE going?",
  },
  {
    id: "i_want_everything_with_you",
    uri: "../assets/audio/009_I_want_everything_with_you.m4a",
    title: "I want EVERYTHING with you",
  },
  {
    id: "outro_part_1",
    uri: "../assets/audio/outro_part_1.m4a",
    title: "Особлива кінцівка, частина 1",
  },
  {
    id: "outro_part_2",
    uri: "../assets/audio/outro_part_2.m4a",
    title: "Особлива кінцівка, частина 2",
  },
];

export function useGetAudioList() {
  return {
    audioList,
  };
}
