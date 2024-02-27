import { serverURL } from "../constants/urls";
import { useContext, useState, useEffect } from "react";
import { BookContext } from "../context/BookContext";

export type TextObjectType =
  | "main_title"
  | "main_subtitle"
  | "author"
  | "section_title"
  | "chapter_title"
  | "chapter_content"
  | "image";

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

interface UseGetTextsReturns {
  textsList: TextListObject[];
}

const myExternalCauseTextsList: TextListObject[] = [
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
        id: "textsList.introduction.p1",
        type: "chapter_content",
        title: "introduction.p1",
      },
      {
        id: "textsList.introduction.p2",
        type: "chapter_content",
        title: "introduction.p2",
      },
      {
        id: "textsList.introduction.p3",
        type: "chapter_content",
        title: "introduction.p3",
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
        id: "textsList.the_anatomy_of_everything_content.p1",
        type: "chapter_content",
        title: "the_anatomy_of_everything_content.p1",
      },
      {
        id: "textsList.the_anatomy_of_everything_content.p2",
        type: "chapter_content",
        title: "the_anatomy_of_everything_content.p2",
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
      // {
      //   id: "textsList.my_love_image.ruby",
      //   type: "image",
      //   title: "my_love_image.ruby",
      //   imageUri: [
      //     // "../assets/images/my_love/ruby.png",
      //     `${serverURL}/assets/myExternalCause_images/my_love/ruby.png`,
      //   ],
      // },
      // {
      //   id: "textsList.my_love_image.rose",
      //   type: "image",
      //   title: "my_love_image.rose",
      //   imageUri: [
      //     // "../assets/images/my_love/rose.png",
      //     `${serverURL}/assets/myExternalCause_images/my_love/rose.png`,
      //   ],
      // },
      {
        id: "textsList.my_love_content.p1",
        type: "chapter_content",
        title: "my_love_content.p1",
        // imageUri: [
        //   // "../assets/images/my_love/ruby.png",
        //   // "../assets/images/my_love/rose.png",
        //   `${serverURL}/assets/myExternalCause_images/my_love/ruby.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_love/rose.png`,
        // ],
      },
      {
        id: "textsList.my_love_content.p2",
        type: "chapter_content",
        title: "my_love_content.p2",
      },
      {
        id: "textsList.my_love_content.p3",
        type: "chapter_content",
        title: "my_love_content.p3",
      },
      {
        id: "textsList.my_love_content.p4",
        type: "chapter_content",
        title: "my_love_content.p4",
      },
      {
        id: "textsList.my_love_content.p5",
        type: "chapter_content",
        title: "my_love_content.p5",
      },
      {
        id: "textsList.my_love_content.p6",
        type: "chapter_content",
        title: "my_love_content.p6",
      },
      {
        id: "textsList.my_love_content.p7",
        type: "chapter_content",
        title: "my_love_content.p7",
      },
      {
        id: "textsList.my_love_content.p8",
        type: "chapter_content",
        title: "my_love_content.p8",
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
        id: "textsList.my_happiness_content.p1",
        type: "chapter_content",
        title: "my_happiness_content.p1",
        // imageUri: [
        //   // "../assets/images/my_happiness/alina_and_i_prague.png",
        //   `${serverURL}/assets/myExternalCause_images/my_happiness/alina_and_i_prague.png`,
        // ],
      },
      {
        id: "textsList.my_happiness_content.p2",
        type: "chapter_content",
        title: "my_happiness_content.p2",
      },
      {
        id: "textsList.my_happiness_content.p3",
        type: "chapter_content",
        title: "my_happiness_content.p3",
      },
      {
        id: "textsList.my_happiness_content.p4",
        type: "chapter_content",
        title: "my_happiness_content.p4",
      },
      {
        id: "textsList.my_happiness_content.p5",
        type: "chapter_content",
        title: "my_happiness_content.p5",
      },
      {
        id: "textsList.my_happiness_content.p6",
        type: "chapter_content",
        title: "my_happiness_content.p6",
      },
      {
        id: "textsList.my_happiness_content.p7",
        type: "chapter_content",
        title: "my_happiness_content.p7",
      },
      {
        id: "textsList.my_happiness_content.p8",
        type: "chapter_content",
        title: "my_happiness_content.p8",
      },
      {
        id: "textsList.my_happiness_content.p9",
        type: "chapter_content",
        title: "my_happiness_content.p9",
      },
      {
        id: "textsList.my_happiness_content.p10",
        type: "chapter_content",
        title: "my_happiness_content.p10",
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
        id: "textsList.my_strength_content.p1",
        type: "chapter_content",
        title: "my_strength_content.p1",
        // imageUri: [
        //   // "../assets/images/my_strength/steel_wire.png",
        //   // "../assets/images/my_strength/compass.png",
        //   `${serverURL}/assets/myExternalCause_images/my_strength/steel_wire.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_strength/compass.png`,
        // ],
      },
      {
        id: "textsList.my_strength_content.p2",
        type: "chapter_content",
        title: "my_strength_content.p2",
      },
      {
        id: "textsList.my_strength_content.p3",
        type: "chapter_content",
        title: "my_strength_content.p3",
      },
      {
        id: "textsList.my_strength_content.p4",
        type: "chapter_content",
        title: "my_strength_content.p4",
      },
      {
        id: "textsList.my_strength_content.p5",
        type: "chapter_content",
        title: "my_strength_content.p5",
      },
      {
        id: "textsList.my_strength_content.p6",
        type: "chapter_content",
        title: "my_strength_content.p6",
      },
      {
        id: "textsList.my_strength_content.p7",
        type: "chapter_content",
        title: "my_strength_content.p7",
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
        id: "textsList.my_inspiration_and_my_motivation_content.p1",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p1",
        // imageUri: [
        //   // "..assets/images/my_inspiration_and_my_motivation/lightbulb.png",
        //   // "..assets/images/my_inspiration_and_my_motivation/sun.png",
        //   // "..assets/images/my_inspiration_and_my_motivation/sun_lightbulb.png",
        //   `${serverURL}/assets/myExternalCause_images/my_inspiration_and_my_motivation/lightbulb.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_inspiration_and_my_motivation/sun.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_inspiration_and_my_motivation/sun_lightbulb.png`,
        // ],
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p2",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p2",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p3",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p3",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p4",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p4",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p5",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p5",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p6",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p6",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p7",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p7",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p8",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p8",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p9",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p9",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p10",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p10",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p11",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p11",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p12",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p12",
      },
      {
        id: "textsList.my_inspiration_and_my_motivation_content.p13",
        type: "chapter_content",
        title: "my_inspiration_and_my_motivation_content.p13",
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
        // imageUri: [
        //   // "..assets/images/my_peace/ripple.png",
        //   // "..assets/images/my_peace/wave.png",
        //   // "..assets/images/my_peace/sunset.png",
        //   // "..assets/images/my_peace/storm.png",
        //   // "..assets/images/my_peace/galaxy.png",
        //   `${serverURL}/assets/myExternalCause_images/my_peace/ripple.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_peace/wave.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_peace/sunset.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_peace/storm.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_peace/galaxy.png`,
        // ],
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
        // imageUri: [
        //   // "..assets/images/my_home/alina.png",
        //   // "..assets/images/my_home/pajamas.png",
        //   // "..assets/images/my_home/pictures.png",
        //   // "..assets/images/my_home/portal.png",
        //   // "..assets/images/my_home/river.png",
        //   `${serverURL}/assets/myExternalCause_images/my_home/alina.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_home/pajamas.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_home/pictures.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_home/portal.png`,
        //   `${serverURL}/assets/myExternalCause_images/my_home/river.png`,
        // ],
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
        // imageUri: [
        //   // "..assets/images/where_are_they_going/where_are_they_going.png",
        //   `${serverURL}/assets/myExternalCause_images/where_are_they_going/where_are_they_going.png`,
        // ],
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

const theJudgeTextsList: TextListObject[] = [
  {
    title: "Title page",
    index: 0,
    components: [
      {
        id: "theJudgeTextsList.main_title",
        type: "main_title",
        title: "main_title",
      },
      {
        id: "theJudgeTextsList.author",
        type: "author",
        title: "author",
      },
      {
        id: "theJudgeTextsList.co_author",
        type: "author",
        title: "co_author",
      },
      {
        id: "theJudgeTextsList.translators",
        type: "author",
        title: "translators",
      },
      {
        id: "theJudgeTextsList.artist",
        type: "author",
        title: "artist",
        imageUri: [
          `${serverURL}/assets/backgrounds/The_Judge_front_cover_mint.png`,
        ],
      },
    ],
  },
  {
    title: "Chapter 1: The judge and the auras",
    index: 1,
    components: [
      {
        id: "theJudgeTextsList.chapter_1_title",
        type: "chapter_title",
        title: "chapter_1_title",
      },
      {
        id: "theJudgeTextsList.chapter_1_content",
        type: "chapter_content",
        title: "chapter_1_content",
        // imageUri: [
        //   `${serverURL}/assets/theJudge_images/chapter1_defendant.png`,
        // ],
      },
    ],
  },
  {
    title: "Chapter 2: High profile cases",
    index: 2,
    components: [
      {
        id: "theJudgeTextsList.chapter_2_title",
        type: "chapter_title",
        title: "chapter_2_title",
      },
      {
        id: "theJudgeTextsList.chapter_2_content",
        type: "chapter_content",
        title: "chapter_2_content",
        // imageUri: [`${serverURL}/assets/theJudge_images/chapter2_office.png`],
      },
    ],
  },
  {
    title: "Chapter 3: Publicity",
    index: 3,
    components: [
      {
        id: "theJudgeTextsList.chapter_3_title",
        type: "chapter_title",
        title: "chapter_3_title",
      },
      // {
      //   id: "theJudgeTextsList.chapter_3_content",
      //   type: "chapter_content",
      //   title: "chapter_3_content",
      //   imageUri: [
      //     `${serverURL}/assets/theJudge_images/chapter3_paparazzi.png`,
      //   ],
      // },
    ],
  },
];

export function useGetTexts(): UseGetTextsReturns {
  const { currentBook } = useContext(BookContext);
  const [textsList, setTextsList] = useState<TextListObject[]>(
    myExternalCauseTextsList
  );

  useEffect(() => {
    switch (currentBook) {
      case "My External Cause":
        setTextsList(myExternalCauseTextsList);
        break;
      case "The Judge":
        setTextsList(theJudgeTextsList);
        break;
      default:
        setTextsList(myExternalCauseTextsList);
    }
  }, [currentBook]);

  return {
    textsList,
  };
}
