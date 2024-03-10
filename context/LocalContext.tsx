import { ReactNode, createContext, useEffect, useState } from "react";
import { NativeModules, Platform } from "react-native";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { getLocales, Locale, getCalendars } from "expo-localization";
import useCaptureEvent, { EventObject } from "../hooks/useCaptureEvent";

/**
 * Messages
 */
import de from "../messages/de.json";
import en from "../messages/en.json";
import fr from "../messages/fr.json";
import he from "../messages/he.json";
import ru from "../messages/ru.json";
import uk from "../messages/uk.json";
import vi from "../messages/vi.json";
import zh_CN from "../messages/zh_CN.json";
import zh_TW from "../messages/zh_TW.json";
import { serverURL } from "../constants/urls";
const messages: any = {
  de: de,
  "de-AT": de,
  de_AT: de,
  "de-DE": de,
  de_DE: de,
  en: en,
  "en-GB": en,
  en_GB: en,
  "en-US": en,
  en_US: en,
  fr: fr,
  "fr-FR": fr,
  fr_FR: fr,
  he: he,
  "he-IL": he,
  he_IL: he,
  ru: ru,
  "ru-RU": ru,
  ru_RU: ru,
  "ru-UA": ru,
  ru_UA: ru,
  uk: uk,
  "uk-UA": uk,
  uk_UA: uk,
  vi: vi,
  "vi-VN": vi,
  vi_VN: vi,
  "zh-CN": zh_CN,
  zh_CN: zh_CN,
  "zh-TW": zh_TW,
  zh_TW: zh_TW,
};

const devicePlatform = Platform.OS;
const _deviceLocale =
  devicePlatform === "android"
    ? NativeModules.I18nManager.localeIdentifier
    : NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
const deviceLocale = _deviceLocale.split(/[-_]/)[0];

export type LocaleStateContext = {
  currentLang: string;
  changeLanguage: (
    selectedLanguage: string,
    currentBook?: string,
    currentTheme?: string,
    currentFont?: string
  ) => void;
  deviceLocales: Locale[];
  timeZone: string | null;
};
export type LocaleContextProps = {
  children?: ReactNode;
};

const initialState: LocaleStateContext = {
  currentLang: deviceLocale || "en",
  changeLanguage: (
    selectedLanguage: string,
    currentBook?: string,
    currentTheme?: string,
    currentFont?: string
  ) => void 0,
  deviceLocales: getLocales(),
  timeZone: getCalendars()[0].timeZone,
};

export const LocalContext = createContext(initialState);

export const LocalContextProvider = ({ children }: LocaleContextProps) => {
  const { captureEvent } = useCaptureEvent();
  const [currentLang, setCurrentLang] = useState<string>(deviceLocale || "en");
  const [deviceLocales, setDeviceLocales] = useState<Locale[]>(
    initialState.deviceLocales
  );
  const [timeZone, setTimeZone] = useState<string | null>(
    initialState.timeZone
  );

  const changeLanguage = (
    selectedLanguage: string,
    currentBook?: string,
    currentTheme?: string,
    currentFont?: string
  ) => {
    if (currentBook && currentTheme && currentFont) {
      const date = new Date();
      const newEvent: EventObject = {
        name: "Press button",
        location: "Settings",
        context: "Change language",
        detail: `Changed language to ${selectedLanguage}`,
        timestamp: date.getTime(),
        date: date.toDateString(),
        time: date.toTimeString(),
        timeZone: initialState.timeZone || "UTC",
        constants: {
          selectedBook: currentBook,
          selectedLanguage: selectedLanguage,
          selectedTheme: currentTheme,
          selectedFont: currentFont,
        },
      };
      captureEvent(newEvent);
    }
    saveLangSelection(selectedLanguage);
    setCurrentLang(selectedLanguage);
  };

  const getSavedLang = async () => {
    axios
      .get(`${serverURL}/getLang`)
      .then(({ data }) => {
        console.log("incoming lang:", data);
        // setCurrentLang(data);
        changeLanguage(data);
      })
      .catch((err) => console.error(err));
  };

  const saveLangSelection = async (id: string) => {
    axios
      .post(`${serverURL}/saveLangSelection`, {
        lang: id,
      })
      .then(({ data }) => {
        // getSavedLang();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setDeviceLocales(getLocales());
    setTimeZone(getCalendars()[0].timeZone);
    getSavedLang();
  }, []);

  // useEffect(() => {
  //   saveLangSelection(currentLang);
  // }, [currentLang]);

  const values = {
    currentLang,
    changeLanguage,
    deviceLocales,
    timeZone,
  };

  return (
    <LocalContext.Provider value={values}>
      <IntlProvider
        messages={messages[currentLang]}
        locale={currentLang}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LocalContext.Provider>
  );
};
