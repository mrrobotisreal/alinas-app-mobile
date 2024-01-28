import {
  Animated,
  Easing,
  GestureResponderEvent,
  ImageBackground,
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
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useGetTexts } from "../hooks/useGetTexts";
import { useGetAudioList } from "../hooks/useGetAudioList";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { Image } from "expo-image";

const sectionItems = [
  {
    title: "General",
    id: "general",
  },
  {
    title: "Introduction",
    id: "introduction",
  },
  {
    title: "The Anatomy of Everything",
    id: "anatomy_of_everything",
  },
  {
    title: "My Love",
    id: "my_love",
  },
  {
    title: "My Happiness",
    id: "my_happiness",
  },
  {
    title: "My Strength",
    id: "my_strength",
  },
  {
    title: "My Inspiration and My Motivation",
    id: "my_inspiration_and_my_motivation",
  },
  {
    title: "My Peace",
    id: "my_peace",
  },
  {
    title: "My Home",
    id: "my_home",
  },
  {
    title: "Where are they going?\nWhere are we going?",
    id: "where_are_they_going",
  },
  {
    title: "I want EVERYTHING with you",
    id: "i_want_everything_with_you",
  },
  {
    title: "Особлива кінцівка, частина 1",
    id: "outro_part_1",
  },
  {
    title: "Особлива кінцівка, частина 2",
    id: "outro_part_2",
  },
];

export default function Read() {
  const intl = useIntl();
  const pageSVRef = useRef<ScrollView>();
  const { color300, color500, color700, lightText, darkText, readBgUri } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
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
  const [selectedSection, setSelectedSection] = useState<string>("General");
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
        currentPageIndex === 0 ? audioList.length - 1 : currentPageIndex - 1
      );
    }, 200);
    animatePageRight();
    pageSVRef.current?.scrollTo({
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
    pageSVRef.current?.scrollTo({
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
        currentPageIndex === audioList.length - 1 ? 0 : currentPageIndex + 1
      );
    }, 200);
    animatePageLeft();
    pageSVRef.current?.scrollTo({
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
  };
  const handlePressInSelectSection = () => setSelectSectionColor(color500);
  const handlePressOutSelectSection = () => setSelectSectionColor(color700);
  const handlePressSelectSection = () => {
    setSelectSectionIsVisible(true);
  };
  const handleSelectSection = (title: string, id: string) => {
    setSelectedSection(title);
    setSelectSectionIsVisible(false);
    setSelectedSectionId(`listen.infoBookmarkMenu.${id}`);
  };
  const handlePressInSaveNote = () => setSaveNoteColor(color500);
  const handlePressOutSaveNote = () => setSaveNoteColor(color700);
  const handlePressSaveNote = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // create hook to call server with axios
    // on success or failure, show toast
    if (!selectedSection || selectedSection === "") {
      ToastAndroid.show(toastDropdownText, ToastAndroid.SHORT);
      return;
    } else if (!subjectText || subjectText === "") {
      ToastAndroid.show(toastSubjectText, ToastAndroid.SHORT);
      return;
    } else if (!noteText || noteText === "") {
      ToastAndroid.show(toastNoteTextText, ToastAndroid.SHORT);
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
            id={`listen.infoBookmarkMenu.${id}`}
            defaultMessage={title}
          />
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: readBgUri,
        }}
        style={styles.imageBackground}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {!bookIsOpen ? null : (
            <View
              style={{
                ...styles.bookView,
                backgroundColor: color700,
              }}
            >
              <Animated.View
                style={[
                  {
                    ...styles.page,
                  },
                  pagePosition.getLayout(),
                ]}
              >
                <ScrollView ref={pageSVRef}>
                  {textsList.map((txt) => {
                    if (txt.index === currentPageIndex) {
                      return txt.components.map((comp) => {
                        switch (comp.type) {
                          case "main_title":
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.mainTitle,
                                  color: darkText,
                                  fontFamily: selectedHeavyFont,
                                }}
                              >
                                <FormattedMessage
                                  id={comp.id}
                                  defaultMessage={comp.title}
                                  values={{
                                    s: (chunks) => (
                                      <Text
                                        style={{
                                          textDecorationLine: "line-through",
                                        }}
                                      >
                                        {chunks}
                                      </Text>
                                    ),
                                  }}
                                />
                              </Text>
                            );
                          case "main_subtitle":
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.mainSubtitle,
                                  color: darkText,
                                  fontFamily: selectedHeavyFont,
                                }}
                              >
                                <FormattedMessage
                                  id={comp.id}
                                  defaultMessage={comp.title}
                                />
                              </Text>
                            );
                          case "author":
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.author,
                                  color: darkText,
                                  fontFamily: selectedFont,
                                }}
                              >
                                <FormattedMessage
                                  id={comp.id}
                                  defaultMessage={comp.title}
                                  values={{
                                    b: (chunks) => (
                                      <Text
                                        style={{
                                          fontFamily: selectedHeavyFont,
                                        }}
                                      >
                                        {chunks}
                                      </Text>
                                    ),
                                  }}
                                />
                              </Text>
                            );
                          case "section_title":
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.sectionTitle,
                                  color: darkText,
                                  fontFamily: selectedHeavyFont,
                                }}
                              >
                                <FormattedMessage
                                  id={comp.id}
                                  defaultMessage={comp.title}
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
                            );
                          case "chapter_title":
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.chapterTitle,
                                  color: darkText,
                                  fontFamily: selectedHeavyFont,
                                }}
                              >
                                <FormattedMessage
                                  id={comp.id}
                                  defaultMessage={comp.title}
                                />
                              </Text>
                            );
                          case "chapter_content":
                            if (comp.imageUri && comp.imageUri?.length > 0) {
                              return (
                                <View
                                  key={comp.id}
                                  style={styles.imageContainer}
                                >
                                  {comp.imageUri?.map((src) => {
                                    switch (src) {
                                      case "../assets/images/my_love/ruby.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 40,
                                              marginBottom: 40,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_love/ruby.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "../assets/images/my_love/rose.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 40,
                                              marginBottom: 60,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_love/rose.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "../assets/images/my_happiness/alina_and_i_prague.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 40,
                                              marginBottom: 60,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_happiness/alina_and_i_prague.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "../assets/images/my_strength/steel_wire.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 80,
                                              marginBottom: 70,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_strength/steel_wire.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "../assets/images/my_strength/compass.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 30,
                                              marginBottom: 110,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_strength/compass.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_inspiration_and_my_motivation/lightbulb.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "4%",
                                              marginTop: 90,
                                              marginBottom: 90,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_inspiration_and_my_motivation/lightbulb.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_inspiration_and_my_motivation/sun.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "3%",
                                              marginTop: 30,
                                              marginBottom: 90,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_inspiration_and_my_motivation/sun.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_inspiration_and_my_motivation/sun_lightbulb.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "4%",
                                              marginTop: 30,
                                              marginBottom: 90,
                                              paddingBottom: 20,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_inspiration_and_my_motivation/sun_lightbulb.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_peace/ripple.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 100,
                                              paddingTop: 20,
                                              marginBottom: 100,
                                              paddingBottom: 30,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_peace/ripple.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_peace/wave.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 20,
                                              marginBottom: 110,
                                              paddingBottom: 20,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_peace/wave.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_peace/sunset.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 20,
                                              marginBottom: 100,
                                              paddingBottom: 20,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_peace/sunset.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_peace/storm.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 30,
                                              marginBottom: 100,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_peace/storm.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_peace/galaxy.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 50,
                                              marginBottom: 140,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_peace/galaxy.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_home/alina.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              paddingTop: 10,
                                              marginTop: 120,
                                              marginBottom: 50,
                                              paddingBottom: 40,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_home/alina.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_home/pajamas.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 60,
                                              marginBottom: 100,
                                              paddingBottom: 40,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_home/pajamas.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_home/pictures.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 10,
                                              marginBottom: 60,
                                              paddingBottom: 40,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_home/pictures.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_home/portal.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 50,
                                              marginBottom: 70,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_home/portal.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/my_home/river.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "5%",
                                              marginTop: 80,
                                              marginBottom: 140,
                                              paddingBottom: 20,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/my_home/river.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      case "..assets/images/where_are_they_going/where_are_they_going.png":
                                        return (
                                          <View
                                            key={src}
                                            style={{
                                              width: "100%",
                                              height: "20%",
                                              marginTop: 10,
                                              marginBottom: 40,
                                            }}
                                          >
                                            <Image
                                              source={{
                                                uri: "http://192.168.4.22:9090/assets/myExternalCause_images/where_are_they_going/where_are_they_going.png",
                                              }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                              }}
                                            />
                                          </View>
                                        );
                                      default:
                                        return null;
                                    }
                                  })}
                                  <Text
                                    style={{
                                      ...styles.chapterContent,
                                      color: darkText,
                                      fontFamily: selectedFont,
                                    }}
                                  >
                                    <FormattedMessage
                                      id={comp.id}
                                      defaultMessage={comp.title}
                                      values={{
                                        i: (chunks) => (
                                          <Text
                                            style={{
                                              fontFamily: selectedHeavyFont,
                                            }}
                                          >
                                            {chunks}
                                          </Text>
                                        ),
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
                                </View>
                              );
                            }
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.chapterContent,
                                  color: darkText,
                                  fontFamily: selectedFont,
                                }}
                              >
                                <FormattedMessage
                                  id={comp.id}
                                  defaultMessage={comp.title}
                                  values={{
                                    i: (chunks) => (
                                      <Text
                                        style={{
                                          fontFamily: selectedHeavyFont,
                                        }}
                                      >
                                        {chunks}
                                      </Text>
                                    ),
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
                            );
                          default:
                            return (
                              <Text
                                key={comp.id}
                                style={{
                                  ...styles.chapterTitle,
                                  color: darkText,
                                  fontFamily: selectedHeavyFont,
                                }}
                              >
                                Empty
                              </Text>
                            );
                        }
                      });
                    }
                  })}
                </ScrollView>
              </Animated.View>
            </View>
          )}
          {!tableOfContentsIsOpen ? null : (
            <View
              style={{
                ...styles.bookView,
                backgroundColor: color700,
              }}
            >
              <View style={styles.page}>
                <ScrollView>
                  {audioList.map((item, i) => {
                    return (
                      <Pressable
                        key={item.id}
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
                                audioList[currentPageIndex].title === item.title
                                  ? selectedHeavyFont
                                  : selectedFont,
                              textAlign: "center",
                            }}
                          >
                            <FormattedMessage
                              id={`listen.infoBookmarkMenu.${item.id}`}
                              defaultMessage={item.title}
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
          {!notepadIsOpen ? null : (
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
                      multiline={false}
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
        <Modal
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
        </Modal>
      </ImageBackground>
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
