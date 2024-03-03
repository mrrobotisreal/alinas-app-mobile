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
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ReactNode, useContext, useRef, useState } from "react";
import { useGetTexts } from "../hooks/useGetTexts";
import { useGetAudioList } from "../hooks/useGetAudioList";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { BookContext } from "../context/BookContext";
import BackgroundImage from "../components/BackgroundImage";
import Reader from "../components/Reader";
import Toast from "react-native-root-toast";

export default function Read() {
  const intl = useIntl();
  const { color300, color500, color700, lightText, darkText, readBgUri } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { currentBook, sectionItems, pageSVRef } = useContext(BookContext);
  const { audioList } = useGetAudioList();
  const { textsList } = useGetTexts();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [pagePosition, setPagePosition] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [tableOfContentsIsOpen, setTableOfContentsIsOpen] =
    useState<boolean>(false);
  const [menuIconColor, setMenuIconColor] = useState<string>("#FFFFFF");
  const [bookIsOpen, setBookIsOpen] = useState<boolean>(false);
  const [bookIsOpenColor, setBookIsOpenColor] = useState<string>("#FFFFFF");
  const [previousPageIconColor, setPreviousPageIconColor] =
    useState<string>("#FFFFFF");
  const [nextPageIconColor, setNextPageIconColor] = useState<string>("#FFFFFF");
  const [notepadIsOpen, setNotepadIsOpen] = useState<boolean>(false);
  const [notepadIconColor, setNotepadIconColor] = useState<string>("#FFFFFF");
  const [saveNoteColor, setSaveNoteColor] = useState<string>(color700);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectSectionColor, setSelectSectionColor] =
    useState<string>(color700);
  const [selectSectionIsVisible, setSelectSectionIsVisible] =
    useState<boolean>(false);
  const [selectedSectionId, setSelectedSectionId] =
    useState<string>("read.selectSection");
  const subjectPlaceholder = intl.formatMessage({
    id: "notes.subject.placeholder",
  });
  const [subjectText, setSubjectText] = useState<string>("");
  const noteTextPlaceholder = intl.formatMessage({
    id: "notes.noteText.placeholder",
  });
  const [noteText, setNoteText] = useState<string>("");
  const toastDropdownText = intl.formatMessage({ id: "toast.dropdown" });
  const toastSubjectText = intl.formatMessage({ id: "toast.subject" });
  const toastNoteTextText = intl.formatMessage({ id: "toast.noteText" });

  /**
   * Functions
   */
  const handlePressInMenu = () => setMenuIconColor(color300);
  const handlePressOutMenu = () => setMenuIconColor("#FFFFFF");
  const handlePressMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTableOfContentsIsOpen(!tableOfContentsIsOpen);
    setBookIsOpen(false);
    setNotepadIsOpen(false);
    setSelectSectionIsVisible(false);
  };
  const handlePressMenuItem = (i: number) => {
    setCurrentPageIndex(i);
    setTableOfContentsIsOpen(false);
    setBookIsOpen(true);
  };

  const handlePressInPreviousPage = () => setPreviousPageIconColor(color300);
  const handlePressOutPreviousPage = () => setPreviousPageIconColor("#FFFFFF");
  const handlePressPreviousPage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => {
      setCurrentPageIndex(
        currentPageIndex === 0 ? textsList.length - 1 : currentPageIndex - 1
      );
    }, 200);
    animatePageRight();
    pageSVRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const animatePageRight = () => {
    Animated.timing(pagePosition, {
      toValue: { x: 400, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setPagePosition(new Animated.ValueXY({ x: 0, y: 0 }));
      setTimeout(() => animatePageFromLeft(), 250);
    }, 300);
  };
  const animatePageFromLeft = () => {
    Animated.timing(pagePosition, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const handlePressInOpenCloseBook = () => setBookIsOpenColor(color300);
  const handlePressOutOpenCloseBook = () => setBookIsOpenColor("#FFFFFF");
  const handlePressOpenCloseBook = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setBookIsOpen(!bookIsOpen);
    setTableOfContentsIsOpen(false);
    setNotepadIsOpen(false);
    setSelectSectionIsVisible(false);
    pageSVRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handlePressInNextPage = () => setNextPageIconColor(color300);
  const handlePressOutNextPage = () => setNextPageIconColor("#FFFFFF");
  const handlePressNextPage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => {
      setCurrentPageIndex(
        currentPageIndex === textsList.length - 1 ? 0 : currentPageIndex + 1
      );
    }, 200);
    animatePageLeft();
    pageSVRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const animatePageLeft = () => {
    Animated.timing(pagePosition, {
      toValue: { x: -400, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setPagePosition(new Animated.ValueXY({ x: 0, y: 0 }));
      setTimeout(() => animatePageFromRight(), 250);
    }, 300);
    // setTimeout(() => animatePageFromRight(), 350);
  };
  const animatePageFromRight = () => {
    Animated.timing(pagePosition, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const handlePressInNotepad = () => setNotepadIconColor(color300);
  const handlePressOutNotepad = () => setNotepadIconColor("#FFFFFF");
  const handlePressNotepad = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setNotepadIsOpen(!notepadIsOpen);
    setTableOfContentsIsOpen(false);
    setBookIsOpen(false);
    setSelectSectionIsVisible(false);
  };
  const handlePressInSelectSection = () => setSelectSectionColor(color500);
  const handlePressOutSelectSection = () => setSelectSectionColor(color700);
  const handlePressSelectSection = () => {
    setTableOfContentsIsOpen(false);
    setBookIsOpen(false);
    setNotepadIsOpen(false);
    setSelectSectionIsVisible(true);
  };
  const handleSelectSection = (title: string, id: string) => {
    setSelectedSection(title);
    setTableOfContentsIsOpen(false);
    setBookIsOpen(false);
    setSelectSectionIsVisible(false);
    setNotepadIsOpen(true);
    setSelectedSectionId(`listen.infoBookmarkMenu.myExternalCause.${id}`);
  };
  const handlePressInSaveNote = () => setSaveNoteColor(color500);
  const handlePressOutSaveNote = () => setSaveNoteColor(color700);
  const handlePressSaveNote = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // create hook to call server with axios
    // on success or failure, show toast
    if (!selectedSection || selectedSection === "") {
      if (OS === "android") {
        ToastAndroid.show(toastDropdownText, ToastAndroid.LONG);
      } else if (OS === "ios") {
        const toast = Toast.show(toastDropdownText, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
      return;
    } else if (!subjectText || subjectText === "") {
      if (OS === "android") {
        ToastAndroid.show(toastSubjectText, ToastAndroid.LONG);
      } else if (OS === "ios") {
        const toast = Toast.show(toastSubjectText, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
      return;
    } else if (!noteText || noteText === "") {
      if (OS === "android") {
        ToastAndroid.show(toastNoteTextText, ToastAndroid.LONG);
      } else if (OS === "ios") {
        const toast = Toast.show(toastNoteTextText, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
      return;
    }
    setSelectedSection("General");
    setSubjectText("");
    setNoteText("");
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
          ...styles.notesSectionButton,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.notesSectionText,
            color: lightText,
            fontFamily: selectedHeavyFont,
          }}
        >
          <FormattedMessage
            id={`listen.infoBookmarkMenu.myExternalCause.${id}`}
            defaultMessage={title}
          />
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundImage uri={readBgUri}>
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {bookIsOpen && (
            <Reader
              currentPageIndex={currentPageIndex}
              pagePosition={pagePosition}
            />
          )}
          {tableOfContentsIsOpen && (
            <View
              style={{
                ...styles.bookView,
                backgroundColor: color700,
              }}
            >
              <View style={styles.page}>
                <ScrollView>
                  {textsList.map((item, i) => {
                    return (
                      <Pressable
                        key={item.title}
                        onPress={() => handlePressMenuItem(i)}
                      >
                        <MenuItem
                          style={{
                            ...styles.menuItem,
                            borderColor: color700,
                            backgroundColor: color300,
                          }}
                        >
                          <Text
                            style={{
                              ...styles.menuItemText,
                              color: darkText,
                              fontFamily:
                                textsList[currentPageIndex].title === item.title
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
                        </MenuItem>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          {notepadIsOpen && (
            <View
              style={{
                ...styles.bookView,
                backgroundColor: color700,
              }}
            >
              <View
                style={{
                  ...styles.saveNoteContainer,
                  backgroundColor: color300,
                  height: "80%",
                  paddingTop: 10,
                }}
              >
                <Text
                  style={{
                    ...styles.saveNoteText,
                    fontFamily: selectedHeavyFont,
                    textDecorationLine: "underline",
                    textAlign: "left",
                    fontSize: 22,
                    color: darkText,
                  }}
                >
                  <FormattedMessage
                    id="read.selectSection"
                    defaultMessage="Select a section"
                  />
                </Text>
                <Pressable
                  onPressIn={handlePressInSelectSection}
                  onPressOut={handlePressOutSelectSection}
                  onPress={handlePressSelectSection}
                  style={{
                    ...styles.menuItem,
                    borderColor: "#FFFFFF",
                    backgroundColor: selectSectionColor,
                    width: "100%",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.menuItemText,
                      color: lightText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    <FormattedMessage
                      id={selectedSectionId}
                      // defaultMessage={selectedSection}
                    />
                  </Text>
                </Pressable>
                <ScrollView>
                  <View>
                    <Text
                      style={{
                        ...styles.saveNoteText,
                        color: darkText,
                        fontFamily: selectedHeavyFont,
                        textAlign: "left",
                        textDecorationLine: "underline",
                        paddingTop: 5,
                        fontSize: 22,
                      }}
                    >
                      <FormattedMessage
                        id="notes.write.subject.title"
                        defaultMessage="Subject"
                      />
                    </Text>
                    <TextInput
                      placeholder={subjectPlaceholder}
                      style={{
                        ...styles.saveNoteText,
                        color: darkText,
                        backgroundColor: "#FFFFFF",
                        fontFamily: selectedHeavyFont,
                        padding: 6,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: color700,
                        fontSize: 18,
                      }}
                      onChangeText={setSubjectText}
                      value={subjectText}
                      multiline={true}
                      numberOfLines={1}
                    />
                    <Text
                      style={{
                        ...styles.saveNoteText,
                        color: darkText,
                        fontFamily: selectedHeavyFont,
                        textAlign: "left",
                        textDecorationLine: "underline",
                        paddingTop: 5,
                        fontSize: 22,
                      }}
                    >
                      <FormattedMessage
                        id="notes.write.content.title"
                        defaultMessage="Content"
                      />
                    </Text>
                    <TextInput
                      placeholder={noteTextPlaceholder}
                      style={{
                        ...styles.saveNoteText,
                        color: darkText,
                        backgroundColor: "#FFFFFF",
                        fontFamily: selectedHeavyFont,
                        padding: 6,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: color700,
                        fontSize: 18,
                      }}
                      onChangeText={setNoteText}
                      value={noteText}
                      multiline={true}
                      numberOfLines={6}
                    />
                  </View>
                </ScrollView>
              </View>
              <Pressable
                onPressIn={handlePressInSaveNote}
                onPressOut={handlePressOutSaveNote}
                onPress={handlePressSaveNote}
                style={{
                  ...styles.saveNoteButton,
                  backgroundColor: saveNoteColor,
                  alignItems: "center",
                  alignSelf: "center",
                  width: "50%",
                  marginBottom: 2,
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    ...styles.saveNoteText,
                    color: lightText,
                    fontFamily: selectedHeavyFont,
                  }}
                >
                  <FormattedMessage
                    id="read.saveNote"
                    defaultMessage="Save note"
                  />
                </Text>
              </Pressable>
            </View>
          )}
          {selectSectionIsVisible && (
            <View
              style={{
                ...styles.bookView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  ...styles.menuItemText,
                  fontFamily: selectedHeavyFont,
                  textDecorationLine: "underline",
                  textAlign: "center",
                  fontSize: 22,
                  color: lightText,
                }}
              >
                <FormattedMessage
                  id="read.selectSection"
                  defaultMessage="Select a section"
                />
              </Text>
              <View
                style={{
                  ...styles.page,
                  backgroundColor: color300,
                  height: "80%",
                  paddingTop: 10,
                }}
              >
                <ScrollView>
                  {sectionItems.map((item) => {
                    return (
                      <SectionItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        onPress={() => handleSelectSection(item.title, item.id)}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          <View
            style={{
              ...styles.bookControlsView,
              backgroundColor: color700,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.bookControls}>
              <Pressable
                onPressIn={handlePressInMenu}
                onPressOut={handlePressOutMenu}
                onPress={handlePressMenu}
                style={{}}
              >
                {!tableOfContentsIsOpen ? (
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
                onPressIn={handlePressInPreviousPage}
                onPressOut={handlePressOutPreviousPage}
                onPress={handlePressPreviousPage}
                style={{}}
                disabled={!bookIsOpen}
              >
                <MaterialCommunityIcons
                  name="page-previous"
                  size={48}
                  color={bookIsOpen ? previousPageIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInOpenCloseBook}
                onPressOut={handlePressOutOpenCloseBook}
                onPress={handlePressOpenCloseBook}
                style={styles.openBookIcon}
              >
                {!bookIsOpen ? (
                  <FontAwesome5 name="book" size={64} color={bookIsOpenColor} />
                ) : (
                  <FontAwesome5
                    name="book-reader"
                    size={64}
                    color={bookIsOpenColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInNextPage}
                onPressOut={handlePressOutNextPage}
                onPress={handlePressNextPage}
                style={{}}
                disabled={!bookIsOpen}
              >
                <MaterialCommunityIcons
                  name="page-next"
                  size={48}
                  color={bookIsOpen ? nextPageIconColor : "#808080"}
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
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={selectSectionIsVisible}
        >
          <View
            style={{
              ...styles.bookView,
              backgroundColor: color700,
            }}
          >
            <Text
              style={{
                ...styles.menuItemText,
                fontFamily: selectedHeavyFont,
                textDecorationLine: "underline",
                textAlign: "center",
                fontSize: 22,
                color: lightText,
              }}
            >
              <FormattedMessage
                id="read.selectSection"
                defaultMessage="Select a section"
              />
            </Text>
            <View
              style={{
                ...styles.page,
                backgroundColor: color300,
                height: "80%",
                paddingTop: 10,
              }}
            >
              <ScrollView>
                {sectionItems.map((item) => {
                  return (
                    <SectionItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      onPress={() => handleSelectSection(item.title, item.id)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal> */}
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
  bookView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
  bookControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  bookControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  openBookIcon: {
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
    width: "90%",
    height: "90%",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#FFFFFF",
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
  notesSectionButton: {
    padding: 6,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 4,
  },
  notesSectionText: {
    fontSize: 20,
    textAlign: "center",
  },
});
