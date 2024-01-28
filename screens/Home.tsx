import { useContext, useState, useEffect } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { FormattedMessage, useIntl } from "react-intl";
import MY_EXTERNAL_CAUSE_COVER from "../assets/images/splash.png";
import PASSPORTAL_COVER from "../assets/images/Passportal_front_cover.png";
import LOVE_DRUNK_COVER from "../assets/images/Love_Drunk_Front_Cover.png";
import { Image } from "expo-image";

const DEVICE_WIDTH = Dimensions.get("window").width;

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
  const { color300, color500, color700, lightText, homeBgUri } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { currentBook, changeBook } = useContext(BookContext);
  const [pagePosition, setPagePosition] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);
  const [menuIconColor, setMenuIconColor] = useState<string>(color500);
  const [selectedBook, setSelectedBook] = useState<string>("My External Cause");
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
  const [selectedBookCover, setSelectedBookCover] =
    useState<ImageSourcePropType>(MY_EXTERNAL_CAUSE_COVER);
  const [smallBookCoverColor, setSmallBookCoverColor] =
    useState<string>(color300);
  const [myExternalCauseIsSelected, setMyExternalCauseIsSelected] =
    useState<boolean>(true);
  const [passportalIsSelected, setPassportalIsSelected] =
    useState<boolean>(false);
  const [loveDrunkIsSelected, setLoveDrunkIsSelected] =
    useState<boolean>(false);
  const [selectBookIsVisible, setSelectBookIsVisible] =
    useState<boolean>(false);
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
    console.log("homeBgUri:", homeBgUri);
    switch (selectedBook) {
      case "My External Cause":
        changeBook("My External Cause");
        // setSelectedBookCover(homeBG);
        setMyExternalCauseIsSelected(true);
        setPassportalIsSelected(false);
        setLoveDrunkIsSelected(false);
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
      case "Passportal":
        changeBook("Passportal");
        setSelectedBookCover(PASSPORTAL_COVER);
        setMyExternalCauseIsSelected(false);
        setPassportalIsSelected(true);
        setLoveDrunkIsSelected(false);
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
      case "Love Drunk":
        changeBook("Love Drunk");
        setSelectedBookCover(LOVE_DRUNK_COVER);
        setMyExternalCauseIsSelected(false);
        setPassportalIsSelected(false);
        setLoveDrunkIsSelected(true);
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
      default:
        changeBook("My External Cause");
        // setSelectedBookCover(homeBG);
        setMyExternalCauseIsSelected(true);
        setPassportalIsSelected(false);
        setLoveDrunkIsSelected(false);
        setMenuIconColor(color500);
        setSmallBookCoverColor(color300);
        break;
    }
  }, [selectedBook, homeBgUri, color300, color500, color700]);

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
  };
  const animatePageFromRight = () => {
    Animated.timing(pagePosition, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
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
        {/* <View>
          <Animated.View
            style={[
              {
                width: "90%",
                height: "90%",
              },
              pagePosition.getLayout(),
            ]}
          > */}
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
            source={{ uri: homeBgUri }}
            contentFit="cover"
            transition={300}
          />
        </Pressable>
        {/* </Animated.View>
        </View> */}
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
                  // animatePageRight();
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
                  // animatePageLeft();
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectBookIsVisible}
      >
        <View
          style={{
            borderColor: lightText,
            backgroundColor: color700,
            borderRadius: 50,
            padding: 10,
            height: "100%",
            width: "100%",
            borderWidth: 6,
            paddingTop: 40,
          }}
        >
          {selectBookIsVisible && (
            <View
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 12,
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: "100%",
                  marginTop: 6,
                  marginBottom: 10,
                  borderWidth: 6,
                  borderRadius: 12,
                  borderColor: lightText,
                }}
                source={selectedBookCover}
                contentFit="cover"
                transition={300}
              />
              <View
                style={{
                  borderWidth: 6,
                  borderColor: lightText,
                  borderRadius: 12,
                  padding: 10,
                  backgroundColor: color300,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    paddingHorizontal: 10,
                  }}
                >
                  <Pressable
                    onPressIn={() => setMenuIconColor(color700)}
                    onPressOut={() => setMenuIconColor(color500)}
                    onPress={() => {
                      // animatePageRight();
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
                      size={38}
                      color={color500}
                    />
                  </Pressable>
                  <Text
                    style={{
                      fontFamily: selectedFont,
                      fontSize: 24,
                      color: color700,
                      padding: 4,
                      textAlign: "center",
                    }}
                  >
                    {selectedBook}
                  </Text>
                  <Pressable
                    onPressIn={() => setMenuIconColor(color700)}
                    onPressOut={() => setMenuIconColor(color500)}
                    onPress={() => {
                      // animatePageLeft();
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
                      size={38}
                      color={color500}
                    />
                  </Pressable>
                </View>
              </View>
              <Pressable
                style={{
                  borderRadius: 12,
                  borderWidth: 6,
                  borderColor: lightText,
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: color700,
                  width: "60%",
                  alignSelf: "center",
                }}
                onPress={() => {
                  setSelectBookIsVisible(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: selectedFont,
                    fontSize: 28,
                    color: lightText,
                    padding: 4,
                    textAlign: "center",
                  }}
                >
                  Main Menu
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
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
