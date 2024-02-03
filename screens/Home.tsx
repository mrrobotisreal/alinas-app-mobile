import { useContext, useState, useEffect, ReactNode } from "react";
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
import { BookImagesCache } from "../cache/BookImages";

/**
 * Context
 */
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { BookContext } from "../context/BookContext";

const bookList: string[] = ["My External Cause", "Passportal", "Love Drunk"];

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
  const { color300, color500, color700, lightText, homeBgUri, currentTheme } =
    useContext(ThemeContext);
  const { bookImagesList, MyExternalCause, LoveDrunk, Passportal, imagesObj } =
    useContext(BookImagesCache);
  const [bookImage, setBookImage] = useState<ReactNode>(MyExternalCause);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { currentBook, changeBook } = useContext(BookContext);
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);
  const [menuIconColor, setMenuIconColor] = useState<string>(color500);
  const [selectedBook, setSelectedBook] = useState<string>("My External Cause");
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
  const [smallBookCoverColor, setSmallBookCoverColor] =
    useState<string>(color300);
  const [bookUri, setBookUri] = useState<string>(homeBgUri);
  const photosText = intl.formatMessage({ id: "home.photosButton" });
  const readText = intl.formatMessage({ id: "home.readButton" });
  const listenText = intl.formatMessage({ id: "home.listenButton" });
  const notesText = intl.formatMessage({ id: "home.notesButton" });
  const settingsText = intl.formatMessage({ id: "home.settingsButton" });
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
      id: "notes",
      title: notesText,
    },
    {
      id: "settings",
      title: settingsText,
    },
  ];

  useEffect(() => {
    setBookUri(homeBgUri);
    switch (selectedBook) {
      case "My External Cause":
        setBookUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
        );
        changeBook("My External Cause");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
      case "Passportal":
        setBookUri(
          `${serverURL}/assets/backgrounds/Passportal_front_cover_${currentTheme}.png`
        );
        setBookImage(Passportal);
        changeBook("Passportal");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
      case "Love Drunk":
        setBookUri(
          `${serverURL}/assets/backgrounds/Love_Drunk_front_cover_${currentTheme}.png`
        );
        setBookImage(LoveDrunk);
        changeBook("Love Drunk");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
      default:
        setBookUri(
          `${serverURL}/assets/backgrounds/my_external_cause_front_cover_${currentTheme}.png`
        );
        setBookImage(MyExternalCause);
        changeBook("My External Cause");
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
    }
  }, [selectedBook, homeBgUri, color300, color500, color700, imagesObj]);

  /**
   * Functions
   */
  const handleNavigation = (item: MenuItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    switch (item.id) {
      case "photos":
        navigation.navigate("Photos");
        break;
      case "read":
        navigation.navigate("Read");
        break;
      case "listen":
        navigation.navigate("Listen");
        break;
      case "notes":
        navigation.navigate("Notes");
        break;
      case "settings":
        navigation.navigate("Settings");
    }
  };
  const handleClickPreviousBook = () => {
    if (selectedBookIndex === 0) {
      setSelectedBookIndex(bookList.length - 1);
      setSelectedBook(bookList[bookList.length - 1]);
    } else {
      setSelectedBookIndex(selectedBookIndex - 1);
      setSelectedBook(bookList[selectedBookIndex - 1]);
    }
  };
  const handleClickNextBook = () => {
    if (selectedBookIndex === bookList.length - 1) {
      setSelectedBookIndex(0);
      setSelectedBook(bookList[0]);
    } else {
      setSelectedBookIndex(selectedBookIndex + 1);
      setSelectedBook(bookList[selectedBookIndex + 1]);
    }
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
            paddingTop: OS === "ios" ? 56 : 0,
            borderTopLeftRadius: OS === "ios" ? 50 : 0,
            borderTopRightRadius: OS === "ios" ? 50 : 0,
          }}
        >
          <View
            style={{
              ...styles.titleText,
              backgroundColor: color500,
              padding: 10,
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
            contentFit="cover"
            transition={300}
          />
        </Pressable>
        <View
          style={{
            ...styles.flatlistView,
            backgroundColor: color300,
            borderColor: color500,
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
    padding: 20,
    width: "100%",
  },
  menuItem: {
    borderWidth: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  menuItemText: {
    fontSize: 32,
  },
});
