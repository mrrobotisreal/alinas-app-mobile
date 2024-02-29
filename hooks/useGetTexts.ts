import { serverURL } from "../constants/urls";
import { useContext, useState, useEffect, useMemo } from "react";
import { BookContext } from "../context/BookContext";
import { ThemeContext } from "../context/ThemeContext";

export type TextObjectType =
  | "main_title"
  | "main_subtitle"
  | "author"
  | "section_title"
  | "chapter_title"
  | "chapter_content"
  | "image";

export type TextListObject = {
  id: string;
  title: string;
  index: number;
  components: TextObject[];
};

export type TextObject = {
  id: string;
  type: TextObjectType;
  title: string;
  imageUri?: string[];
  size?: {
    width: number;
    height: number;
  };
};

interface UseGetTextsReturns {
  textsList: TextListObject[];
}

export function useGetTexts(): UseGetTextsReturns {
  const { currentBook } = useContext(BookContext);
  const { currentTheme } = useContext(ThemeContext);
  const myExternalCauseTextsList: TextListObject[] = useMemo(
    () => [
      {
        id: "textsList.main_title",
        title: "Title page",
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
            id: "title_image",
            type: "image",
            title: "title_image",
            imageUri: [
              `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`,
            ],
          },
        ],
      },
      {
        id: "textsList.introduction_title",
        title: "Introduction",
        index: 1,
        components: [
          {
            id: "textsList.introduction_title",
            type: "chapter_title",
            title: "introduction_title",
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
        id: "textsList.the_anatomy_of_everything_title",
        title: "The Anatomy of Everything",
        index: 2,
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
        id: "textsList.my_love_title",
        title: "My Love",
        index: 3,
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
            id: "textsList.my_love_image.ruby",
            type: "image",
            title: "my_love_image.ruby",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_love/ruby.png`,
            ],
          },
          {
            id: "textsList.my_love_content.p1",
            type: "chapter_content",
            title: "my_love_content.p1",
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
            id: "textsList.my_love_image.rose",
            type: "image",
            title: "my_love_image.rose",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_love/rose.png`,
            ],
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
        id: "textsList.my_happiness_title",
        title: "My Happiness",
        index: 4,
        components: [
          {
            id: "textsList.my_happiness_title",
            type: "chapter_title",
            title: "my_happiness_title",
          },
          {
            id: "textsList.my_happiness_image.alina_and_i_prague",
            type: "image",
            title: "my_happiness_image.alina_and_i_prague",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_happiness/alina_and_i_prague.png`,
            ],
          },
          {
            id: "textsList.my_happiness_content.p1",
            type: "chapter_content",
            title: "my_happiness_content.p1",
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
        id: "textsList.my_strength_title",
        title: "My Strength",
        index: 5,
        components: [
          {
            id: "textsList.my_strength_title",
            type: "chapter_title",
            title: "my_strength_title",
          },
          {
            id: "textsList.my_strength_image.steel_wire",
            type: "image",
            title: "my_strength_image.steel_wire",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_strength/steel_wire.png`,
            ],
          },
          {
            id: "textsList.my_strength_content.p1",
            type: "chapter_content",
            title: "my_strength_content.p1",
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
            id: "textsList.my_strength_image.compass",
            type: "image",
            title: "my_strength_image.compass",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_strength/compass.png`,
            ],
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
        id: "textsList.my_inspiration_and_my_motivation_title",
        title: "My Inspiration and My Motivation",
        index: 6,
        components: [
          {
            id: "textsList.my_inspiration_and_my_motivation_title",
            type: "chapter_title",
            title: "my_inspiration_and_my_motivation_title",
          },
          {
            id: "textsList.my_inspiration_and_my_motivation_image.lightbulb",
            type: "image",
            title: "my_inspiration_and_my_motivation_image.lightbulb",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_inspiration_and_my_motivation/lightbulb.png`,
            ],
          },
          {
            id: "textsList.my_inspiration_and_my_motivation_content.p1",
            type: "chapter_content",
            title: "my_inspiration_and_my_motivation_content.p1",
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
            id: "textsList.my_inspiration_and_my_motivation_image.sun",
            type: "image",
            title: "my_inspiration_and_my_motivation_image.sun",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_inspiration_and_my_motivation/sun.png`,
            ],
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
            id: "textsList.my_inspiration_and_my_motivation_image.sun_lightbulb",
            type: "image",
            title: "my_inspiration_and_my_motivation_image.sun_lightbulb",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_inspiration_and_my_motivation/sun_lightbulb.png`,
            ],
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
        id: "textsList.my_peace_title",
        title: "My Peace",
        index: 7,
        components: [
          {
            id: "textsList.my_peace_title",
            type: "chapter_title",
            title: "my_peace_title",
          },
          {
            id: "textsList.my_peace_image.ripple",
            type: "image",
            title: "my_peace_image.ripple",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_peace/ripple.png`,
            ],
          },
          {
            id: "textsList.my_peace_content.p1",
            type: "chapter_content",
            title: "my_peace_content.p1",
          },
          {
            id: "textsList.my_peace_content.p2",
            type: "chapter_content",
            title: "my_peace_content.p2",
          },
          {
            id: "textsList.my_peace_image.wave",
            type: "image",
            title: "my_peace_image.wave",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_peace/wave.png`,
            ],
          },
          {
            id: "textsList.my_peace_content.p3",
            type: "chapter_content",
            title: "my_peace_content.p3",
          },
          {
            id: "textsList.my_peace_content.p4",
            type: "chapter_content",
            title: "my_peace_content.p4",
          },
          {
            id: "textsList.my_peace_content.p5",
            type: "chapter_content",
            title: "my_peace_content.p5",
          },
          {
            id: "textsList.my_peace_content.p6",
            type: "chapter_content",
            title: "my_peace_content.p6",
          },
          {
            id: "textsList.my_peace_image.sunset",
            type: "image",
            title: "my_peace_image.sunset",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_peace/sunset.png`,
            ],
          },
          {
            id: "textsList.my_peace_content.p7",
            type: "chapter_content",
            title: "my_peace_content.p7",
          },
          {
            id: "textsList.my_peace_image.storm",
            type: "image",
            title: "my_peace_image.storm",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_peace/storm.png`,
            ],
          },
          {
            id: "textsList.my_peace_content.p8",
            type: "chapter_content",
            title: "my_peace_content.p8",
          },
          {
            id: "textsList.my_peace_image.galaxy",
            type: "image",
            title: "my_peace_image.galaxy",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_peace/galaxy.png`,
            ],
          },
        ],
      },
      {
        id: "textsList.my_home_title",
        title: "My Home",
        index: 8,
        components: [
          {
            id: "textsList.my_home_title",
            type: "chapter_title",
            title: "my_home_title",
          },
          {
            id: "textsList.my_home_image.alina",
            type: "image",
            title: "my_home_image.alina",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_home/alina.png`,
            ],
          },
          {
            id: "textsList.my_home_content.p1",
            type: "chapter_content",
            title: "my_home_content.p1",
          },
          {
            id: "textsList.my_home_content.p2",
            type: "chapter_content",
            title: "my_home_content.p2",
          },
          {
            id: "textsList.my_home_content.p3",
            type: "chapter_content",
            title: "my_home_content.p3",
          },
          {
            id: "textsList.my_home_content.p4",
            type: "chapter_content",
            title: "my_home_content.p4",
          },
          {
            id: "textsList.my_home_content.p5",
            type: "chapter_content",
            title: "my_home_content.p5",
          },
          {
            id: "textsList.my_home_image.pajamas",
            type: "image",
            title: "my_home_image.pajamas",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_home/pajamas.png`,
            ],
          },
          {
            id: "textsList.my_home_content.p6",
            type: "chapter_content",
            title: "my_home_content.p6",
          },
          {
            id: "textsList.my_home_image.pictures",
            type: "image",
            title: "my_home_image.pictures",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_home/pictures.png`,
            ],
          },
          {
            id: "textsList.my_home_content.p7",
            type: "chapter_content",
            title: "my_home_content.p7",
          },
          {
            id: "textsList.my_home_image.portal",
            type: "image",
            title: "my_home_image.portal",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_home/portal.png`,
            ],
          },
          {
            id: "textsList.my_home_content.p8",
            type: "chapter_content",
            title: "my_home_content.p8",
          },
          {
            id: "textsList.my_home_image.river",
            type: "image",
            title: "my_home_image.river",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/my_home/river.png`,
            ],
          },
        ],
      },
      {
        id: "textsList.where_are_they_going_title",
        title: "Where are they going?\nWhere are WE going?",
        index: 9,
        components: [
          {
            id: "textsList.where_are_they_going_title",
            type: "section_title",
            title: "where_are_they_going_title",
          },
          {
            id: "textsList.where_are_they_going_image",
            type: "image",
            title: "where_are_they_going_image",
            imageUri: [
              `${serverURL}/assets/myExternalCause_images/where_are_they_going/where_are_they_going.png`,
            ],
          },
          {
            id: "textsList.where_are_they_going_content",
            type: "chapter_content",
            title: "where_are_they_going_content",
          },
        ],
      },
      {
        id: "textsList.i_want_everything_with_you_title",
        title: "I want EVERYTHING with you",
        index: 10,
        components: [
          {
            id: "textsList.i_want_everything_with_you_title",
            type: "section_title",
            title: "i_want_everything_with_you_title",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p1",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p1",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p2",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p2",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p3",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p3",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p4",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p4",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p5",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p5",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p6",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p6",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p7",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p7",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p8",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p8",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p9",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p9",
          },
          {
            id: "textsList.i_want_everything_with_you_content.p10",
            type: "chapter_content",
            title: "i_want_everything_with_you_content.p10",
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
        id: "textsList.outro_part_1_title",
        title: "Особлива кінцівка, частина 1",
        index: 11,
        components: [
          {
            id: "textsList.outro_part_1_title",
            type: "chapter_title",
            title: "Особлива кінцівка, частина 1",
          },
          {
            id: "textsList.outro_part_1",
            type: "chapter_content",
            title: "Особлива кінцівка, частина 1",
          },
        ],
      },
      {
        id: "textsList.outro_part_2_title",
        title: "Особлива кінцівка, частина 2",
        index: 12,
        components: [
          {
            id: "textsList.outro_part_2_title",
            type: "chapter_title",
            title: "Особлива кінцівка, частина 2",
          },
          {
            id: "textsList.outro_part_2",
            type: "chapter_content",
            title: "Особлива кінцівка, частина 2",
          },
        ],
      },
    ],
    [currentTheme]
  );
  const theJudgeTextsList: TextListObject[] = useMemo(
    () => [
      {
        id: "theJudgeTextsList.main_title",
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
          },
          {
            id: "title_image",
            type: "image",
            title: "title_image",
            imageUri: [
              `${serverURL}/assets/backgrounds/The_Judge_front_cover_${currentTheme}.png`,
            ],
          },
        ],
      },
      {
        id: "theJudgeTextsList.chapter_1_title",
        title: "Chapter 1: The judge and the auras",
        index: 1,
        components: [
          {
            id: "theJudgeTextsList.chapter_1_title",
            type: "chapter_title",
            title: "chapter_1_title",
          },
          {
            id: "image",
            title: "image",
            type: "image",
            imageUri: [
              `${serverURL}/assets/theJudge_images/chapter1_defendant.png`,
            ],
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p1",
            type: "chapter_content",
            title: "chapter_1_content.p1",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p2",
            type: "chapter_content",
            title: "chapter_1_content.p2",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p3",
            type: "chapter_content",
            title: "chapter_1_content.p3",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p4",
            type: "chapter_content",
            title: "chapter_1_content.p4",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p5",
            type: "chapter_content",
            title: "chapter_1_content.p5",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p6",
            type: "chapter_content",
            title: "chapter_1_content.p6",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p7",
            type: "chapter_content",
            title: "chapter_1_content.p7",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p8",
            type: "chapter_content",
            title: "chapter_1_content.p8",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p9",
            type: "chapter_content",
            title: "chapter_1_content.p9",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p10",
            type: "chapter_content",
            title: "chapter_1_content.p10",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p11",
            type: "chapter_content",
            title: "chapter_1_content.p11",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p12",
            type: "chapter_content",
            title: "chapter_1_content.p12",
          },
          {
            id: "theJudgeTextsList.chapter_1_content.p13",
            type: "chapter_content",
            title: "chapter_1_content.p13",
          },
        ],
      },
      {
        id: "theJudgeTextsList.chapter_2_title",
        title: "Chapter 2: High profile cases",
        index: 2,
        components: [
          {
            id: "theJudgeTextsList.chapter_2_title",
            type: "chapter_title",
            title: "chapter_2_title",
          },
          {
            id: "image",
            title: "image",
            type: "image",
            imageUri: [
              `${serverURL}/assets/theJudge_images/chapter2_office.png`,
            ],
            size: {
              width: 300,
              height: 300,
            },
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p1",
            type: "chapter_content",
            title: "chapter_2_content.p1",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p2",
            type: "chapter_content",
            title: "chapter_2_content.p2",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p3",
            type: "chapter_content",
            title: "chapter_2_content.p3",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p4",
            type: "chapter_content",
            title: "chapter_2_content.p4",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p5",
            type: "chapter_content",
            title: "chapter_2_content.p5",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p6",
            type: "chapter_content",
            title: "chapter_2_content.p6",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p7",
            type: "chapter_content",
            title: "chapter_2_content.p7",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p8",
            type: "chapter_content",
            title: "chapter_2_content.p8",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p9",
            type: "chapter_content",
            title: "chapter_2_content.p9",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p10",
            type: "chapter_content",
            title: "chapter_2_content.p10",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p11",
            type: "chapter_content",
            title: "chapter_2_content.p11",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p12",
            type: "chapter_content",
            title: "chapter_2_content.p12",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p13",
            type: "chapter_content",
            title: "chapter_2_content.p13",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p14",
            type: "chapter_content",
            title: "chapter_2_content.p14",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p15",
            type: "chapter_content",
            title: "chapter_2_content.p15",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p16",
            type: "chapter_content",
            title: "chapter_2_content.p16",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p17",
            type: "chapter_content",
            title: "chapter_2_content.p17",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p18",
            type: "chapter_content",
            title: "chapter_2_content.p18",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p19",
            type: "chapter_content",
            title: "chapter_2_content.p19",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p20",
            type: "chapter_content",
            title: "chapter_2_content.p20",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p21",
            type: "chapter_content",
            title: "chapter_2_content.p21",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p22",
            type: "chapter_content",
            title: "chapter_2_content.p22",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p23",
            type: "chapter_content",
            title: "chapter_2_content.p23",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p24",
            type: "chapter_content",
            title: "chapter_2_content.p24",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p25",
            type: "chapter_content",
            title: "chapter_2_content.p25",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p26",
            type: "chapter_content",
            title: "chapter_2_content.p26",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p27",
            type: "chapter_content",
            title: "chapter_2_content.p27",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p28",
            type: "chapter_content",
            title: "chapter_2_content.p28",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p29",
            type: "chapter_content",
            title: "chapter_2_content.p29",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p30",
            type: "chapter_content",
            title: "chapter_2_content.p30",
          },
          {
            id: "theJudgeTextsList.chapter_2_content.p31",
            type: "chapter_content",
            title: "chapter_2_content.p31",
          },
        ],
      },
      {
        id: "theJudgeTextsList.chapter_3_title",
        title: "Chapter 3: Publicity",
        index: 3,
        components: [
          {
            id: "theJudgeTextsList.chapter_3_title",
            type: "chapter_title",
            title: "chapter_3_title",
          },
          {
            id: "image",
            title: "image",
            type: "image",
            imageUri: [
              `${serverURL}/assets/theJudge_images/chapter3_paparazzi.png`,
            ],
          },
          // {
          //   id: "theJudgeTextsList.chapter_3_content",
          //   type: "chapter_content",
          //   title: "chapter_3_content.p1",
          // },
        ],
      },
    ],
    [currentTheme]
  );
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
