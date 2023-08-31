export type TextObjectType =
  | "main_title"
  | "main_subtitle"
  | "author"
  | "section_title"
  | "chapter_title"
  | "chapter_content";

export type TextListObject = {
  title: string;
  index: number;
  components: TextObject[];
};

export type TextObject = {
  id: string;
  type: TextObjectType;
  title: string;
  imageUri?: string[];
};

const textsList: TextListObject[] = [
  {
    title: "Introduction",
    index: 0,
    components: [
      {
        id: "textsList.main_title",
        type: "main_title",
        title: "main_title",
      },
      {
        id: "textsList.main_subtitle",
        type: "main_subtitle",
        title: "main_subtitle",
      },
      {
        id: "textsList.written_by",
        type: "author",
        title: "written_by",
      },
      {
        id: "textsList.starring",
        type: "author",
        title: "starring",
      },
      {
        id: "textsList.introduction",
        type: "chapter_content",
        title: "introduction",
      },
    ],
  },
  {
    title: "The Anatomy of Everything",
    index: 1,
    components: [
      {
        id: "textsList.the_anatomy_of_everything_title",
        type: "section_title",
        title: "the_anatomy_of_everything_title",
      },
      {
        id: "textsList.the_anatomy_of_everything_content",
        type: "chapter_content",
        title: "the_anatomy_of_everything_content",
      },
    ],
  },
  {
    title: "My Love",
    index: 2,
    components: [
      {
        id: "textsList.you_are_my_everything_title",
        type: "section_title",
        title: "you_are_my_everything_title",
      },
      {
        id: "textsList.my_love_title",
        type: "chapter_title",
        title: "my_love_title",
      },
      {
        id: "textsList.my_love_content",
        type: "chapter_content",
        title: "my_love_content",
        imageUri: [
          "../assets/images/my_love/ruby.png",
          "../assets/images/my_love/rose.png",
        ],
      },
    ],
  },
  {
    title: "My Happiness",
    index: 3,
    components: [
      {
        id: "textsList.my_happiness_title",
        type: "chapter_title",
        title: "my_happiness_title",
      },
      {
        id: "textsList.my_happiness_content",
        type: "chapter_content",
        title: "my_happiness_content",
        imageUri: ["../assets/images/my_happiness/alina_and_i_prague.png"],
      },
    ],
  },
  {
    title: "My Strength",
    index: 4,
    components: [
      {
        id: "textsList.my_strength_title",
        type: "chapter_title",
        title: "my_strength_title",
      },
      {
        id: "textsList.my_strength_content",
        type: "chapter_content",
        title: "my_strength_content",
        imageUri: [
          "../assets/images/my_strength/steel_wire.png",
          "../assets/images/my_strength/compass.png",
        ],
      },
    ],
  },
  {
    title: "My Inspiration and My Motivation",
    index: 5,
    components: [
      {
        id: "textsList.my_inspiration_and_my_motivation_title",
        type: "chapter_title",
        title: "my_inspiration_and_my_motivation_title",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content",
        imageUri: [
          "..assets/images/my_inspiration_and_my_motivation/lightbulb.png",
          "..assets/images/my_inspiration_and_my_motivation/sun.png",
          "..assets/images/my_inspiration_and_my_motivation/sun_lightbulb.png",
        ],
      },
    ],
  },
  {
    title: "My Peace",
    index: 6,
    components: [
      {
        id: "textsList.my_peace_title",
        type: "chapter_title",
        title: "my_peace_title",
      },
      {
        id: "textsList.my_peace_content",
        type: "chapter_content",
        title: "my_peace_content",
        imageUri: [
          "..assets/images/my_peace/ripple.png",
          "..assets/images/my_peace/wave.png",
          "..assets/images/my_peace/sunset.png",
          "..assets/images/my_peace/storm.png",
          "..assets/images/my_peace/galaxy.png",
        ],
      },
    ],
  },
  {
    title: "My Home",
    index: 7,
    components: [
      {
        id: "textsList.my_home_title",
        type: "chapter_title",
        title: "my_home_title",
      },
      {
        id: "textsList.my_home_content",
        type: "chapter_content",
        title: "my_home_content",
        imageUri: [
          "..assets/images/my_home/alina.png",
          "..assets/images/my_home/pajamas.png",
          "..assets/images/my_home/pictures.png",
          "..assets/images/my_home/portal.png",
          "..assets/images/my_home/river.png",
        ],
      },
    ],
  },
  {
    title: "Where are they going?\nWhere are WE going?",
    index: 8,
    components: [
      {
        id: "textsList.where_are_they_going_title",
        type: "section_title",
        title: "where_are_they_going_title",
      },
      {
        id: "textsList.where_are_they_going_content",
        type: "chapter_content",
        title: "where_are_they_going_content",
        imageUri: [
          "..assets/images/where_are_they_going/where_are_they_going.png",
        ],
      },
    ],
  },
  {
    title: "I want EVERYTHING with you",
    index: 9,
    components: [
      {
        id: "textsList.i_want_everything_with_you_title",
        type: "section_title",
        title: "i_want_everything_with_you_title",
      },
      {
        id: "textsList.i_want_everything_with_you_content",
        type: "chapter_content",
        title: "i_want_everything_with_you_content",
      },
      {
        id: "textsList.the_end",
        type: "main_title",
        title: "the_end",
      },
      {
        id: "textsList.no_way",
        type: "main_subtitle",
        title: "no_way",
      },
      {
        id: "textsList.to_be_continued",
        type: "main_title",
        title: "to_be_continued",
      },
    ],
  },
  {
    title: "Особлива кінцівка, частина 1",
    index: 10,
    components: [
      {
        id: "textsList.outro_part_1",
        type: "chapter_content",
        title: "Особлива кінцівка, частина 1",
      },
    ],
  },
  {
    title: "Особлива кінцівка, частина 2",
    index: 11,
    components: [
      {
        id: "textsList.outro_part_2",
        type: "chapter_content",
        title: "Особлива кінцівка, частина 2",
      },
    ],
  },
];

export function useGetTexts() {
  return {
    textsList,
  };
}