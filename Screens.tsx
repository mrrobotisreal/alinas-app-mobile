import { useMemo, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIntl } from "react-intl";

/**
 * Context
 */
import { ThemeContext } from "./context/ThemeContext";

/**
 * Screens
 */
import Home from "./screens/Home";
import Read from "./screens/Read";
import Listen from "./screens/Listen";
import Notes from "./screens/Notes";
import Settings from "./screens/Settings";
import { FontContext } from "./context/FontContext";

const Stack = createNativeStackNavigator();

export default function Screens() {
  const intl = useIntl();
  const { color500, color700, lightText } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const ReadTitle = intl.formatMessage({ id: "read.header.title" });
  const ListenTitle = intl.formatMessage({ id: "listen.header.title" });
  const NotesTitle = intl.formatMessage({ id: "notes.header.title" });
  const SettingsTitle = intl.formatMessage({ id: "settings.header.title" });

  /**
   * Screen options
   */
  const ReadOptions = useMemo(
    () => ({
      headerShown: true,
      title: ReadTitle,
      headerStyle: {
        backgroundColor: color700,
      },
      headerTintColor: lightText,
      headerTitleStyle:
        selectedFont === "NSL"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "BHL" || selectedFont === "BHM"
          ? {
              fontFamily: "BHH",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "ANAREG"
          ? {
              fontFamily: "ANABOLD",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "HMGBRD"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 38,
            }
          : {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            },
    }),
    [ReadTitle, color700, lightText, selectedFont, selectedHeavyFont]
  );
  const ListenOptions = useMemo(
    () => ({
      headerShown: true,
      title: ListenTitle,
      headerStyle: {
        backgroundColor: color500,
      },
      headerTintColor: lightText,
      headerTitleStyle:
        selectedFont === "NSL"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "BHL" || selectedFont === "BHM"
          ? {
              fontFamily: "BHH",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "ANAREG"
          ? {
              fontFamily: "ANABOLD",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "HMGBRD"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 38,
            }
          : {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            },
    }),
    [ListenTitle, color500, lightText, selectedFont, selectedHeavyFont]
  );
  const NotesOptions = useMemo(
    () => ({
      headerShown: true,
      title: NotesTitle,
      headerStyle: {
        backgroundColor: color700,
      },
      headerTintColor: lightText,
      headerTitleStyle:
        selectedFont === "NSL"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "BHL" || selectedFont === "BHM"
          ? {
              fontFamily: "BHH",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "ANAREG"
          ? {
              fontFamily: "ANABOLD",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "HMGBRD"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 38,
            }
          : {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            },
    }),
    [NotesTitle, color700, lightText, selectedFont, selectedHeavyFont]
  );
  const SettingsOptions = useMemo(
    () => ({
      headerShown: true,
      title: SettingsTitle,
      headerStyle: {
        backgroundColor: color700,
      },
      headerTintColor: lightText,
      headerTitleStyle:
        selectedFont === "NSL"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "BHL" || selectedFont === "BHM"
          ? {
              fontFamily: "BHH",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "ANAREG"
          ? {
              fontFamily: "ANABOLD",
              color: lightText,
              fontSize: 32,
            }
          : selectedFont === "HMGBRD"
          ? {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 38,
            }
          : {
              fontFamily: selectedHeavyFont,
              color: lightText,
              fontSize: 32,
            },
    }),
    [SettingsTitle, color700, lightText, selectedFont, selectedHeavyFont]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Read" component={Read} options={ReadOptions} />
        <Stack.Screen
          name="Listen"
          component={Listen}
          options={ListenOptions}
        />
        <Stack.Screen name="Notes" component={Notes} options={NotesOptions} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={SettingsOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
