import { useState, useEffect, useContext, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import { FormattedMessage } from "react-intl";
import Slider from "@react-native-community/slider";
import { useGetAudioList } from "../hooks/useGetAudioList";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { BookContext } from "../context/BookContext";
import BackgroundImage from "../components/BackgroundImage";
import Reader from "../components/Reader";
import * as Haptics from "expo-haptics";

export default function Listen() {
  /**
   * Hooks, State, Context
   */
  const { audioList } = useGetAudioList();
  const { color300, color500, color700, lightText, listenBgUri } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { currentBook, pageSVRef } = useContext(BookContext);
  const [pagePosition, setPagePosition] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [sound, setSound] = useState<Audio.Sound>();
  const [allSounds, setAllSounds] = useState<Audio.Sound[]>([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0);
  const [soundIsLoading, setSoundIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sliderMax, setSliderMax] = useState<number>(1);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [currentPositionMillis, setCurrentPositionMillis] = useState<number>(0);
  const [currentPositionString, setCurrentPositionString] =
    useState<string>("0:00");
  const [remainingTime, setRemainingTime] = useState<number>(337);
  const [remainingTimeString, setRemainingTimeString] =
    useState<string>("5:37");
  const [menuIconColor, setMenuIconColor] = useState<string>("#FFFFFF");
  const [previousIconColor, setPreviousIconColor] = useState<string>("#FFFFFF");
  const [playPauseIconColor, setPlayPauseIconColor] =
    useState<string>("#FFFFFF");
  const [nextIconColor, setNextIconColor] = useState<string>("#FFFFFF");
  const [infoBookmarkIconColor, setInfoBookmarkIconColor] =
    useState<string>("#FFFFFF");
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [_000Color, set_000Color] = useState<string>("#FFFFFF");
  const [_001Color, set_001Color] = useState<string>("#FFFFFF");
  const [_002Color, set_002Color] = useState<string>("#FFFFFF");
  const [_003Color, set_003Color] = useState<string>("#FFFFFF");
  const [_004Color, set_004Color] = useState<string>("#FFFFFF");
  const [_005Color, set_005Color] = useState<string>("#FFFFFF");
  const [_006Color, set_006Color] = useState<string>("#FFFFFF");
  const [_007Color, set_007Color] = useState<string>("#FFFFFF");
  const [_008Color, set_008Color] = useState<string>("#FFFFFF");
  const [_009Color, set_009Color] = useState<string>("#FFFFFF");
  const [outro1Color, setOutro1Color] = useState<string>("#FFFFFF");
  const [outro2Color, setOutro2Color] = useState<string>("#FFFFFF");
  const [titlePageColor_theJudge, setTitlePageColor_theJudge] =
    useState<string>("#FFFFFF");
  const [chapter1Color_theJudge, setChapter1Color_theJudge] =
    useState<string>("#FFFFFF");
  const [chapter2Color_theJudge, setChapter2Color_theJudge] =
    useState<string>("#FFFFFF");
  const [chapter3Color_theJudge, setChapter3Color_theJudge] =
    useState<string>("#FFFFFF");
  const [infoBookmarkIsOpen, setInfoBookmarkIsOpen] = useState<boolean>(false);
  const [audioMenuIsVisible, setAudioMenuIsVisible] = useState<boolean>(false);
  const [infoBookmarkMenuIsVisible, setInfoBookmarkMenuIsVisible] =
    useState<boolean>(false);

  /**
   * Functions
   */
  const calculateCurrentPositionString = (position: number) => {
    const min = Math.floor(position / 60);
    const sec = position % 60;
    setCurrentPosition(position);
    setCurrentPositionString(`${min}:${sec <= 9 ? "0" + sec : sec}`);
  };
  const calculateRemainingTimeString = (position: number) => {
    const remainingPosition = sliderMax - position;
    const min = Math.floor(remainingPosition / 60);
    const sec = remainingPosition % 60;
    setRemainingTime(remainingPosition);
    setRemainingTimeString(`${min}:${sec <= 9 ? "0" + sec : sec}`);
  };

  const handleMenuPressIn = () => setMenuIconColor(color300);
  const handleMenuPressOut = () => setMenuIconColor("#FFFFFF");
  const handleMenuPress = () => {
    setMenuIsOpen(!menuIsOpen);
    setAudioMenuIsVisible(true);
  };
  const handleMenuItemPressIn = (title: string) => {
    if (currentBook === "My External Cause") {
      switch (title) {
        case "Introduction":
          set_000Color(color300);
          break;
        case "The Anatomy of Everything":
          set_001Color(color300);
          break;
        case "My Love":
          set_002Color(color300);
          break;
        case "My Happiness":
          set_003Color(color300);
          break;
        case "My Strength":
          set_004Color(color300);
          break;
        case "My Inspiration and My Motivation":
          set_005Color(color300);
          break;
        case "My Peace":
          set_006Color(color300);
          break;
        case "My Home":
          set_007Color(color300);
          break;
        case "Where are they going?\nWhere are WE going?":
          set_008Color(color300);
          break;
        case "I want EVERYTHING with you":
          set_009Color(color300);
          break;
        case "Особлива кінцівка, частина 1":
          setOutro1Color(color300);
          break;
        case "Особлива кінцівка, частина 2":
          setOutro2Color(color300);
          break;
      }
    } else if (currentBook === "The Judge") {
      switch (title) {
        case "Title page":
          setTitlePageColor_theJudge(color300);
          break;
        case "Chapter 1: The judge and the auras":
          setChapter1Color_theJudge(color300);
          break;
        case "Chapter 2: High profile cases":
          setChapter2Color_theJudge(color300);
          break;
        case "Chapter 3: Publicity":
          setChapter3Color_theJudge(color300);
          break;
      }
    }
  };
  const handleMenuItemPressOut = (title: string) => {
    if (currentBook === "My External Cause") {
      switch (title) {
        case "Introduction":
          set_000Color("#FFFFFF");
          break;
        case "The Anatomy of Everything":
          set_001Color("#FFFFFF");
          break;
        case "My Love":
          set_002Color("#FFFFFF");
          break;
        case "My Happiness":
          set_003Color("#FFFFFF");
          break;
        case "My Strength":
          set_004Color("#FFFFFF");
          break;
        case "My Inspiration and My Motivation":
          set_005Color("#FFFFFF");
          break;
        case "My Peace":
          set_006Color("#FFFFFF");
          break;
        case "My Home":
          set_007Color("#FFFFFF");
          break;
        case "Where are they going?\nWhere are WE going?":
          set_008Color("#FFFFFF");
          break;
        case "I want EVERYTHING with you":
          set_009Color("#FFFFFF");
          break;
        case "Особлива кінцівка, частина 1":
          setOutro1Color("#FFFFFF");
          break;
        case "Особлива кінцівка, частина 2":
          setOutro2Color("#FFFFFF");
          break;
      }
    } else if (currentBook === "The Judge") {
      switch (title) {
        case "Title page":
          setTitlePageColor_theJudge("#FFFFFF");
          break;
        case "Chapter 1: The judge and the auras":
          setChapter1Color_theJudge("#FFFFFF");
          break;
        case "Chapter 2: High profile cases":
          setChapter2Color_theJudge("#FFFFFF");
          break;
        case "Chapter 3: Publicity":
          setChapter3Color_theJudge("#FFFFFF");
          break;
      }
    }
  };
  const handleMenuItemPress = async (title: string) => {
    if (currentBook === "My External Cause") {
      switch (title) {
        case "Introduction":
          setCurrentAudioIndex(0);
          break;
        case "The Anatomy of Everything":
          setCurrentAudioIndex(1);
          break;
        case "My Love":
          setCurrentAudioIndex(2);
          break;
        case "My Happiness":
          setCurrentAudioIndex(3);
          break;
        case "My Strength":
          setCurrentAudioIndex(4);
          break;
        case "My Inspiration and My Motivation":
          setCurrentAudioIndex(5);
          break;
        case "My Peace":
          setCurrentAudioIndex(6);
          break;
        case "My Home":
          setCurrentAudioIndex(7);
          break;
        case "Where are they going?\nWhere are WE going?":
          setCurrentAudioIndex(8);
          break;
        case "I want EVERYTHING with you":
          setCurrentAudioIndex(9);
          break;
        case "Особлива кінцівка, частина 1":
          setCurrentAudioIndex(10);
          break;
        case "Особлива кінцівка, частина 2":
          setCurrentAudioIndex(11);
          break;
      }
    } else if (currentBook === "The Judge") {
      switch (title) {
        case "Title page":
          setCurrentAudioIndex(0);
          break;
        case "Chapter 1: The judge and the auras":
          setCurrentAudioIndex(1);
          break;
        case "Chapter 2: High profile cases":
          setCurrentAudioIndex(2);
          break;
        case "Chapter 3: Publicity":
          setCurrentAudioIndex(3);
          break;
      }
    }
    setMenuIsOpen(false);
    setAudioMenuIsVisible(false);
    setCurrentPosition(0);
    setIsPlaying(true);
  };

  const handlePreviousPressIn = () => setPreviousIconColor(color300);
  const handlePreviousPressOut = () => setPreviousIconColor("#FFFFFF");
  const handlePreviousPress = async () => {
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded) {
      await sound?.unloadAsync();
    }
    if (infoBookmarkMenuIsVisible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => {
        setCurrentAudioIndex(
          currentAudioIndex === 0 ? audioList.length - 1 : currentAudioIndex - 1
        );
      }, 200);
      animatePageRight();
      pageSVRef?.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      setCurrentAudioIndex(
        currentAudioIndex === 0 ? audioList.length - 1 : currentAudioIndex - 1
      );
      setCurrentPosition(0);
    }
  };

  const handleLoading = async (sound: Audio.Sound) => {
    if (currentBook === "My External Cause") {
      switch (audioList[currentAudioIndex].uri) {
        case "../assets/audio/000_introduction.m4a":
          await sound.loadAsync(
            require("../assets/audio/000_introduction.m4a")
          );
          break;
        case "../assets/audio/001_anatomy_of_everything.m4a":
          await sound.loadAsync(
            require("../assets/audio/001_anatomy_of_everything.m4a")
          );
          break;
        case "../assets/audio/002_my_love.m4a":
          await sound.loadAsync(require("../assets/audio/002_my_love.m4a"));
          break;
        case "../assets/audio/003_my_happiness.m4a":
          await sound.loadAsync(
            require("../assets/audio/003_my_happiness.m4a")
          );
          break;
        case "../assets/audio/004_my_strength.m4a":
          await sound.loadAsync(require("../assets/audio/004_my_strength.m4a"));
          break;
        case "../assets/audio/005_my_inspiration_and_my_motivation.m4a":
          await sound.loadAsync(
            require("../assets/audio/005_my_inspiration_and_my_motivation.m4a")
          );
          break;
        case "../assets/audio/006_my_peace.m4a":
          await sound.loadAsync(require("../assets/audio/006_my_peace.m4a"));
          break;
        case "../assets/audio/007_my_home.m4a":
          await sound.loadAsync(require("../assets/audio/007_my_home.m4a"));
          break;
        case "../assets/audio/008_where_are_they_going_where_are_we_going.m4a":
          await sound.loadAsync(
            require("../assets/audio/008_where_are_they_going_where_are_we_going.m4a")
          );
          break;
        case "../assets/audio/009_I_want_everything_with_you.m4a":
          await sound.loadAsync(
            require("../assets/audio/009_I_want_everything_with_you.m4a")
          );
          break;
        case "../assets/audio/outro_part_1.m4a":
          await sound.loadAsync(require("../assets/audio/outro_part_1.m4a"));
          break;
        case "../assets/audio/outro_part_2.m4a":
          await sound.loadAsync(require("../assets/audio/outro_part_2.m4a"));
          break;
        default:
          await sound.loadAsync(
            require("../assets/audio/000_introduction.m4a")
          );
      }
    } else if (currentBook === "The Judge") {
      switch (audioList[currentAudioIndex].uri) {
        case "../assets/audio/theJudge/chapter1.mp3":
          await sound.loadAsync(
            require("../assets/audio/theJudge/Chapter1.mp3")
          );
          break;
        case "../assets/audio/theJudge/chapter2.m4a":
          await sound.loadAsync(
            require("../assets/audio/theJudge/Chapter2.m4a")
          );
          break;
        default:
          await sound.loadAsync(
            require("../assets/audio/theJudge/Chapter1.mp3")
          );
      }
    }

    // below works, but need to rework whole implementation
    // const allLoadedSounds: Audio.Sound[] = [];
    // const audioKeys = Object.keys(audioObjMyExternalCause);

    // audioKeys.forEach(async (key) => {
    //   const newSound = new Audio.Sound();
    //   newSound.setOnPlaybackStatusUpdate(handleOnPlaybackStatusUpdate);
    //   await newSound.loadAsync({ uri: audioObjMyExternalCause[key] });
    //   allLoadedSounds.push(newSound);
    // });

    // setAllSounds(allLoadedSounds);

    // const id = audioList[currentAudioIndex].id;
    // console.log("audio uri:", audioObjMyExternalCause[id]);

    // try {
    //   await sound.loadAsync({ uri: audioObjMyExternalCause[id] });
    //   console.log("sound loaded successfully");
    // } catch (err) {
    //   console.log("HANDLING LOAD ERROR");
    //   console.error(err);
    // }

    return sound;
  };
  const handleOnPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setSoundIsLoading(false);
      if (status.didJustFinish) {
        // check to see if we are at the end of audioList
        // if at the end,
        if (currentAudioIndex === audioList.length - 1) {
          // set isPlaying to false
          setIsPlaying(false);
          setCurrentAudioIndex(0);
        } else {
          // play the next track
          // maybe instead of changing currentAudioIndex, just call next()?
          setCurrentAudioIndex(currentAudioIndex + 1);
        }
      } else {
        // calculate durationMillis and positionMillis to seconds,
        const currentTotalSecs = Math.round(status.positionMillis / 1000);
        const currentMin = Math.floor(currentTotalSecs / 60);
        const currentSec = currentTotalSecs % 60;
        const totalTimeRemainingSecs = status.durationMillis
          ? Math.round(status.durationMillis / 1000) - currentTotalSecs
          : 0;
        const remainingTimeMin = Math.floor(totalTimeRemainingSecs / 60);
        const remainingTimeSec = totalTimeRemainingSecs % 60;
        // set currentPositionString and remainingTimeString accordingly
        setSliderMax(
          status.durationMillis ? Math.round(status.durationMillis / 1000) : 1
        );
        setCurrentPositionMillis(status.positionMillis);
        setCurrentPosition(currentTotalSecs);
        setCurrentPositionString(
          `${currentMin}:${currentSec <= 9 ? "0" + currentSec : currentSec}`
        );
        setRemainingTime(totalTimeRemainingSecs);
        setRemainingTimeString(
          `${remainingTimeMin}:${
            remainingTimeSec <= 9 ? "0" + remainingTimeSec : remainingTimeSec
          }`
        );
      }
    } else {
      setSoundIsLoading(false);

      if (status.error) {
        console.log(
          "An error has occurred during playback in handleOnPlaybackStatusUpdate:\n",
          status.error
        );
      } else if (OS === "ios") {
        // console.log(
        //   "Sorry! Check if your phone is on silent mode. If so, this can prevent sound playback. Switching silent mode off should allow the sound to play."
        // );
      }
    }
  };
  const handlePlayPausePressIn = () => setPlayPauseIconColor(color300);
  const handlePlayPausePressOut = () => setPlayPauseIconColor("#FFFFFF");
  const handlePlayPausePress = async () => {
    if (!isPlaying) {
      const status = await sound?.getStatusAsync();
      if (status?.isLoaded) {
        setIsPlaying(true);
        sound?.playAsync();
      } else {
        try {
          setSoundIsLoading(true);
          setIsPlaying(true);
          const sound = new Audio.Sound();
          sound.setOnPlaybackStatusUpdate(handleOnPlaybackStatusUpdate);
          const loadedSound = await handleLoading(sound);
          setSound(loadedSound);
          await loadedSound.playAsync();
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      setIsPlaying(false);
      await sound?.pauseAsync();
    }

    // if (!isPlaying) {
    //   const status = await allSounds[currentAudioIndex]?.getStatusAsync();
    //   if (status?.isLoaded) {
    //     setIsPlaying(true);
    //     allSounds[currentAudioIndex]?.playAsync();
    //   } else {
    //     try {
    //       setSoundIsLoading(true);
    //       setIsPlaying(true);
    //       const sound = new Audio.Sound();
    //       sound.setOnPlaybackStatusUpdate(handleOnPlaybackStatusUpdate);
    //       const loadedSound = await handleLoading(sound);
    //       setSound(loadedSound);
    //       await loadedSound.playAsync();
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // } else {
    //   setIsPlaying(false);
    //   await allSounds[currentAudioIndex]?.pauseAsync();
    // }
  };
  const handleSeek = async (position: number) => {
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded) {
      await sound?.playFromPositionAsync(position);
    } else {
      console.log("Can't seek, not loaded");
    }
  };

  const handleNextPressIn = () => setNextIconColor(color300);
  const handleNextPressOut = () => setNextIconColor("#FFFFFF");
  const handleNextPress = async () => {
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded) {
      await sound?.unloadAsync();
    }
    if (infoBookmarkMenuIsVisible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => {
        setCurrentAudioIndex(
          currentAudioIndex === audioList.length - 1 ? 0 : currentAudioIndex + 1
        );
        setCurrentPosition(0);
      }, 200);
      animatePageRight();
      pageSVRef?.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      setCurrentAudioIndex(
        currentAudioIndex === audioList.length - 1 ? 0 : currentAudioIndex + 1
      );
      setCurrentPosition(0);
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

  const handleInfoBookmarkPressIn = () => setInfoBookmarkIconColor(color300);
  const handleInfoBookmarkPressOut = () => setInfoBookmarkIconColor("#FFFFFF");
  const handleInfoBookmarkPress = () => {
    setInfoBookmarkIsOpen(!infoBookmarkIsOpen);
    setInfoBookmarkMenuIsVisible(true);
  };

  /**
   * Effects
   */
  useEffect(() => {
    (async () => {
      setSoundIsLoading(true);
      const sound = new Audio.Sound();
      sound.setOnPlaybackStatusUpdate(handleOnPlaybackStatusUpdate);
      const loadedSound = await handleLoading(sound);
      // await sound.loadAsync(require("../assets/audio/000_introduction.m4a"));
      setSound(loadedSound);
      if (isFirstRender) {
        setIsFirstRender(false);
      } else {
        setIsPlaying(true);
        await loadedSound.playAsync();
      }
    })();
  }, [currentAudioIndex]);

  useEffect(() => {
    if (sound) {
    }

    return sound
      ? () => {
          sound?.unloadAsync();
        }
      : undefined;
  }, [sound]);

  /**
   * Components
   */
  const MenuItem = ({
    onPress,
    onPressIn,
    onPressOut,
    title,
    uri,
  }: {
    onPress: (item: any) => void;
    onPressIn: () => void;
    onPressOut: () => void;
    title: string;
    uri: string;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
          ...styles.menuItem,
          backgroundColor: color700,
          padding: audioList[currentAudioIndex].title === title ? 8 : 6,
        }}
      >
        <Text
          style={{
            ...styles.menuItemText,
            fontFamily:
              audioList[currentAudioIndex].title === title
                ? selectedHeavyFont
                : selectedFont,
            fontSize: audioList[currentAudioIndex].title === title ? 30 : 24,
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackgroundImage uri={listenBgUri}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            {/* <Text
              style={{
                ...styles.titleText,
                color: lightText,
                fontFamily: selectedFont,
              }}
            >
              <FormattedMessage
                id="listen.title"
                defaultMessage="Listening..."
              />
            </Text> */}
          </View>
          {infoBookmarkMenuIsVisible && (
            <Reader
              currentPageIndex={currentAudioIndex}
              pagePosition={pagePosition}
            />
          )}
          <View
            style={{
              ...styles.audioView,
              backgroundColor: color500,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <Text
              style={{
                ...styles.audioText,
                color: lightText,
                fontFamily: selectedFont,
              }}
            >
              {audioList[currentAudioIndex].title}
            </Text>
            <View style={styles.audioPlayerView}>
              <Text
                style={{
                  ...styles.audioPlayerText,
                  color: lightText,
                  fontFamily: selectedFont,
                  paddingLeft: 12,
                }}
              >
                {currentPositionString}
              </Text>
              <Slider
                style={{ width: "75%" }}
                minimumValue={0}
                maximumValue={sliderMax}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(position) => {
                  console.log("slider value:", Math.round(position));
                  const roundedPosition: number = Math.round(position);
                  handleSeek(roundedPosition * 1000);
                  calculateCurrentPositionString(roundedPosition);
                  calculateRemainingTimeString(roundedPosition);
                }}
                value={currentPosition}
              />
              <Text
                style={{
                  ...styles.audioPlayerText,
                  color: lightText,
                  fontFamily: selectedFont,
                  paddingRight: 12,
                }}
              >
                {remainingTimeString}
              </Text>
            </View>
            <View style={styles.audioControlsView}>
              <Pressable
                onPress={handleMenuPress}
                onPressIn={handleMenuPressIn}
                onPressOut={handleMenuPressOut}
              >
                {menuIsOpen ? (
                  <Entypo
                    name="triangle-down"
                    size={48}
                    color={menuIconColor}
                  />
                ) : (
                  <Entypo name="menu" size={48} color={menuIconColor} />
                )}
              </Pressable>
              <Pressable
                onPress={handlePreviousPress}
                onPressIn={handlePreviousPressIn}
                onPressOut={handlePreviousPressOut}
                disabled={soundIsLoading}
              >
                <Entypo
                  name="controller-jump-to-start"
                  size={48}
                  color={previousIconColor}
                />
              </Pressable>
              <Pressable
                onPress={handlePlayPausePress}
                onPressIn={handlePlayPausePressIn}
                onPressOut={handlePlayPausePressOut}
                disabled={soundIsLoading}
              >
                {soundIsLoading ? (
                  <ActivityIndicator size={64} color="#CDB7F6" />
                ) : isPlaying ? (
                  <AntDesign
                    name="pausecircle"
                    size={64}
                    color={playPauseIconColor}
                  />
                ) : (
                  <AntDesign name="play" size={64} color={playPauseIconColor} />
                )}
              </Pressable>
              <Pressable
                onPress={handleNextPress}
                onPressIn={handleNextPressIn}
                onPressOut={handleNextPressOut}
                disabled={soundIsLoading}
              >
                <Entypo
                  name="controller-next"
                  size={48}
                  color={nextIconColor}
                />
              </Pressable>
              <Pressable
                onPress={handleInfoBookmarkPress}
                onPressIn={handleInfoBookmarkPressIn}
                onPressOut={handleInfoBookmarkPressOut}
              >
                {infoBookmarkIsOpen ? (
                  <FontAwesome5
                    name="book-reader"
                    size={48}
                    color={infoBookmarkIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="book-information-variant"
                    size={48}
                    color={infoBookmarkIconColor}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={audioMenuIsVisible}
        >
          <View style={styles.modal}>
            <View
              style={{
                ...styles.modalView,
                backgroundColor: color500,
              }}
            >
              <Text
                style={{
                  ...styles.modalTitle,
                  color: lightText,
                  fontFamily: selectedHeavyFont,
                }}
              >
                <FormattedMessage
                  id="listen.audioMenu.title"
                  defaultMessage="Chapters"
                />
              </Text>
              <View style={styles.flatList}>
                <FlatList
                  data={audioList}
                  renderItem={({ item }) => {
                    console.log("item:", item);
                    return (
                      <MenuItem
                        key={item.uri}
                        onPress={() => handleMenuItemPress(item.title)}
                        onPressIn={() => handleMenuItemPressIn(item.title)}
                        onPressOut={() => handleMenuItemPressOut(item.title)}
                        title={item.title}
                        uri={item.uri}
                      />
                    );
                  }}
                />
              </View>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setAudioMenuIsVisible(false);
                  setMenuIsOpen(false);
                }}
              >
                <Text
                  style={{
                    ...styles.modalButtonText,
                    color: lightText,
                    fontFamily: selectedFont,
                  }}
                >
                  <FormattedMessage
                    id="listen.modal.close"
                    defaultMessage="Close"
                  />
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={infoBookmarkMenuIsVisible}
        >
          <View style={styles.modal}>
            <View
              style={{
                ...styles.modalView,
                backgroundColor: color500,
              }}
            >
              <Text
                style={{
                  ...styles.modalTitle,
                  color: lightText,
                  fontFamily: selectedHeavyFont,
                }}
              >
                <FormattedMessage
                  id={`listen.infoBookmarkMenu.myExternalCause.${audioList[currentAudioIndex].id}`}
                  defaultMessage={audioList[currentAudioIndex].title}
                />
              </Text>
              <Reader currentPageIndex={currentAudioIndex} />
              {/* <ScrollView
                style={{
                  ...styles.scrollView,
                  backgroundColor: color700,
                }}
                nestedScrollEnabled={true}
              >
                {textsList.map((txt) => {
                  if (txt.index === currentAudioIndex) {
                    return txt.components.map((comp) => {
                      switch (comp.type) {
                        case "main_title":
                          return (
                            <Text
                              key={comp.id}
                              style={{
                                ...styles.mainTitle,
                                color: lightText,
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
                                color: lightText,
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
                                color: lightText,
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
                                        fontSize: 28,
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
                                color: lightText,
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
                                color: lightText,
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
                              <View key={comp.id} style={styles.imageContainer}>
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
                                      return (
                                        <Image
                                          style={{
                                            width: "100%",
                                            height: "75%",
                                            flex: 1,
                                          }}
                                          // contentFit="cover"
                                          key={src}
                                          source={{
                                            uri: "http://192.168.4.22:9090/assets/myExternalCause_images/where_are_they_going/where_are_they_going.png",
                                          }}
                                          alt={src}
                                        />
                                      );
                                  }
                                })}
                                <Text
                                  style={{
                                    ...styles.chapterContent,
                                    fontFamily: selectedFont,
                                    color: lightText,
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
                                fontFamily: selectedFont,
                                color: lightText,
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
                                ...styles.modalText,
                                color: lightText,
                                fontFamily: selectedFont,
                              }}
                            >
                              Empty
                            </Text>
                          );
                      }
                    });
                  }
                })}
              </ScrollView> */}
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setInfoBookmarkMenuIsVisible(false);
                  setInfoBookmarkIsOpen(false);
                }}
              >
                <Text
                  style={{
                    ...styles.modalButtonText,
                    color: lightText,
                    fontFamily: selectedFont,
                  }}
                >
                  <FormattedMessage
                    id="listen.modal.close"
                    defaultMessage="Close"
                  />
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  titleContainer: {
    borderTopWidth: 6,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
  },
  titleText: {
    fontSize: 32,
  },
  audioView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  audioText: {
    fontSize: 24,
    padding: 10,
  },
  audioPlayerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  audioPlayerText: {
    fontSize: 18,
    paddingVertical: 10,
  },
  audioControlsView: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modal: {
    backgroundColor: "rgba(40,40,40,0.8)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalView: {
    borderWidth: 4,
    borderRadius: 12,
    borderColor: "#FFFFFF",
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  modalTitle: {
    fontSize: 32,
    borderBottomWidth: 6,
    borderColor: "#FFFFFF",
    padding: 6,
    width: "100%",
    textAlign: "center",
  },
  modalText: {
    fontSize: 24,
    padding: 12,
  },
  modalButton: {
    padding: 6,
    borderWidth: 4,
    borderRadius: 12,
    borderColor: "#FFFFFF",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 32,
  },
  menuItem: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#FFFFFF",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  menuItemText: {
    color: "#FFFFFF",
  },
  flatList: {
    maxHeight: "70%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 15,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    height: "70%",
    width: "100%",
    borderWidth: 4,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 20,
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
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 6,
  },
});
