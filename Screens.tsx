import { useMemo, useContext } from "react";
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
import Photos from "./screens/Photos";
import Read from "./screens/Read";
import Listen from "./screens/Listen";
import Watch from "./screens/Watch";
import Notes from "./screens/Notes";
import Settings from "./screens/Settings";
import Events from "./screens/Events";
import { FontContext } from "./context/FontContext";

const Stack = createNativeStackNavigator();

export default function Screens() {
  const intl = useIntl();
  const { color500, color700, lightText } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const PhotosTitle = intl.formatMessage({ id: "photos.header.title" });
  const ReadTitle = intl.formatMessage({ id: "read.header.title" });
  const ListenTitle = intl.formatMessage({ id: "listen.header.title" });
  const WatchTitle = intl.formatMessage({ id: "watch.header.title" });
  const NotesTitle = intl.formatMessage({ id: "notes.header.title" });
  const SettingsTitle = intl.formatMessage({ id: "settings.header.title" });
  const tempEventsTitle = "Events";

  /**
   * Screen options
   */
  const PhotosOptions = useMemo(
    () => ({
      headerShown: true,
      title: PhotosTitle,
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
    [PhotosTitle, color700, lightText, selectedFont, selectedHeavyFont]
  );
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
  const WatchOptions = useMemo(
    () => ({
      headerShown: true,
      title: WatchTitle,
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
    [WatchTitle, color700, lightText, selectedFont, selectedHeavyFont]
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
  const EventsOptions = useMemo(
    () => ({
      headerShown: true,
      title: tempEventsTitle,
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
    [tempEventsTitle, color700, lightText, selectedFont, selectedHeavyFont]
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Photos" component={Photos} options={PhotosOptions} />
      <Stack.Screen name="Read" component={Read} options={ReadOptions} />
      <Stack.Screen name="Listen" component={Listen} options={ListenOptions} />
      <Stack.Screen name="Watch" component={Watch} options={WatchOptions} />
      <Stack.Screen name="Notes" component={Notes} options={NotesOptions} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={SettingsOptions}
      />
      <Stack.Screen name="Events" component={Events} options={EventsOptions} />
    </Stack.Navigator>
  );
}
