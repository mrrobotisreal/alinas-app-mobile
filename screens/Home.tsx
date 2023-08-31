import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FormattedMessage, useIntl } from "react-intl";

const DEVICE_WIDTH = Dimensions.get("window").width;

/**
 * Context
 */
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";

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
  const { color500, lightText, homeBG } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  console.log("selectedFont:", selectedFont);
  console.log("selectedHeavyFont:", selectedHeavyFont);
  const readText = intl.formatMessage({ id: "home.readButton" });
  const listenText = intl.formatMessage({ id: "home.listenButton" });
  const notesText = intl.formatMessage({ id: "home.notesButton" });
  const settingsText = intl.formatMessage({ id: "home.settingsButton" });
  const MenuItemsList: MenuItem[] = [
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

  /**
   * Functions
   */
  const handleNavigation = (item: MenuItem) => {
    switch (item.id) {
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

  /**
   * Components
   */
  function MenuItemNode({ title, onPress }: MenuItemNodeProps) {
    return (
      <Pressable
        onPress={onPress}
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
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={homeBG}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.mainContainer}>
          <View
            style={{
              ...styles.titleContainer,
              backgroundColor: color500,
              borderColor: lightText,
            }}
          >
            <Text
              style={{
                ...styles.titleText,
                fontFamily: selectedHeavyFont,
                color: lightText,
              }}
            >
              <FormattedMessage
                id="home.mainMenu.title"
                defaultMessage="Main Menu"
              />
            </Text>
          </View>
          <View
            style={{
              ...styles.flatlistView,
              backgroundColor: lightText,
              borderColor: color500,
            }}
          >
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
          </View>
        </View>
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
