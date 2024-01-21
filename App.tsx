import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

/**
 * Screens
 */
import Screens from "./Screens";
import WrapperContext from "./WrapperContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  /**
   * State
   */
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [fontsLoaded] = Font.useFonts({
    ANGREG: require("./assets/fonts/angelina.regular.ttf"),
    ANABOLD: require("./assets/fonts/nf-ananias-bold.ttf"),
    ANAREG: require("./assets/fonts/nf-ananias-regular.ttf"),
    BHH: require("./assets/fonts/bauhausstd-heavy.ttf"),
    BHL: require("./assets/fonts/bauhausstd-light.ttf"),
    BHM: require("./assets/fonts/bauhausstd-medium.ttf"),
    CRPTN: require("./assets/fonts/corruption-regular.otf"),
    FRNK: require("./assets/fonts/frank.ttf"),
    HMGBRD: require("./assets/fonts/hummingbird.ttf"),
    NSH: require("./assets/fonts/NexaScriptHeavy.otf"),
    NSL: require("./assets/fonts/NexaScriptLight.otf"),
  });

  /**
   * Functions
   */
  const loadHomeScreen = async () => {
    console.log("appIsReady:", appIsReady);
    if (appIsReady) {
      await SplashScreen.hideAsync();
      console.log("finished awaiting SplashScreen.hideAsync()");
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    console.log("fontsLoaded:", fontsLoaded);
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady) {
      console.log("loading home screen...");
      loadHomeScreen();
    }
  }, [appIsReady]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <WrapperContext>
      <Screens />
    </WrapperContext>
  );
}
