import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { BookContext } from "./BookContext";
import axios from "axios";
import { serverURL } from "../constants/urls";

export type ThemeType =
  | "purple"
  | "coral"
  | "mint"
  | "rose"
  | "sun"
  | "ocean"
  | "beach";

export type ThemeState = {
  currentTheme: ThemeType;
  color300: string;
  color500: string;
  color700: string;
  lightText: string;
  darkText: string;
  homeBgUri: string;
  photosBgUri: string;
  readBgUri: string;
  listenBgUri: string;
  notesBgUri: string;
  settingsBgUri: string;
  changeTheme: (id: string) => void;
};

const initialState: ThemeState = {
  currentTheme: "purple",
  color300: "#CDB7F6",
  color500: "#6B3BCB",
  color700: "#380C6B",
  lightText: "#FFFFFF",
  darkText: "#380C6B",
  homeBgUri: `${serverURL}/assets/backgrounds/my_external_cause_front_cover_purple.png`,
  photosBgUri: `${serverURL}/assets/backgrounds/photos_viewer_purple.png`,
  readBgUri: `${serverURL}/assets/backgrounds/hummingbird_reader_purple.png`,
  listenBgUri: `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_purple.png`,
  notesBgUri: `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_purple.png`,
  settingsBgUri: `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_purple.png`,
  changeTheme: (id: string) => {},
};

export const ThemeContext = createContext<ThemeState>(initialState);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { currentBook } = useContext(BookContext);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("purple");
  const [color300, setColor300] = useState<string>("#CDB7F6");
  const [color500, setColor500] = useState<string>("#6B3BCB");
  const [color700, setColor700] = useState<string>("#380C6B");
  const [lightText, setLightText] = useState<string>("#FFFFFF");
  const [darkText, setDarkText] = useState<string>("#380C6B");
  const [homeBgUri, setHomeBgUri] = useState<string>(
    `${serverURL}/assets/backgrounds/my_external_cause_front_cover_purple.png`
  );
  const [photosBgUri, setPhotosBgUri] = useState<string>(
    `${serverURL}/assets/backgrounds/photos_viewer_purple.png`
  );
  const [readBgUri, setReadBgUri] = useState<string>(
    `${serverURL}/assets/backgrounds/hummingbird_reader_purple.png`
  );
  const [listenBgUri, setListenBgUri] = useState<string>(
    `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_purple.png`
  );
  const [notesBgUri, setNotesBgUri] = useState<string>(
    `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_purple.png`
  );
  const [settingsBgUri, setSettingsBgUri] = useState<string>(
    `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_purple.png`
  );

  const changeTheme = (id: string) => {
    saveThemeSelection(id);
    switch (id) {
      case "purple":
        setCurrentTheme("purple");
        setColor300("#CDB7F6");
        setColor500("#6B3BCB");
        setColor700("#380C6B");
        setLightText("#FFFFFF");
        setDarkText("#380C6B");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_purple.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_purple.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_purple.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_purple.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_purple.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_purple.png`
        );
        break;
      case "coral":
        setCurrentTheme("coral");
        setColor300("#FDC4B6");
        setColor500("#FF7F50");
        setColor700("#7B3729");
        setLightText("#FFFFFF");
        setDarkText("#7B3729");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_coral.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_coral.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_coral.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_coral.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_coral.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_coral.png`
        );
        break;
      case "mint":
        setCurrentTheme("mint");
        setColor300("#92DDC8");
        setColor500("#5AA17F");
        setColor700("#0A3A2A");
        setLightText("#FFFFFF");
        setDarkText("#0A3A2A");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_mint.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_mint.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_mint.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_mint.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_mint.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_mint.png`
        );
        break;
      case "rose":
        setCurrentTheme("rose");
        setColor300("#F7D1DC");
        setColor500("#D7094F");
        setColor700("#7E0315");
        setLightText("#FFFFFF");
        setDarkText("#7E0315");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_rose.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_rose.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_rose.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_rose.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_rose.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_rose.png`
        );
        break;
      case "sun":
        setCurrentTheme("sun");
        setColor300("#FEFDD2");
        setColor500("#C3BC00");
        setColor700("#BB6700");
        setLightText("#FFFFFF");
        setDarkText("#BB6700");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_sun.png`
        );
        setPhotosBgUri(`${serverURL}/assets/backgrounds/photos_viewer_sun.png`);
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_sun.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_sun.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_sun.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_sun.png`
        );
        break;
      case "ocean":
        setCurrentTheme("ocean");
        setColor300("#C9E8FE");
        setColor500("#008BF4");
        setColor700("#00457A");
        setLightText("#FFFFFF");
        setDarkText("#00457A");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_ocean.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_ocean.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_ocean.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_ocean.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_ocean.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_ocean.png`
        );
        break;
      case "beach":
        setCurrentTheme("beach");
        setColor300("#FEFCB9");
        setColor500("#E1BF92");
        setColor700("#006F8A");
        setLightText("#FFFFFF");
        setDarkText("#006F8A");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_beach.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_beach.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_beach.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_beach.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_beach.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_beach.png`
        );
        break;
      default:
        setCurrentTheme("purple");
        setColor300("#CDB7F6");
        setColor500("#6B3BCB");
        setColor700("#380C6B");
        setLightText("#FFFFFF");
        setDarkText("#380C6B");
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_purple.png`
        );
        setPhotosBgUri(
          `${serverURL}/assets/backgrounds/photos_viewer_purple.png`
        );
        setReadBgUri(
          `${serverURL}/assets/backgrounds/hummingbird_reader_purple.png`
        );
        setListenBgUri(
          `${serverURL}/assets/backgrounds/I_Love_You_Alina_listen_background_purple.png`
        );
        setNotesBgUri(
          `${serverURL}/assets/backgrounds/alina_app_notes_wallpaper_purple.png`
        );
        setSettingsBgUri(
          `${serverURL}/assets/backgrounds/alina_app_settings_wallpaper_purple.png`
        );
    }
  };

  const getSavedTheme = async () => {
    axios
      .get(`${serverURL}/getTheme`)
      .then(({ data }) => {
        console.log("incoming them:", data);
        setCurrentTheme(data);
        changeTheme(data);
      })
      .catch((err) => console.error(err));
  };

  const saveThemeSelection = async (theme: string) => {
    axios
      .post(`${serverURL}/saveThemeSelection`, {
        theme: theme,
      })
      .then(({ data }) => {
        // getSavedTheme();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSavedTheme();
  }, []);

  useEffect(() => {
    switch (currentBook) {
      case "My External Cause":
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
        );
        break;
      case "Passportal":
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/passportal_front_cover_${currentTheme}.png`
        );
        break;
      case "Love Drunk":
        setHomeBgUri(
          `${serverURL}/assets/backgrounds/love_drunk_front_cover_${currentTheme}.png`
        );
        break;
    }
  }, [currentBook]);

  const values = {
    currentTheme,
    color300,
    color500,
    color700,
    lightText,
    darkText,
    homeBgUri,
    photosBgUri,
    readBgUri,
    listenBgUri,
    notesBgUri,
    settingsBgUri,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
