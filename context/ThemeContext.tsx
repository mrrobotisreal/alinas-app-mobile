import { ReactNode, createContext, useEffect, useState } from "react";
import HOME from "../assets/splash.png";
import HOME_CORAL from "../assets/images/my_external_cause_front_cover_coral.png";
import HOME_MINT from "../assets/images/my_external_cause_front_cover_mint.png";
import HOME_ROSE from "../assets/images/my_external_cause_front_cover_rose.png";
import HOME_SUN from "../assets/images/my_external_cause_front_cover_sun.png";
import HOME_OCEAN from "../assets/images/my_external_cause_front_cover_ocean.png";
import HOME_BEACH from "../assets/images/my_external_cause_front_cover_beach.png";
import READ from "../assets/images/hummingbird_reader.png";
import READ_CORAL from "../assets/images/hummingbird_reader_coral.png";
import READ_MINT from "../assets/images/hummingbird_reader_mint.png";
import READ_ROSE from "../assets/images/hummingbird_reader_rose.png";
import READ_SUN from "../assets/images/hummingbird_reader_sun.png";
import READ_OCEAN from "../assets/images/hummingbird_reader_ocean.png";
import READ_BEACH from "../assets/images/hummingbird_reader_beach.png";
import LISTEN from "../assets/images/I_Love_You_Alina_listen_background.png";
import LISTEN_CORAL from "../assets/images/I_Love_You_Alina_listen_background_coral.png";
import LISTEN_MINT from "../assets/images/I_Love_You_Alina_listen_background_mint.png";
import LISTEN_ROSE from "../assets/images/I_Love_You_Alina_listen_background_rose.png";
import LISTEN_SUN from "../assets/images/I_Love_You_Alina_listen_background_sun.png";
import LISTEN_OCEAN from "../assets/images/I_Love_You_Alina_listen_background_ocean.png";
import LISTEN_BEACH from "../assets/images/I_Love_You_Alina_listen_background_beach.png";
import NOTES from "../assets/images/alina_app_notes_wallpaper.png";
import NOTES_CORAL from "../assets/images/alina_app_notes_wallpaper_coral.png";
import NOTES_MINT from "../assets/images/alina_app_notes_wallpaper_mint.png";
import NOTES_ROSE from "../assets/images/alina_app_notes_wallpaper_rose.png";
import NOTES_SUN from "../assets/images/alina_app_notes_wallpaper_sun.png";
import NOTES_OCEAN from "../assets/images/alina_app_notes_wallpaper_ocean.png";
import NOTES_BEACH from "../assets/images/alina_app_notes_wallpaper_beach.png";
import SETTINGS from "../assets/images/alina_app_settings_wallpaper.png";
import SETTINGS_CORAL from "../assets/images/alina_app_settings_wallpaper_coral.png";
import SETTINGS_MINT from "../assets/images/alina_app_settings_wallpaper_mint.png";
import SETTINGS_ROSE from "../assets/images/alina_app_settings_wallpaper_rose.png";
import SETTINGS_SUN from "../assets/images/alina_app_settings_wallpaper_sun.png";
import SETTINGS_OCEAN from "../assets/images/alina_app_settings_wallpaper_ocean.png";
import SETTINGS_BEACH from "../assets/images/alina_app_settings_wallpaper_beach.png";
import { ImageSourcePropType } from "react-native";
import axios from "axios";
import { serverURL } from "../constants/urls";

export type ThemeState = {
  currentTheme: string;
  color300: string;
  color500: string;
  color700: string;
  lightText: string;
  darkText: string;
  homeBG: ImageSourcePropType;
  readBG: ImageSourcePropType;
  listenBG: ImageSourcePropType;
  notesBG: ImageSourcePropType;
  settingsBG: ImageSourcePropType;
  changeTheme: (id: string) => void;
};

const initialState: ThemeState = {
  currentTheme: "purple",
  color300: "#CDB7F6",
  color500: "#6B3BCB",
  color700: "#380C6B",
  lightText: "#FFFFFF",
  darkText: "#380C6B",
  homeBG: HOME,
  readBG: READ,
  listenBG: LISTEN,
  notesBG: NOTES,
  settingsBG: SETTINGS,
  changeTheme: (id: string) => {},
};

export const ThemeContext = createContext<ThemeState>(initialState);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<string>("purple");
  const [color300, setColor300] = useState<string>("#CDB7F6");
  const [color500, setColor500] = useState<string>("#6B3BCB");
  const [color700, setColor700] = useState<string>("#380C6B");
  const [lightText, setLightText] = useState<string>("#FFFFFF");
  const [darkText, setDarkText] = useState<string>("#380C6B");
  const [homeBG, setHomeBG] = useState<ImageSourcePropType>(HOME);
  const [readBG, setReadBG] = useState<ImageSourcePropType>(READ);
  const [listenBG, setListenBG] = useState<ImageSourcePropType>(LISTEN);
  const [notesBG, setNotesBG] = useState<ImageSourcePropType>(NOTES);
  const [settingsBG, setSettingsBG] = useState<ImageSourcePropType>(SETTINGS);

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
        setHomeBG(HOME);
        setReadBG(READ);
        setListenBG(LISTEN);
        setNotesBG(NOTES);
        setSettingsBG(SETTINGS);
        break;
      case "coral":
        setCurrentTheme("coral");
        setColor300("#FDC4B6");
        setColor500("#FF7F50");
        setColor700("#7B3729");
        setLightText("#FFFFFF");
        setDarkText("#7B3729");
        setHomeBG(HOME_CORAL);
        setReadBG(READ_CORAL);
        setListenBG(LISTEN_CORAL);
        setNotesBG(NOTES_CORAL);
        setSettingsBG(SETTINGS_CORAL);
        break;
      case "mint":
        setCurrentTheme("mint");
        setColor300("#92DDC8");
        setColor500("#5AA17F");
        setColor700("#0A3A2A");
        setLightText("#FFFFFF");
        setDarkText("#0A3A2A");
        setHomeBG(HOME_MINT);
        setReadBG(READ_MINT);
        setListenBG(LISTEN_MINT);
        setNotesBG(NOTES_MINT);
        setSettingsBG(SETTINGS_MINT);
        break;
      case "rose":
        setCurrentTheme("rose");
        setColor300("#F7D1DC");
        setColor500("#D7094F");
        setColor700("#7E0315");
        setLightText("#FFFFFF");
        setDarkText("#7E0315");
        setHomeBG(HOME_ROSE);
        setReadBG(READ_ROSE);
        setListenBG(LISTEN_ROSE);
        setNotesBG(NOTES_ROSE);
        setSettingsBG(SETTINGS_ROSE);
        break;
      case "sun":
        setCurrentTheme("sun");
        setColor300("#FEFDD2");
        setColor500("#C3BC00");
        setColor700("#BB6700");
        setLightText("#FFFFFF");
        setDarkText("#BB6700");
        setHomeBG(HOME_SUN);
        setReadBG(READ_SUN);
        setListenBG(LISTEN_SUN);
        setNotesBG(NOTES_SUN);
        setSettingsBG(SETTINGS_SUN);
        break;
      case "ocean":
        setCurrentTheme("ocean");
        setColor300("#C9E8FE");
        setColor500("#008BF4");
        setColor700("#00457A");
        setLightText("#FFFFFF");
        setDarkText("#00457A");
        setHomeBG(HOME_OCEAN);
        setReadBG(READ_OCEAN);
        setListenBG(LISTEN_OCEAN);
        setNotesBG(NOTES_OCEAN);
        setSettingsBG(SETTINGS_OCEAN);
        break;
      case "beach":
        setCurrentTheme("beach");
        setColor300("#FEFCB9");
        setColor500("#E1BF92");
        setColor700("#006F8A");
        setLightText("#FFFFFF");
        setDarkText("#006F8A");
        setHomeBG(HOME_BEACH);
        setReadBG(READ_BEACH);
        setListenBG(LISTEN_BEACH);
        setNotesBG(NOTES_BEACH);
        setSettingsBG(SETTINGS_BEACH);
        break;
      default:
        setCurrentTheme("purple");
        setColor300("#CDB7F6");
        setColor500("#6B3BCB");
        setColor700("#380C6B");
        setLightText("#FFFFFF");
        setDarkText("#380C6B");
        setHomeBG(HOME);
        setReadBG(READ);
        setListenBG(LISTEN);
        setNotesBG(NOTES);
        setSettingsBG(SETTINGS);
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

  // useEffect(() => {
  //   saveThemeSelection(currentTheme);
  // }, [currentTheme]);

  const values = {
    currentTheme,
    color300,
    color500,
    color700,
    lightText,
    darkText,
    homeBG,
    readBG,
    listenBG,
    notesBG,
    settingsBG,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
