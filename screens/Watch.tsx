import {
  Animated,
  Easing,
  GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  ViewStyle,
} from "react-native";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Entypo,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ReactNode, useContext, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { LocalContext } from "../context/LocalContext";
import { BookContext } from "../context/BookContext";
import useGetPlaylists from "../hooks/useGetPlaylists";
import BackgroundImage from "../components/BackgroundImage";
import YTViewer from "../components/YTViewer";
import useCaptureEvent, { EventObject } from "../hooks/useCaptureEvent";

export default function Watch() {
  const intl = useIntl();
  const { captureEvent } = useCaptureEvent();
  const {
    color300,
    color500,
    color700,
    lightText,
    darkText,
    watchBgUri,
    currentTheme,
  } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont, currentFont } =
    useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { timeZone, currentLang } = useContext(LocalContext);
  const { currentBook } = useContext(BookContext);
  const { playlists } = useGetPlaylists();
  const [playlistsListIsOpen, setPlaylistsListIsOpen] =
    useState<boolean>(false);
  const [menuIconColor, setMenuIconColor] = useState<string>("#FFFFFF");
  const [tvIsOpen, setTvIsOpen] = useState<boolean>(false);
  const [tvIsOpenColor, setTvIsOpenColor] = useState<string>("#FFFFFF");
  const [previousVideoIconColor, setPreviousVideoIconColor] =
    useState<string>("#FFFFFF");
  const [nextVideoIconColor, setNextVideoIconColor] =
    useState<string>("#FFFFFF");
  const [notepadIsOpen, setNotepadIsOpen] = useState<boolean>(false);
  const [notepadIconColor, setNotepadIconColor] = useState<string>("#FFFFFF");
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
  const [currentPlaylistTitle, setCurrentPlaylistTitle] = useState<string>(
    playlists[0].title
  );
  const [currentPlaylistTitleId, setCurrentPlaylistTitleId] = useState<string>(
    playlists[0].id
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>(
    playlists[0].videos[0].title
  );
  const [currentVideoTitleId, setCurrentVideoTitleId] = useState<string>(
    playlists[0].videos[0].id
  );

  /**
   * Functions
   */
  const handlePressInMenu = () => setMenuIconColor(color300);
  const handlePressOutMenu = () => setMenuIconColor("#FFFFFF");
  const handlePressMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setPlaylistsListIsOpen(!playlistsListIsOpen);
    setTvIsOpen(false);
    setNotepadIsOpen(false);
  };
  const handlePressMenuItem = (i: number) => {
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Watch",
      context: "Select playlist",
      detail: `${playlists[i].title}`,
      description: `Playlist "${playlists[i].title}" selected`,
      timestamp: date.getTime(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedBook: currentBook,
        selectedLanguage: currentLang,
        selectedTheme: currentTheme,
        selectedFont: currentFont,
      },
    };
    captureEvent(newEvent);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setCurrentPlaylistIndex(i);
    setCurrentPlaylistTitle(playlists[i].title);
    setCurrentPlaylistTitleId(playlists[i].id);
    setCurrentVideoTitle(playlists[i].videos[0].title);
    setCurrentVideoTitleId(playlists[i].videos[0].id);
    setCurrentVideoIndex(0);
    setPlaylistsListIsOpen(false);
    setTvIsOpen(true);
    newEvent.context = "Watch video";
    newEvent.detail = `${playlists[i].videos[0].title}`;
    newEvent.description = `Video "${playlists[i].videos[0].title}" selected`;
    captureEvent(newEvent);
  };

  const handlePressInOpenCloseTv = () => setTvIsOpenColor(color300);
  const handlePressOutOpenCloseTv = () => setTvIsOpenColor("#FFFFFF");
  const handlePressOpenCloseTv = () => {
    if (!tvIsOpen) {
      const date = new Date();
      const newPlaylistEvent: EventObject = {
        name: "Press button",
        location: "Watch",
        context: "Play video",
        detail: `${playlists[currentPlaylistIndex].title}`,
        description: `Playlist "${playlists[currentPlaylistIndex].title}" selected`,
        timestamp: date.getTime(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        timeZone: timeZone || "UTC",
        constants: {
          selectedBook: currentBook,
          selectedLanguage: currentLang,
          selectedTheme: currentTheme,
          selectedFont: currentFont,
        },
      };
      const newVideoEvent: EventObject = {
        name: "Press button",
        location: "Watch",
        context: "Watch video",
        detail: `${playlists[currentPlaylistIndex].videos[currentVideoIndex].title}`,
        description: `Video "${playlists[currentPlaylistIndex].videos[currentVideoIndex].title}" selected`,
        timestamp: date.getTime(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        timeZone: timeZone || "UTC",
        constants: {
          selectedBook: currentBook,
          selectedLanguage: currentLang,
          selectedTheme: currentTheme,
          selectedFont: currentFont,
        },
      };
      captureEvent(newPlaylistEvent);
      captureEvent(newVideoEvent);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTvIsOpen(!tvIsOpen);
    setPlaylistsListIsOpen(false);
    setNotepadIsOpen(false);
  };

  const handlePressInPreviousVideo = () => setPreviousVideoIconColor(color300);
  const handlePressOutPreviousVideo = () =>
    setPreviousVideoIconColor("#FFFFFF");
  const handlePressPreviousVideo = () => {
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Watch",
      context: "Previous video",
      detail: "",
      description: "",
      timestamp: date.getTime(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedBook: currentBook,
        selectedLanguage: currentLang,
        selectedTheme: currentTheme,
        selectedFont: currentFont,
      },
    };
    console.log("currentVideoIndex:", currentVideoIndex);
    if (playlists[currentPlaylistIndex].videos[currentVideoIndex].index === 0) {
      newEvent.detail = `${
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos.length - 1
        ].title
      }`;
      newEvent.description = `Video "${
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos.length - 1
        ].title
      }" selected`;
      setCurrentVideoTitle(
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos.length - 1
        ].title
      );
      setCurrentVideoTitleId(
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos.length - 1
        ].id
      );
      setCurrentVideoIndex(playlists[currentPlaylistIndex].videos.length - 1);
    } else {
      newEvent.detail = `${
        playlists[currentPlaylistIndex].videos[currentVideoIndex - 1].title
      }`;
      newEvent.description = `Video "${
        playlists[currentPlaylistIndex].videos[currentVideoIndex - 1].title
      }" selected`;
      setCurrentVideoTitle(
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos[currentVideoIndex].index - 1
        ].title
      );
      setCurrentVideoTitleId(
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos[currentVideoIndex].index - 1
        ].id
      );
      setCurrentVideoIndex(
        playlists[currentPlaylistIndex].videos[currentVideoIndex].index - 1
      );
    }
    captureEvent(newEvent);
  };

  const handlePressInNextVideo = () => setNextVideoIconColor(color300);
  const handlePressOutNextVideo = () => setNextVideoIconColor("#FFFFFF");
  const handlePressNextVideo = () => {
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Watch",
      context: "Next video",
      detail: "",
      description: "",
      timestamp: date.getTime(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedBook: currentBook,
        selectedLanguage: currentLang,
        selectedTheme: currentTheme,
        selectedFont: currentFont,
      },
    };
    console.log("currentVideoIndex:", currentVideoIndex);
    if (
      playlists[currentPlaylistIndex].videos[currentVideoIndex].index ===
      playlists[currentPlaylistIndex].videos.length - 1
    ) {
      newEvent.detail = `${playlists[currentPlaylistIndex].videos[0].title}`;
      newEvent.description = `Video "${playlists[currentPlaylistIndex].videos[0].title}" selected`;
      setCurrentVideoTitle(playlists[currentPlaylistIndex].videos[0].title);
      setCurrentVideoTitleId(playlists[currentPlaylistIndex].videos[0].id);
      setCurrentVideoIndex(0);
    } else {
      newEvent.detail = `${
        playlists[currentPlaylistIndex].videos[currentVideoIndex + 1].title
      }`;
      newEvent.description = `Video "${
        playlists[currentPlaylistIndex].videos[currentVideoIndex + 1].title
      }" selected`;
      setCurrentVideoTitle(
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos[currentVideoIndex].index + 1
        ].title
      );
      setCurrentVideoTitleId(
        playlists[currentPlaylistIndex].videos[
          playlists[currentPlaylistIndex].videos[currentVideoIndex].index + 1
        ].id
      );
      setCurrentVideoIndex(
        playlists[currentPlaylistIndex].videos[currentVideoIndex].index + 1
      );
    }
    captureEvent(newEvent);
  };

  const handlePressInNotepad = () => setNotepadIconColor(color300);
  const handlePressOutNotepad = () => setNotepadIconColor("#FFFFFF");
  const handlePressNotepad = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setNotepadIsOpen(!notepadIsOpen);
    setPlaylistsListIsOpen(false);
    setTvIsOpen(false);
  };

  /**
   * Components
   */
  const MenuItem = ({
    children,
    style,
  }: {
    children: ReactNode;
    style: ViewStyle;
  }) => {
    return <View style={style}>{children}</View>;
  };

  const SectionItem = ({
    title,
    id,
    onPress,
  }: {
    title: string;
    id: string;
    onPress: (title: GestureResponderEvent) => void;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={{
          ...styles.playlistSectionButton,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.playlistSectionText,
            color: lightText,
            fontFamily: selectedHeavyFont,
          }}
        >
          <FormattedMessage
            id={`listen.infoBookmarkMenu.${id}`}
            defaultMessage={title}
          />
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundImage uri={watchBgUri}>
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {tvIsOpen && (
            <View
              style={{
                ...styles.tvView,
                backgroundColor: color700,
                paddingTop: 20,
                // flex: 1,
              }}
            >
              <View
                style={{
                  ...styles.saveNoteContainer,
                  backgroundColor: color700,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: selectedHeavyFont,
                    textDecorationLine: "underline",
                    textAlign: "center",
                    fontSize: 32,
                    color: lightText,
                  }}
                >
                  <FormattedMessage
                    id={currentPlaylistTitleId}
                    defaultMessage={currentPlaylistTitle}
                  />
                </Text>
              </View>
              <View
                style={{
                  ...styles.saveNoteContainer,
                  backgroundColor: color700,
                  paddingVertical: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: selectedHeavyFont,
                    // textDecorationLine: "underline",
                    textAlign: "center",
                    fontSize: 26,
                    color: lightText,
                  }}
                >
                  <FormattedMessage
                    id={currentVideoTitleId}
                    defaultMessage={currentVideoTitle}
                  />
                </Text>
              </View>
              <YTViewer
                videoId={
                  playlists[currentPlaylistIndex].videos[currentVideoIndex]
                    .videoId
                }
              />
              {/* <View
                style={{
                  ...styles.saveNoteContainer,
                  backgroundColor: color700,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: selectedHeavyFont,
                    // textDecorationLine: "underline",
                    textAlign: "center",
                    fontSize: 26,
                    color: lightText,
                  }}
                >
                  <FormattedMessage
                    id={currentVideoTitleId}
                    defaultMessage={currentVideoTitle}
                  />
                </Text>
              </View> */}
            </View>
          )}
          {playlistsListIsOpen && (
            <View
              style={{
                ...styles.tvView,
                backgroundColor: color700,
              }}
            >
              <View
                style={{
                  ...styles.page,
                  backgroundColor: color300,
                }}
              >
                <ScrollView>
                  {playlists.map((item, i) => {
                    return (
                      <Pressable
                        key={item.title}
                        onPress={() => handlePressMenuItem(i)}
                      >
                        <MenuItem
                          style={{
                            ...styles.menuItem,
                            borderColor: lightText,
                            backgroundColor: color700,
                          }}
                        >
                          <Text
                            style={{
                              ...styles.menuItemText,
                              color: lightText,
                              fontFamily:
                                playlists[currentPlaylistIndex].title ===
                                item.title
                                  ? selectedHeavyFont
                                  : selectedFont,
                              textAlign: "center",
                            }}
                          >
                            <FormattedMessage
                              id={`${item.id}`}
                              defaultMessage={item.title}
                              values={{
                                u: (chunks) => (
                                  <Text
                                    style={{
                                      textDecorationLine: "underline",
                                    }}
                                  >
                                    {chunks}
                                  </Text>
                                ),
                              }}
                            />
                          </Text>
                          <Text
                            style={{
                              ...styles.menuItemText,
                              fontSize: 20,
                              color: lightText,
                              fontFamily:
                                playlists[currentPlaylistIndex].title ===
                                item.title
                                  ? selectedHeavyFont
                                  : selectedFont,
                              textAlign: "center",
                            }}
                          >
                            {` (${item.videos.length} videos)`}
                          </Text>
                        </MenuItem>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          <View
            style={{
              ...styles.tvControlsView,
              backgroundColor: color700,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.tvControls}>
              <Pressable
                onPressIn={handlePressInMenu}
                onPressOut={handlePressOutMenu}
                onPress={handlePressMenu}
                style={{}}
              >
                {!playlistsListIsOpen ? (
                  <Entypo name="menu" size={48} color={menuIconColor} />
                ) : (
                  <Entypo
                    name="triangle-down"
                    size={48}
                    color={menuIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInPreviousVideo}
                onPressOut={handlePressOutPreviousVideo}
                onPress={handlePressPreviousVideo}
                style={{}}
                disabled={!tvIsOpen}
              >
                <AntDesign
                  name="stepbackward"
                  size={48}
                  color={tvIsOpen ? previousVideoIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInOpenCloseTv}
                onPressOut={handlePressOutOpenCloseTv}
                onPress={handlePressOpenCloseTv}
                style={styles.openTvIcon}
              >
                {!tvIsOpen ? (
                  <Octicons name="video" size={64} color={tvIsOpenColor} />
                ) : (
                  <Entypo name="folder-video" size={64} color={tvIsOpenColor} />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInNextVideo}
                onPressOut={handlePressOutNextVideo}
                onPress={handlePressNextVideo}
                style={{}}
                disabled={!tvIsOpen}
              >
                <AntDesign
                  name="stepforward"
                  size={48}
                  color={tvIsOpen ? nextVideoIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInNotepad}
                onPressOut={handlePressOutNotepad}
                onPress={handlePressNotepad}
                style={{}}
              >
                {!notepadIsOpen ? (
                  <MaterialCommunityIcons
                    name="notebook"
                    size={48}
                    color={notepadIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="pencil-box-multiple"
                    size={48}
                    color={notepadIconColor}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
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
  },
  topView: {
    borderTopWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
  },
  tvView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  page: {
    width: "90%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 12,
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
  },
  mainSubtitle: {
    fontSize: 28,
    textAlign: "center",
  },
  author: {
    fontSize: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 28,
    textAlign: "center",
  },
  chapterTitle: {
    fontSize: 26,
    textAlign: "center",
  },
  chapterContent: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 2,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    padding: 6,
  },
  tvControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  tvControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  openTvIcon: {
    padding: 6,
  },
  menuItem: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 24,
  },
  saveNoteContainer: {
    // width: "90%",
    padding: 6,
    // borderRadius: 12,
    // borderWidth: 4,
    // borderColor: "#FFFFFF",
  },
  saveNoteButton: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
  },
  saveNoteText: {
    fontSize: 24,
  },
  playlistSectionButton: {
    padding: 6,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 4,
  },
  playlistSectionText: {
    fontSize: 20,
    textAlign: "center",
  },
});
