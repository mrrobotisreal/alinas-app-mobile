import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { LocalContext } from "../context/LocalContext";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { PlatformContext } from "../context/PlatformContext";
import { Image } from "expo-image";
import BackgroundImage from "../components/BackgroundImage";

export default function Settings() {
  const intl = useIntl();
  const {
    currentTheme,
    color300,
    color500,
    color700,
    lightText,
    settingsBgUri,
    changeTheme,
  } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont, changeFont } =
    useContext(FontContext);
  const { currentLang, changeLanguage } = useContext(LocalContext);
  const { OS } = useContext(PlatformContext);

  const fontRobotoText = intl.formatMessage({ id: "settings.font.roboto" });
  const fontSerifText = intl.formatMessage({ id: "settings.font.serif" });
  const fontNexaText = intl.formatMessage({ id: "settings.font.nexa" });
  const fontAngelinaText = intl.formatMessage({ id: "settings.font.angelina" });
  const fontBauhausLightText = intl.formatMessage({
    id: "settings.font.bauhaus_light",
  });
  const fontBauhausMediumText = intl.formatMessage({
    id: "settings.font.bauhaus_medium",
  });
  const fontFrankText = intl.formatMessage({ id: "settings.font.frank" });
  const fontHummingbirdText = intl.formatMessage({
    id: "settings.font.hummingbird",
  });
  const fontAnaniasText = intl.formatMessage({ id: "settings.font.ananias" });
  const fontCorruptionText = intl.formatMessage({
    id: "settings.font.corruption",
  });
  const fontsList = useMemo(() => {
    return [
      {
        id: "nexa",
        title: fontNexaText,
      },
      {
        id: "angelina",
        title: fontAngelinaText,
      },
      {
        id: "bauhaus_light",
        title: fontBauhausLightText,
      },
      {
        id: "bauhaus_medium",
        title: fontBauhausMediumText,
      },
      {
        id: "frank",
        title: fontFrankText,
      },
      {
        id: "hummingbird",
        title: fontHummingbirdText,
      },
      {
        id: "ananias",
        title: fontAnaniasText,
      },
      {
        id: "corruption",
        title: fontCorruptionText,
      },
      {
        id: "roboto",
        title: fontRobotoText,
      },
      {
        id: "serif",
        title: fontSerifText,
      },
    ];
  }, [
    fontRobotoText,
    fontSerifText,
    fontNexaText,
    fontAngelinaText,
    fontBauhausLightText,
    fontBauhausMediumText,
    fontFrankText,
    fontHummingbirdText,
    fontAnaniasText,
    fontCorruptionText,
  ]);

  const enText = intl.formatMessage({ id: "settings.translations.en" });
  const deText = intl.formatMessage({ id: "settings.translations.de" });
  const frText = intl.formatMessage({ id: "settings.translations.fr" });
  const heText = intl.formatMessage({ id: "settings.translations.he" });
  const ruText = intl.formatMessage({ id: "settings.translations.ru" });
  const ukText = intl.formatMessage({ id: "settings.translations.uk" });
  const viText = intl.formatMessage({ id: "settings.translations.vi" });
  const translationsList = useMemo(() => {
    return [
      {
        id: "en",
        title: enText,
      },
      {
        id: "de",
        title: deText,
      },
      {
        id: "fr",
        title: frText,
      },
      {
        id: "he",
        title: heText,
      },
      {
        id: "ru",
        title: ruText,
      },
      {
        id: "uk",
        title: ukText,
      },
      {
        id: "vi",
        title: viText,
      },
    ];
  }, [enText, deText, frText, heText, ruText, ukText, viText]);

  const purpleText = intl.formatMessage({ id: "settings.themes.purple" });
  const coralText = intl.formatMessage({ id: "settings.themes.coral" });
  const mintText = intl.formatMessage({ id: "settings.themes.mint" });
  const roseText = intl.formatMessage({ id: "settings.themes.rose" });
  const sunText = intl.formatMessage({ id: "settings.themes.sun" });
  const oceanText = intl.formatMessage({ id: "settings.themes.ocean" });
  const beachText = intl.formatMessage({ id: "settings.themes.beach" });
  const themesList = useMemo(() => {
    return [
      {
        id: "purple",
        title: purpleText,
      },
      {
        id: "coral",
        title: coralText,
      },
      {
        id: "mint",
        title: mintText,
      },
      {
        id: "rose",
        title: roseText,
      },
      {
        id: "sun",
        title: sunText,
      },
      {
        id: "ocean",
        title: oceanText,
      },
      {
        id: "beach",
        title: beachText,
      },
    ];
  }, [
    purpleText,
    coralText,
    mintText,
    roseText,
    sunText,
    oceanText,
    beachText,
  ]);

  const [fontIsOpen, setFontIsOpen] = useState<boolean>(false);
  const [fontIconColor, setFontIconColor] = useState<string>("#FFFFFF");
  const [selectedFontId, setSelectedFontId] = useState<string>("nexaInfo");
  const [selectedFontTitleId, setSelectedFontTitleId] =
    useState<string>("nexaInfoTitle");
  const [fontInfoTextColor, setFontInfoTextColor] = useState<string>("#FFFFFF");
  const [fontInfoColor, setFontInfoColor] = useState<string>(color700);
  const [fontInfoIsOpen, setFontInfoIsOpen] = useState<boolean>(false);
  const [translateIsOpen, setTranslateIsOpen] = useState<boolean>(false);
  const [translateIconColor, setTranslateIconColor] =
    useState<string>("#FFFFFF");
  const [themeIsOpen, setThemeIsOpen] = useState<boolean>(false);
  const [themeIconColor, setThemeIconColor] = useState<string>("#FFFFFF");

  /**
   * Functions
   */
  const handlePressInFont = () => setFontIconColor(color300);
  const handlePressOutFont = () => setFontIconColor("#FFFFFF");
  const handlePressFont = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setFontIsOpen(!fontIsOpen);
    setTranslateIsOpen(false);
    setThemeIsOpen(false);
  };
  const handlePressInFontInfo = () => {
    // setFontInfoColor(color500);
    setFontInfoTextColor(color300);
  };
  const handlePressOutFontInfo = () => {
    // setFontInfoColor(color700);
    setFontInfoTextColor("#FFFFFF");
  };
  const handlePressFontInfo = () => {
    setFontInfoIsOpen(false);
  };

  const handlePressInTranslate = () => setTranslateIconColor(color300);
  const handlePressOutTranslate = () => setTranslateIconColor("#FFFFFF");
  const handlePressTranslate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTranslateIsOpen(!translateIsOpen);
    setFontIsOpen(false);
    setThemeIsOpen(false);
  };

  const handlePressInTheme = () => setThemeIconColor(color300);
  const handlePressOutTheme = () => setThemeIconColor("#FFFFFF");
  const handlePressTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setThemeIsOpen(!themeIsOpen);
    setFontIsOpen(false);
    setTranslateIsOpen(false);
  };

  const handleChangeFont = (id: string) => {
    changeFont(id);
  };
  const handleShowFontInfo = (id: string) => {
    setSelectedFontId(`${id}Info`);
    setSelectedFontTitleId(`${id}InfoTitle`);
    setFontInfoIsOpen(true);
  };
  const handleChangeLanguage = (id: string) => {
    changeLanguage(id);
  };
  const handleChangeTheme = (id: string) => {
    changeTheme(id);
  };

  /**
   * Components
   */
  const FontItem = ({ id, title }: { id: string; title: string }) => {
    let fontFamily = "NSL";
    switch (id) {
      case "nexa":
        fontFamily = "NSL";
        break;
      case "angelina":
        fontFamily = "ANGREG";
        break;
      case "ananias":
        fontFamily = "ANAREG";
        break;
      case "bauhaus_light":
        fontFamily = "BHL";
        break;
      case "bauhaus_medium":
        fontFamily = "BHM";
        break;
      case "frank":
        fontFamily = "FRNK";
        break;
      case "hummingbird":
        fontFamily = "HMGBRD";
        break;
      case "corruption":
        fontFamily = "CRPTN";
        break;
      case "roboto":
        fontFamily = "Roboto";
        break;
      case "serif":
        fontFamily = "serif";
        break;
      default:
        fontFamily = "NSL";
    }
    return (
      <Pressable
        onPress={() => handleChangeFont(id)}
        onLongPress={() => handleShowFontInfo(id)}
        style={{
          ...styles.menuItem,
          borderColor: selectedFont === fontFamily ? color500 : lightText,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.menuItemText,
            fontFamily: fontFamily,
            fontSize: selectedFont === fontFamily ? 32 : 24,
            color: selectedFont === fontFamily ? color300 : lightText,
            textDecorationLine:
              selectedFont === fontFamily ? "underline" : "none",
          }}
        >
          <FormattedMessage id={`settings.font.${id}`} defaultMessage={title} />
        </Text>
      </Pressable>
    );
  };
  const TranslateItem = ({ id, title }: { id: string; title: string }) => {
    return (
      <Pressable
        onPress={() => handleChangeLanguage(id)}
        style={{
          ...styles.menuItem,
          borderColor: id === currentLang ? color500 : lightText,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.menuItemText,
            fontFamily: selectedHeavyFont,
            fontSize: id === currentLang ? 32 : 24,
            textDecorationLine: id === currentLang ? "underline" : "none",
            color: id === currentLang ? color300 : lightText,
          }}
        >
          <FormattedMessage
            id={`settings.translations.${id}`}
            defaultMessage={title}
          />
        </Text>
      </Pressable>
    );
  };
  const ThemeItem = ({ id, title }: { id: string; title: string }) => {
    return (
      <Pressable
        onPress={() => handleChangeTheme(id)}
        style={{
          ...styles.menuItem,
          borderColor: id === currentTheme ? color500 : lightText,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.menuItemText,
            fontFamily: selectedHeavyFont,
            fontSize: id === currentTheme ? 32 : 24,
            textDecorationLine: id === currentTheme ? "underline" : "none",
            color: id === currentTheme ? color300 : lightText,
          }}
        >
          <FormattedMessage
            id={`settings.themes.${id}`}
            defaultMessage={title}
          />
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundImage uri={settingsBgUri}>
        <View style={styles.mainContainer}>
          <View
            style={{
              ...styles.topView,
              borderColor: lightText,
            }}
          ></View>
          {fontIsOpen && (
            <View
              style={{
                ...styles.settingsView,
                backgroundColor: color700,
                borderColor: lightText,
              }}
            >
              <Text
                style={{
                  ...styles.settingsTitle,
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                }}
              >
                <FormattedMessage
                  id="settings.title.font"
                  defaultMessage="Fonts"
                />
              </Text>
              <View
                style={{
                  ...styles.settingsContainer,
                  backgroundColor: color300,
                  borderColor: lightText,
                }}
              >
                <ScrollView>
                  {fontsList.map((item) => {
                    return (
                      <FontItem key={item.id} id={item.id} title={item.title} />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          {translateIsOpen && (
            <View
              style={{
                ...styles.settingsView,
                backgroundColor: color700,
                borderColor: lightText,
              }}
            >
              <Text
                style={{
                  ...styles.settingsTitle,
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                }}
              >
                <FormattedMessage
                  id="settings.title.translate"
                  defaultMessage="Translations"
                />
              </Text>
              <View
                style={{
                  ...styles.settingsContainer,
                  backgroundColor: color300,
                  borderColor: lightText,
                }}
              >
                <ScrollView>
                  {translationsList.map((item) => {
                    return (
                      <TranslateItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          {themeIsOpen && (
            <View
              style={{
                ...styles.settingsView,
                backgroundColor: color700,
                borderColor: lightText,
              }}
            >
              <Text
                style={{
                  ...styles.settingsTitle,
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                }}
              >
                <FormattedMessage
                  id="settings.title.theme"
                  defaultMessage="Themes"
                />
              </Text>
              <View
                style={{
                  ...styles.settingsContainer,
                  backgroundColor: color300,
                  borderColor: lightText,
                }}
              >
                <ScrollView>
                  {themesList.map((item) => {
                    return (
                      <ThemeItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          <View
            style={{
              ...styles.settingsControlsView,
              backgroundColor: color700,
              borderColor: lightText,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.settingsControls}>
              <Pressable
                onPressIn={handlePressInFont}
                onPressOut={handlePressOutFont}
                onPress={handlePressFont}
              >
                {!fontIsOpen ? (
                  <MaterialCommunityIcons
                    name="format-font"
                    size={48}
                    color={fontIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="wrench"
                    size={48}
                    color={fontIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInTranslate}
                onPressOut={handlePressOutTranslate}
                onPress={handlePressTranslate}
              >
                {!translateIsOpen ? (
                  <MaterialCommunityIcons
                    name="google-translate"
                    size={64}
                    color={translateIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="wrench"
                    size={64}
                    color={translateIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInTheme}
                onPressOut={handlePressOutTheme}
                onPress={handlePressTheme}
              >
                {!themeIsOpen ? (
                  <MaterialCommunityIcons
                    name="theme-light-dark"
                    size={48}
                    color={themeIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="wrench"
                    size={48}
                    color={themeIconColor}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <StatusBar
          hidden={true}
          translucent={true}
          backgroundColor="rgba(40,40,40,0.8)"
          style="dark"
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={fontInfoIsOpen}
        >
          <View style={styles.modal}>
            <View
              style={{
                ...styles.modalView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  ...styles.fontInfoTitle,
                  color: lightText,
                  textDecorationLine: "underline",
                  fontFamily: selectedHeavyFont,
                  fontSize: 28,
                }}
              >
                <FormattedMessage
                  id={`settings.font.${selectedFontTitleId}`}
                  defaultMessage={"Font Info"}
                />
              </Text>
              <View
                style={{
                  ...styles.fontInfoView,
                  backgroundColor: color300,
                }}
              >
                <Text
                  style={{
                    ...styles.fontInfoText,
                    color: color700,
                    fontFamily: selectedFont,
                    fontSize: 22,
                  }}
                >
                  <FormattedMessage
                    id={`settings.font.${"nexaInfo"}`}
                    defaultMessage={
                      "Font info and hints can be found here, my world."
                    }
                  />
                </Text>
              </View>
              <Pressable
                onPressIn={handlePressInFontInfo}
                onPressOut={handlePressOutFontInfo}
                onPress={handlePressFontInfo}
                style={{
                  ...styles.menuItem,
                  borderColor: fontInfoTextColor,
                  backgroundColor: fontInfoColor,
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    ...styles.menuItemText,
                    color: fontInfoTextColor,
                    fontFamily: selectedFont,
                    fontSize: 26,
                  }}
                >
                  <FormattedMessage id="notes.close" defaultMessage={"Close"} />
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    contentFit: "cover",
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  topView: {
    borderTopWidth: 6,
    width: "100%",
  },
  settingsView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 10,
  },
  settingsTitle: {
    fontSize: 32,
    textDecorationLine: "underline",
  },
  settingsContainer: {
    width: "90%",
    height: "90%",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    justifyContent: "center",
  },
  settingsControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  settingsControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  menuItem: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 24,
    textAlign: "center",
  },
  modal: {
    backgroundColor: "rgba(40,40,40,0.8)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalView: {
    height: "90%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  fontInfoTitle: {
    padding: 6,
  },
  fontInfoView: {
    width: "90%",
    height: "75%",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  fontInfoText: {},
});
