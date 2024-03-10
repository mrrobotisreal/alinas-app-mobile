import { useContext, useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { FormattedMessage, useIntl } from "react-intl";
import { serverURL } from "../constants/urls";
import { Image } from "expo-image";
import Toast from "react-native-root-toast";
import useCaptureEvent, { EventObject } from "../hooks/useCaptureEvent";

/**
 * Context
 */
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { BookContext } from "../context/BookContext";
import { LocalContext } from "../context/LocalContext";

const bookList: string[] = [
  "My External Cause",
  "The Judge",
  "The Dreamy Man",
  "Passportal",
  "Love Drunk",
];

type MenuItem = {
  id: string;
  title: string;
};

type MenuItemNodeProps = {
  title: string;
  onPress: (item: GestureResponderEvent) => void;
};

export default function Home({ navigation }: any) {
  const intl = useIntl();
  const { captureEvent } = useCaptureEvent();
  const {
    color300,
    color500,
    color700,
    lightText,
    homeBgUri,
    changeHomeBgUri,
    currentTheme,
  } = useContext(ThemeContext);
  const { currentFont, selectedFont, selectedHeavyFont } =
    useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { currentBook, changeBook } = useContext(BookContext);
  const { currentLang, timeZone } = useContext(LocalContext);
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);
  const [menuIconColor, setMenuIconColor] = useState<string>(color500);
  const [selectedBook, setSelectedBook] = useState<string>(currentBook);
  const [selectedBookTranslation, setSelectedBookTranslation] =
    useState<string>(currentBook); // intl.formatMessage({ id: "textsList.main_title" });
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
  const [smallBookCoverColor, setSmallBookCoverColor] =
    useState<string>(color300);
  const [bookUri, setBookUri] = useState<string>(homeBgUri);
  const photosText = useMemo(
    () => intl.formatMessage({ id: "home.photosButton" }),
    [currentLang]
  );
  const readText = useMemo(
    () => intl.formatMessage({ id: "home.readButton" }),
    [currentLang]
  );
  const listenText = useMemo(
    () => intl.formatMessage({ id: "home.listenButton" }),
    [currentLang]
  );
  const watchText = useMemo(
    () => intl.formatMessage({ id: "home.watchButton" }),
    [currentLang]
  );
  const notesText = useMemo(
    () => intl.formatMessage({ id: "home.notesButton" }),
    [currentLang]
  );
  const settingsText = useMemo(
    () => intl.formatMessage({ id: "home.settingsButton" }),
    [currentLang]
  );
  const myExternalCauseText = useMemo(
    () => intl.formatMessage({ id: "home.book.myExternalCause" }),
    [currentLang]
  );
  const theJudgeText = useMemo(
    () => intl.formatMessage({ id: "home.book.theJudge" }),
    [currentLang]
  );
  const theDreamyManText = useMemo(
    () => intl.formatMessage({ id: "home.book.theDreamyMan" }),
    [currentLang]
  );
  const passportalText = useMemo(
    () => intl.formatMessage({ id: "home.book.passportal" }),
    [currentLang]
  );
  const loveDrunkText = useMemo(
    () => intl.formatMessage({ id: "home.book.loveDrunk" }),
    [currentLang]
  );
  const selectedBookText = useMemo(() => {
    switch (selectedBook) {
      case "My External Cause":
        return myExternalCauseText;
      case "The Judge":
        return theJudgeText;
      case "The Dreamy Man":
        return theDreamyManText;
      case "Passportal":
        return passportalText;
      case "Love Drunk":
        return loveDrunkText;
      default:
        return myExternalCauseText;
    }
  }, [currentLang, selectedBook]);
  const bookChangedToastText = useMemo(() => {
    switch (selectedBook) {
      case "My External Cause":
        return intl.formatMessage(
          { id: "home.toast.bookChanged" },
          { book: selectedBookText }
        );
      case "The Dreamy Man":
        return intl.formatMessage(
          { id: "home.toast.bookChanged" },
          { book: selectedBookText }
        );
      case "The Judge":
        return intl.formatMessage(
          { id: "home.toast.bookChanged" },
          { book: selectedBookText }
        );
      case "Passportal":
        return intl.formatMessage(
          { id: "home.toast.bookChanged" },
          { book: selectedBookText }
        );
      case "Love Drunk":
        return intl.formatMessage(
          { id: "home.toast.bookChanged" },
          { book: selectedBookText }
        );
      default:
        return intl.formatMessage(
          { id: "home.toast.bookChanged" },
          { book: selectedBookText }
        );
    }
  }, [currentLang, selectedBook, selectedBookText]);
  const MenuItemsList: MenuItem[] = [
    {
      id: "photos",
      title: photosText,
    },
    {
      id: "read",
      title: readText,
    },
    {
      id: "listen",
      title: listenText,
    },
    {
      id: "watch",
      title: watchText,
    },
    {
      id: "notes",
      title: notesText,
    },
    {
      id: "settings",
      title: settingsText,
    },
  ];

  useEffect(() => {
    console.log("selectedBook:", selectedBook);
    setBookUri(homeBgUri);
    switch (selectedBook) {
      case "My External Cause":
        setBookUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
        );
        changeHomeBgUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
        );
        // changeBook("My External Cause");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        setSelectedBookTranslation(myExternalCauseText);
        break;
      case "The Judge":
        setBookUri(
          `${serverURL}/assets/backgrounds/The_Judge_front_cover_${currentTheme}.png`
        );
        changeHomeBgUri(
          `${serverURL}/assets/backgrounds/The_Judge_front_cover_${currentTheme}.png`
        );
        // changeBook("The Judge");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        setSelectedBookTranslation(theJudgeText);
        break;
      case "The Dreamy Man":
        console.log("The Dreamy Man selected...");
        setBookUri(
          `${serverURL}/assets/backgrounds/The_Dreamy_Man_front_cover_${currentTheme}.png`
        );
        setBookUri(
          `${serverURL}/assets/backgrounds/The_Dreamy_Man_front_cover_${currentTheme}.png`
        );
        changeHomeBgUri(
          `${serverURL}/assets/backgrounds/The_Dreamy_Man_front_cover_${currentTheme}.png`
        );
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        setSelectedBookTranslation(theDreamyManText);
        break;
      case "Passportal":
        console.log("Passportal selected...");
        setBookUri(
          `${serverURL}/assets/backgrounds/Passportal_front_cover_${currentTheme}.png`
        );
        changeHomeBgUri(
          `${serverURL}/assets/backgrounds/Passportal_front_cover_${currentTheme}.png`
        );
        // changeBook("Passportal");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        // setSelectedBookTranslation(intl.formatMessage({ id: "passportalTextsList.main_title" }));
        setSelectedBookTranslation(passportalText);
        break;
      case "Love Drunk":
        setBookUri(
          `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_${currentTheme}.png`
        );
        changeHomeBgUri(
          `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_${currentTheme}.png`
        );
        // changeBook("Love Drunk");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        // setSelectedBookTranslation(intl.formatMessage({ id: "loveDrunkTextsList.main_title" }));
        setSelectedBookTranslation(loveDrunkText);
        break;
      default:
        switch (currentBook) {
          case "My External Cause":
            changeHomeBgUri(
              `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
            );
            break;
          case "The Judge":
            changeHomeBgUri(
              `${serverURL}/assets/backgrounds/The_Judge_front_cover_${currentTheme}.png`
            );
            break;
          case "The Dreamy Man":
            changeHomeBgUri(
              `${serverURL}/assets/backgrounds/The_Dreamy_Man_front_cover_${currentTheme}.png`
            );
            break;
          case "Passportal":
            changeHomeBgUri(
              `${serverURL}/assets/backgrounds/Passportal_front_cover_${currentTheme}.png`
            );
            break;
          case "Love Drunk":
            changeHomeBgUri(
              `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_${currentTheme}.png`
            );
            break;
        }
      // setBookUri(
      //   `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
      // );
      // changeBook("My External Cause");
      // setMenuIconColor(color500);
      // setSmallBookCoverColor(color300);
      // break;
    }
  }, [selectedBook, homeBgUri, color300, color500, color700]);

  useEffect(() => {
    console.log("bookUri:", bookUri);
  }, [bookUri]);

  useEffect(() => {
    switch (currentBook) {
      case "My External Cause":
        setSelectedBookIndex(0);
        break;
      case "The Judge":
        setSelectedBookIndex(1);
        break;
      case "The Dreamy Man":
        setSelectedBookIndex(2);
        break;
      case "Passportal":
        setSelectedBookIndex(3);
        break;
      case "Love Drunk":
        setSelectedBookIndex(4);
        break;
    }
    setSelectedBook(currentBook);
  }, [currentBook]);

  /**
   * Functions
   */
  const handleNavigation = (item: MenuItem) => {
    const date = new Date();
    let newEvent: EventObject | null;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    switch (item.id) {
      case "photos":
        newEvent = {
          name: "Press button",
          location: "Home",
          context: "Open photos screen",
          detail: item.id,
          description: `User pressed the ${item.id} button on the Home screen.`,
          timestamp: date.getTime(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeZone: timeZone ? timeZone : "UTC",
          constants: {
            selectedBook: currentBook,
            selectedLanguage: currentLang,
            selectedTheme: currentTheme,
            selectedFont: currentFont,
          },
        };
        navigation.navigate("Photos");
        break;
      case "read":
        newEvent = {
          name: "Press button",
          location: "Home",
          context: "Open read screen",
          detail: item.id,
          description: `User pressed the ${item.id} button on the Home screen.`,
          timestamp: date.getTime(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeZone: timeZone ? timeZone : "UTC",
          constants: {
            selectedBook: currentBook,
            selectedLanguage: currentLang,
            selectedTheme: currentTheme,
            selectedFont: currentFont,
          },
        };
        navigation.navigate("Read");
        break;
      case "listen":
        newEvent = {
          name: "Press button",
          location: "Home",
          context: "Open listen screen",
          detail: item.id,
          description: `User pressed the ${item.id} button on the Home screen.`,
          timestamp: date.getTime(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeZone: timeZone ? timeZone : "UTC",
          constants: {
            selectedBook: currentBook,
            selectedLanguage: currentLang,
            selectedTheme: currentTheme,
            selectedFont: currentFont,
          },
        };
        navigation.navigate("Listen");
        break;
      case "watch":
        newEvent = {
          name: "Press button",
          location: "Home",
          context: "Open watch screen",
          detail: item.id,
          description: `User pressed the ${item.id} button on the Home screen.`,
          timestamp: date.getTime(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeZone: timeZone ? timeZone : "UTC",
          constants: {
            selectedBook: currentBook,
            selectedLanguage: currentLang,
            selectedTheme: currentTheme,
            selectedFont: currentFont,
          },
        };
        navigation.navigate("Watch");
        break;
      case "notes":
        newEvent = {
          name: "Press button",
          location: "Home",
          context: "Open notes screen",
          detail: item.id,
          description: `User pressed the ${item.id} button on the Home screen.`,
          timestamp: date.getTime(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeZone: timeZone ? timeZone : "UTC",
          constants: {
            selectedBook: currentBook,
            selectedLanguage: currentLang,
            selectedTheme: currentTheme,
            selectedFont: currentFont,
          },
        };
        navigation.navigate("Notes");
        break;
      case "settings":
        newEvent = {
          name: "Press button",
          location: "Home",
          context: "Open settings screen",
          detail: item.id,
          description: `User pressed the ${item.id} button on the Home screen.`,
          timestamp: date.getTime(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          timeZone: timeZone ? timeZone : "UTC",
          constants: {
            selectedBook: currentBook,
            selectedLanguage: currentLang,
            selectedTheme: currentTheme,
            selectedFont: currentFont,
          },
        };
        navigation.navigate("Settings");
        break;
      default:
        newEvent = null;
    }
    if (newEvent) {
      captureEvent(newEvent);
    }
  };
  const handleClickPreviousBook = () => {
    // const date = new Date();
    // const newEvent: EventObject = {
    //   name: "Press button",
    //   location: "Home",
    //   context: "Previous book",
    //   detail: "",
    //   date: date.toLocaleDateString(),
    //   time: date.toLocaleTimeString(),
    //   timeZone: timeZone ? timeZone : "UTC",
    // };

    if (selectedBookIndex === 0) {
      setSelectedBookIndex(bookList.length - 1);
      setSelectedBook(bookList[bookList.length - 1]);
      // newEvent.detail = bookList[bookList.length - 1];
      // newEvent.description = `User pressed the Previous book button on the Home screen, resulting in book ${
      //   bookList[bookList.length - 1]
      // }.`;
    } else {
      setSelectedBookIndex(selectedBookIndex - 1);
      setSelectedBook(bookList[selectedBookIndex - 1]);
      // newEvent.detail = bookList[selectedBookIndex - 1];
      // newEvent.description = `User pressed the Previous book button on the Home screen, resulting in book ${
      //   bookList[selectedBookIndex - 1]
      // }.`;
    }

    // captureEvent(newEvent);
  };
  const handleClickNextBook = () => {
    // const date = new Date();
    // const newEvent: EventObject = {
    //   name: "Press button",
    //   location: "Home",
    //   context: "Next book",
    //   detail: "",
    //   date: date.toLocaleDateString(),
    //   time: date.toLocaleTimeString(),
    //   timeZone: timeZone ? timeZone : "UTC",
    // };

    if (selectedBookIndex === bookList.length - 1) {
      setSelectedBookIndex(0);
      setSelectedBook(bookList[0]);
      // newEvent.detail = bookList[0];
      // newEvent.description = `User pressed the Next book button on the Home screen, resulting in book ${bookList[0]}.`;
    } else {
      setSelectedBookIndex(selectedBookIndex + 1);
      setSelectedBook(bookList[selectedBookIndex + 1]);
      // newEvent.detail = bookList[selectedBookIndex + 1];
      // newEvent.description = `User pressed the Next book button on the Home screen, resulting in book ${
      //   bookList[selectedBookIndex + 1]
      // }.`;
    }

    // captureEvent(newEvent);
  };

  /**
   * Components
   */
  function MenuItemNode({ title, onPress }: MenuItemNodeProps) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={() => setMenuIsVisible(false)}
        style={{
          ...styles.menuItem,
          backgroundColor: color500,
          borderColor: color500,
        }}
      >
        <Text
          style={{
            ...styles.menuItemText,
            fontFamily: selectedFont,
            color: lightText,
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: color700,
      }}
    >
      <StatusBar hidden />
      <View
        style={{
          ...styles.mainContainer,
          marginTop: OS === "ios" ? 2 : 0,
        }}
      >
        <View
          style={{
            ...styles.titleContainer,
            backgroundColor: color300,
            borderColor: color500,
            paddingTop: OS === "ios" ? 56 : 20,
            borderTopLeftRadius: OS === "ios" ? 50 : 0,
            borderTopRightRadius: OS === "ios" ? 50 : 0,
          }}
        >
          <View
            style={{
              ...styles.titleText,
              backgroundColor: color500,
              padding: OS === "ios" ? 10 : 4,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                ...styles.titleText,
                fontFamily: selectedHeavyFont,
                color: lightText,
                backgroundColor: color500,
              }}
            >
              <FormattedMessage
                id="home.mainMenu.title"
                defaultMessage="Main Menu"
              />
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            setMenuIsVisible(false);
          }}
          onLongPress={() => {
            const tempText = `🎊💃 Congrats my love! 🕺🎉\nYou found the super secret "Events" page!
            Now you can see all the events that have been captured in the app! I love you! ❤️🥰`;
            const toast = Toast.show(tempText, {
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 50,
              containerStyle: {
                borderRadius: 12,
                borderWidth: 6,
                borderColor: color300,
                padding: 12,
              },
              textStyle: {
                fontFamily: selectedFont,
                color: lightText,
                fontSize: 18,
              },
              backgroundColor: color700,
              opacity: 1,
              // opacity: 0.96,
            });
            navigation.navigate("Events");
          }}
          onPressIn={() => menuIsVisible && setSmallBookCoverColor(color500)}
          onPressOut={() => menuIsVisible && setSmallBookCoverColor(color300)}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              flex: 1,
              width: menuIsVisible ? "50%" : "96%",
              height: "70%",
              marginTop: 4,
              marginBottom: 4,
              borderWidth: 6,
              borderRadius: 12,
              borderColor: smallBookCoverColor,
            }}
            source={{ uri: bookUri }}
            contentFit="fill"
            transition={300}
          />
        </Pressable>
        <View
          style={{
            ...styles.flatlistView,
            backgroundColor: color300,
            borderColor: color500,
            padding: OS === "ios" ? 20 : 14,
            marginBottom: OS === "ios" ? 4 : 0,
            borderBottomLeftRadius: OS === "ios" ? 50 : 0,
            borderBottomRightRadius: OS === "ios" ? 50 : 0,
          }}
        >
          {menuIsVisible ? (
            <FlatList
              data={MenuItemsList}
              renderItem={({ item }) => (
                <MenuItemNode
                  title={item.title}
                  key={item.id}
                  onPress={() => handleNavigation(item)}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                width: "100%",
              }}
            >
              <Pressable
                onPressIn={() => setMenuIconColor(color700)}
                onPressOut={() => setMenuIconColor(color500)}
                onPress={() => {
                  handleClickPreviousBook();
                }}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="page-previous"
                  size={48}
                  color={color500}
                />
              </Pressable>
              <Pressable
                onPressIn={() => setMenuIconColor(color700)}
                onPressOut={() => setMenuIconColor(color500)}
                onPress={() => {
                  setMenuIsVisible(true);
                  console.log("Home currentTheme:", currentTheme);
                  console.log("Home currentFont:", currentFont);
                  console.log("Home currentLang:", currentLang);
                  changeBook(
                    selectedBook,
                    currentLang,
                    currentTheme,
                    currentFont
                  );
                  const toast = Toast.show(bookChangedToastText, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 50,
                    containerStyle: {
                      borderRadius: 12,
                      borderWidth: 6,
                      borderColor: color300,
                      padding: 12,
                    },
                    textStyle: {
                      fontFamily: selectedFont,
                      color: lightText,
                      fontSize: 18,
                    },
                    backgroundColor: color700,
                    opacity: 1,
                    // opacity: 0.96,
                  });
                }}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Entypo name="menu" size={48} color={menuIconColor} />
              </Pressable>
              <Pressable
                onPressIn={() => setMenuIconColor(color700)}
                onPressOut={() => setMenuIconColor(color500)}
                onPress={() => {
                  handleClickNextBook();
                }}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="page-next"
                  size={48}
                  color={color500}
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
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
  titleContainer: {
    borderRadius: 12,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
  },
  titleText: {
    fontSize: 48,
  },
  flatlistView: {
    borderWidth: 6,
    borderRadius: 12,
    // padding: 20,
    width: "100%",
  },
  menuItem: {
    borderWidth: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  menuItemText: {
    fontSize: 32,
  },
});
