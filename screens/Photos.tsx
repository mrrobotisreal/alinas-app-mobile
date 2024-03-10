import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Modal,
  ImageBackground,
} from "react-native";
import { FormattedMessage, useIntl } from "react-intl";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { LocalContext } from "../context/LocalContext";
import { BookContext } from "../context/BookContext";
import { PlatformContext } from "../context/PlatformContext";
import { PhotoAlbumsImagesCache } from "../cache/PhotoAlbumsImages";
import { Album, PhotosContext } from "../context/PhotosContext";
import { Image } from "expo-image";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { BarChartItem } from "../types/types";
import { emulatorURL, serverURL } from "../constants/urls";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import BackgroundImage from "../components/BackgroundImage";
import useCaptureEvent, {
  EventObject,
  EventMetric,
} from "../hooks/useCaptureEvent";
import useGetEvents, { FetchEventsProps } from "../hooks/useGetEvents";

function getUri(albumId: string, photoIndex: number) {
  const index = photoIndex + 1;

  // http://192.168.4.22:9090
  const uri = `${serverURL}/assets/photosAlbums/${albumId}/${albumId}${
    index >= 10 && index < 100
      ? "0" + index
      : index >= 100
      ? `${index}`
      : "00" + index
  }.jpg`;

  return uri;
}

export default function Photos() {
  const intl = useIntl();
  const { captureEvent } = useCaptureEvent();
  const { fetchEvents, allEvents } = useGetEvents();
  const { timeZone, currentLang } = useContext(LocalContext);
  const { currentBook } = useContext(BookContext);
  const albumsSVRef = useRef<ScrollView>();
  const {
    color300,
    color500,
    color700,
    lightText,
    darkText,
    photosBgUri,
    currentTheme,
  } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont, currentFont } =
    useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { albums, fetchAlbumLength } = useContext(PhotosContext);
  const { loadAlbumImages } = useContext(PhotoAlbumsImagesCache);
  const [menuIconColor, setMenuIconColor] = useState<string>("#FFFFFF");
  const [listOfAlbumsIsOpen, setListOfAlbumsIsOpen] = useState<boolean>(false);
  const [albumsIconColor, setAlbumsIconColor] = useState<string>("#FFFFFF");
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>(
    albums[0].id || "paris"
  );
  const [albumIsLoading, setAlbumIsLoading] = useState<boolean>(false);
  const [viewAlbumIsOpen, setViewAlbumIsOpen] = useState<boolean>(false);
  const [currentAlbumLength, setCurrentAlbumLength] = useState<number>(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [uri, setUri] = useState<string>();
  const [previousPhotoIconColor, setPreviousPhotoIconColor] =
    useState<string>("#FFFFFF");
  const [nextPhotoIconColor, setNextPhotoIconColor] =
    useState<string>("#FFFFFF");
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
  const [shareIconColor, setShareIconColor] = useState<string>("#FFFFFF");
  const [isViewingPhotoStats, setIsViewingPhotoStats] =
    useState<boolean>(false);
  const [isViewingStats, setIsViewingStats] = useState<boolean>(false);
  const [isViewingDayChart, setIsViewingDayChart] = useState<boolean>(false);
  const [isViewingMonthChart, setIsViewingMonthChart] =
    useState<boolean>(false);
  const [isViewingYearChart, setIsViewingYearChart] = useState<boolean>(false);
  const [eventChartItems, setEventChartItems] = useState([]);
  const [dayChartItems, setDayChartItems] = useState([]);
  const [monthChartItems, setMonthChartItems] = useState([]);
  const [yearChartItems, setYearChartItems] = useState([]);
  const [timesViewedToday, setTimesViewedToday] = useState<number>(0);
  const [timesViewedThisMonth, setTimesViewedThisMonth] = useState<number>(0);
  const [timesViewedThisYear, setTimesViewedThisYear] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  const [photoMetric, setPhotoMetric] = useState<EventMetric | null>(null);
  const [modalPreviousColor, setModalPreviousColor] =
    useState<string>("#FFFFFF");
  const [modalNextColor, setModalNextColor] = useState<string>("#FFFFFF");
  const [modalCloseColor, setModalCloseColor] = useState<string>("#FFFFFF");

  /**
   * Functions
   */
  const handlePressInMenu = () => setMenuIconColor(color300);
  const handlePressOutMenu = () => setMenuIconColor("#FFFFFF");
  const handlePressMenu = () => {
    if (!listOfAlbumsIsOpen) {
      const date = new Date();
      const newEvent: EventObject = {
        name: "Press button",
        location: "Photos",
        context: "Select album",
        detail: "Open albums menu",
        timestamp: date.getTime(),
        date: date.toDateString(),
        time: date.toTimeString(),
        timeZone: timeZone || "UTC",
        constants: {
          selectedLanguage: currentLang,
          selectedBook: currentBook,
          selectedFont: currentFont,
          selectedTheme: currentTheme,
        },
      };
      captureEvent(newEvent);

      if (viewAlbumIsOpen) {
        const uri: string[] = getUri(currentAlbumId, currentPhotoIndex).split(
          "/"
        );
        const newEvent: EventObject = {
          name: "Press button",
          location: "Photos",
          context: "View photo",
          detail: `${uri[uri.length - 1]}`,
          timestamp: date.getTime(),
          date: date.toDateString(),
          time: date.toTimeString(),
          timeZone: timeZone || "UTC",
          constants: {
            selectedLanguage: currentLang,
            selectedBook: currentBook,
            selectedFont: currentFont,
            selectedTheme: currentTheme,
          },
        };

        if (
          photoMetric?.startTime &&
          photoMetric?.detail &&
          !photoMetric?.endTime
        ) {
          const now = date.getTime();
          const newPhotoMetric: EventMetric = {
            ...photoMetric,
            eventType: "photo",
            detail: `${uri[uri.length - 1]}`,
            endTime: now,
            value: now - photoMetric.startTime,
          };
          captureEvent(newEvent, newPhotoMetric);
        }

        const newPhotoMetric: EventMetric = {
          context: "View photo",
          eventType: "photo",
          detail: `${uri[uri.length - 1]}`,
          startTime: null,
          endTime: null,
          value: null,
        };
        setPhotoMetric(newPhotoMetric);
      }
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(!listOfAlbumsIsOpen);
    setViewAlbumIsOpen(false);
    setShareIsOpen(false);
  };

  const handlePressInAlbums = () => setAlbumsIconColor(color300);
  const handlePressOutAlbums = () => setAlbumsIconColor("#FFFFFF");
  const handlePressAlbums = () => {
    const uri: string[] = getUri(currentAlbumId, currentPhotoIndex).split("/");
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Photos",
      context: "View photo",
      detail: `${uri[uri.length - 1]}`,
      timestamp: date.getTime(),
      date: date.toDateString(),
      time: date.toTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedLanguage: currentLang,
        selectedBook: currentBook,
        selectedFont: currentFont,
        selectedTheme: currentTheme,
      },
    };
    if (!viewAlbumIsOpen) {
      const newPhotoMetric: EventMetric = {
        context: "View photo",
        eventType: "photo",
        detail: `${uri[uri.length - 1]}`,
        startTime: null,
        endTime: null,
        value: null,
      };
      setPhotoMetric(newPhotoMetric);
    } else {
      if (
        photoMetric?.startTime &&
        photoMetric?.detail &&
        !photoMetric?.endTime
      ) {
        const now = date.getTime();
        const newPhotoMetric: EventMetric = {
          ...photoMetric,
          eventType: "photo",
          detail: `${uri[uri.length - 1]}`,
          endTime: now,
          value: now - photoMetric.startTime,
        };
        captureEvent(newEvent, newPhotoMetric);
      }

      const newPhotoMetric: EventMetric = {
        context: "View photo",
        eventType: "photo",
        detail: `${uri[uri.length - 1]}`,
        startTime: null,
        endTime: null,
        value: null,
      };
      setPhotoMetric(newPhotoMetric);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(false);
    setViewAlbumIsOpen(!viewAlbumIsOpen);
    setShareIsOpen(false);
    setCurrentPhotoIndex(0);
  };

  const handlePressInPreviousPhoto = () => setPreviousPhotoIconColor(color300);
  const handlePressOutPreviousPhoto = () =>
    setPreviousPhotoIconColor("#FFFFFF");
  const handlePressPreviousPhoto = () => {
    const uri: string[] = getUri(currentAlbumId, currentPhotoIndex).split("/");
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Photos",
      context: "View photo",
      detail: `${uri[uri.length - 1]}`,
      timestamp: date.getTime(),
      date: date.toDateString(),
      time: date.toTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedLanguage: currentLang,
        selectedBook: currentBook,
        selectedFont: currentFont,
        selectedTheme: currentTheme,
      },
    };

    if (
      photoMetric?.startTime &&
      photoMetric?.detail &&
      !photoMetric?.endTime
    ) {
      const now = date.getTime();
      const newPhotoMetric: EventMetric = {
        ...photoMetric,
        eventType: "photo",
        detail: `${uri[uri.length - 1]}`,
        endTime: now,
        value: now - photoMetric.startTime,
      };
      captureEvent(newEvent, newPhotoMetric);
    }

    const nextUri: string[] = getUri(
      currentAlbumId,
      currentPhotoIndex === 0 ? currentAlbumLength - 1 : currentPhotoIndex - 1
    ).split("/");
    const newPhotoMetric: EventMetric = {
      context: "View photo",
      eventType: "photo",
      detail: `${nextUri[nextUri.length - 1]}`,
      startTime: date.getTime(),
      endTime: null,
      value: null,
    };
    setPhotoMetric(newPhotoMetric);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentPhotoIndex(
      currentPhotoIndex === 0 ? currentAlbumLength - 1 : currentPhotoIndex - 1
    );
  };

  const handlePressInNextPhoto = () => setNextPhotoIconColor(color300);
  const handlePressOutNextPhoto = () => setNextPhotoIconColor("#FFFFFF");
  const handlePressNextPhoto = () => {
    const uri: string[] = getUri(currentAlbumId, currentPhotoIndex).split("/");
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Photos",
      context: "View photo",
      detail: `${uri[uri.length - 1]}`,
      timestamp: date.getTime(),
      date: date.toDateString(),
      time: date.toTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedLanguage: currentLang,
        selectedBook: currentBook,
        selectedFont: currentFont,
        selectedTheme: currentTheme,
      },
    };

    if (
      photoMetric?.startTime &&
      photoMetric?.detail &&
      !photoMetric?.endTime
    ) {
      const now = date.getTime();
      const newPhotoMetric: EventMetric = {
        ...photoMetric,
        eventType: "photo",
        detail: `${uri[uri.length - 1]}`,
        endTime: now,
        value: now - photoMetric.startTime,
      };
      captureEvent(newEvent, newPhotoMetric);
    }

    const nextUri: string[] = getUri(
      currentAlbumId,
      currentPhotoIndex === currentAlbumLength - 1 ? 0 : currentPhotoIndex + 1
    ).split("/");
    const newPhotoMetric: EventMetric = {
      context: "View photo",
      eventType: "photo",
      detail: `${nextUri[nextUri.length - 1]}`,
      startTime: date.getTime(),
      endTime: null,
      value: null,
    };
    setPhotoMetric(newPhotoMetric);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentPhotoIndex(
      currentPhotoIndex === currentAlbumLength - 1 ? 0 : currentPhotoIndex + 1
    );
  };
  const handleViewPhotoStats = () => {
    setIsViewingDayChart(false);
    setIsViewingMonthChart(false);
    setIsViewingYearChart(false);
    setStatsLoading(true);
    setIsViewingPhotoStats(true);
    setIsViewingStats(true);
    const props: FetchEventsProps = {
      eventTypes: {
        context: "View photo",
        detail: uri?.split("/")[uri.split("/").length - 1],
      },
      isSpecific: true,
    };
    fetchEvents(props);
  };

  const handlePressInShare = () => setShareIconColor(color300);
  const handlePressOutShare = () => setShareIconColor("#FFFFFF");
  const handlePressShare = () => {
    if (!viewAlbumIsOpen) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(false);
    // setViewAlbumIsOpen(false);
    setShareIsOpen(!shareIsOpen);
    Sharing.isAvailableAsync()
      .then((res) => {
        console.log("Sharing.isAvailableAsync:", res);
        if (res) {
          Sharing.shareAsync(FileSystem.documentDirectory + "assets/splash.png")
            .then((res) => console.log("Sharing.shareAsync:", res))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const updateUri = () => {
    setUri(getUri(currentAlbumId, currentPhotoIndex));
  };

  const updateAlbumLength = (length: number) => {
    setCurrentAlbumLength(length);
  };

  const updateAlbumIsLoading = (isLoading: boolean) => {
    setAlbumIsLoading(isLoading);
  };

  /**
   * Effects
   */
  useEffect(() => {
    // set up react-query for events and use loading state
    // set eventChartItems
    const dateObj = new Date();
    const now = dateObj.getTime();
    const oneHour = 3600000;
    const oneDay = 86400000;
    const oneMonth_30Days = 2592000000;
    const oneYear_365Days = 31536000000;
    const dateArr = dateObj.toLocaleDateString().split("/");
    const today = dateArr[1];
    const oneDayAgoEvents = [];
    const thisMonth = dateArr[0];
    const oneMonthAgoEvents = [];
    const thisYear = dateArr[2];
    const oneYearAgoEvents = [];
    let todayCount = 0;
    let thisMonthCount = 0;
    let thisYearCount = 0;
    let oneHourAgoCount = 0;
    let twoHoursAgoCount = 0;
    let threeHoursAgoCount = 0;
    let fourHoursAgoCount = 0;
    let fiveHoursAgoCount = 0;
    let sixHoursAgoCount = 0;
    let sevenHoursAgoCount = 0;
    let eightHoursAgoCount = 0;
    let nineHoursAgoCount = 0;
    let tenHoursAgoCount = 0;
    let elevenHoursAgoCount = 0;
    let twelveHoursAgoCount = 0;
    let thirteenHoursAgoCount = 0;
    let fourteenHoursAgoCount = 0;
    let fifteenHoursAgoCount = 0;
    let sixteenHoursAgoCount = 0;
    let seventeenHoursAgoCount = 0;
    let eighteenHoursAgoCount = 0;
    let nineteenHoursAgoCount = 0;
    let twentyHoursAgoCount = 0;
    let twentyOneHoursAgoCount = 0;
    let twentyTwoHoursAgoCount = 0;
    let twentyThreeHoursAgoCount = 0;
    let twentyFourHoursAgoCount = 0;
    let oneDayAgoCount = 0;
    let twoDaysAgoCount = 0;
    let threeDaysAgoCount = 0;
    let fourDaysAgoCount = 0;
    let fiveDaysAgoCount = 0;
    let sixDaysAgoCount = 0;
    let sevenDaysAgoCount = 0;
    let eightDaysAgoCount = 0;
    let nineDaysAgoCount = 0;
    let tenDaysAgoCount = 0;
    let elevenDaysAgoCount = 0;
    let twelveDaysAgoCount = 0;
    let thirteenDaysAgoCount = 0;
    let fourteenDaysAgoCount = 0;
    let fifteenDaysAgoCount = 0;
    let sixteenDaysAgoCount = 0;
    let seventeenDaysAgoCount = 0;
    let eighteenDaysAgoCount = 0;
    let nineteenDaysAgoCount = 0;
    let twentyDaysAgoCount = 0;
    let twentyOneDaysAgoCount = 0;
    let twentyTwoDaysAgoCount = 0;
    let twentyThreeDaysAgoCount = 0;
    let twentyFourDaysAgoCount = 0;
    let twentyFiveDaysAgoCount = 0;
    let twentySixDaysAgoCount = 0;
    let twentySevenDaysAgoCount = 0;
    let twentyEightDaysAgoCount = 0;
    let twentyNineDaysAgoCount = 0;
    let thirtyDaysAgoCount = 0;
    let thirtyOneDaysAgoCount = 0;
    let oneMonthAgoCount = 0;
    let twoMonthsAgoCount = 0;
    let threeMonthsAgoCount = 0;
    let fourMonthsAgoCount = 0;
    let fiveMonthsAgoCount = 0;
    let sixMonthsAgoCount = 0;
    let sevenMonthsAgoCount = 0;
    let eightMonthsAgoCount = 0;
    let nineMonthsAgoCount = 0;
    let tenMonthsAgoCount = 0;
    let elevenMonthsAgoCount = 0;
    let twelveMonthsAgoCount = 0;
    let oneYearAgoCount = 0;

    allEvents.forEach((event) => {
      const eventDate = new Date(event.timestamp);
      const eventDateArr = eventDate.toLocaleDateString().split("/");
      const eventDay = eventDateArr[1];
      const eventMonth = eventDateArr[0];
      const eventYear = eventDateArr[2];

      if (dateObj.toLocaleDateString() === eventDate.toLocaleDateString())
        todayCount++;
      if (eventMonth === thisMonth && eventYear === thisYear) thisMonthCount++;
      if (eventYear === thisYear) thisYearCount++;

      if (event.context === "View photo" && event.timestamp) {
        if (event.timestamp >= now - oneHour && event.timestamp < now) {
          oneHourAgoCount++;
        }
        if (
          event.timestamp >= now - 2 * oneHour &&
          event.timestamp < now - oneHour
        ) {
          twoHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 3 * oneHour &&
          event.timestamp < now - 2 * oneHour
        ) {
          threeHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 4 * oneHour &&
          event.timestamp < now - 3 * oneHour
        ) {
          fourHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 5 * oneHour &&
          event.timestamp < now - 4 * oneHour
        ) {
          fiveHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 6 * oneHour &&
          event.timestamp < now - 5 * oneHour
        ) {
          sixHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 7 * oneHour &&
          event.timestamp < now - 6 * oneHour
        ) {
          sevenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 8 * oneHour &&
          event.timestamp < now - 7 * oneHour
        ) {
          eightHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 9 * oneHour &&
          event.timestamp < now - 8 * oneHour
        ) {
          nineHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 10 * oneHour &&
          event.timestamp < now - 9 * oneHour
        ) {
          tenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 11 * oneHour &&
          event.timestamp < now - 10 * oneHour
        ) {
          elevenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 12 * oneHour &&
          event.timestamp < now - 11 * oneHour
        ) {
          twelveHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 13 * oneHour &&
          event.timestamp < now - 12 * oneHour
        ) {
          thirteenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 14 * oneHour &&
          event.timestamp < now - 13 * oneHour
        ) {
          fourteenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 15 * oneHour &&
          event.timestamp < now - 14 * oneHour
        ) {
          fifteenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 16 * oneHour &&
          event.timestamp < now - 15 * oneHour
        ) {
          sixteenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 17 * oneHour &&
          event.timestamp < now - 16 * oneHour
        ) {
          seventeenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 18 * oneHour &&
          event.timestamp < now - 17 * oneHour
        ) {
          eighteenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 19 * oneHour &&
          event.timestamp < now - 18 * oneHour
        ) {
          nineteenHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 20 * oneHour &&
          event.timestamp < now - 19 * oneHour
        ) {
          twentyHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 21 * oneHour &&
          event.timestamp < now - 20 * oneHour
        ) {
          twentyOneHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 22 * oneHour &&
          event.timestamp < now - 21 * oneHour
        ) {
          twentyTwoHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 23 * oneHour &&
          event.timestamp < now - 22 * oneHour
        ) {
          twentyThreeHoursAgoCount++;
        }
        if (
          event.timestamp >= now - 24 * oneHour &&
          event.timestamp < now - 23 * oneHour
        ) {
          twentyFourHoursAgoCount++;
        }
      }
      if (
        event.context === "View photo" &&
        event.timestamp
        // event.timestamp <= now - oneMonth_30Days
      ) {
        if (event.timestamp >= now - oneDay && event.timestamp < now) {
          oneDayAgoCount++;
        } else if (
          event.timestamp >= now - 2 * oneDay &&
          event.timestamp < now - oneDay
        ) {
          twoDaysAgoCount++;
        } else if (
          event.timestamp >= now - 3 * oneDay &&
          event.timestamp < now - 2 * oneDay
        ) {
          threeDaysAgoCount++;
        } else if (
          event.timestamp >= now - 4 * oneDay &&
          event.timestamp < now - 3 * oneDay
        ) {
          fourDaysAgoCount++;
        } else if (
          event.timestamp >= now - 5 * oneDay &&
          event.timestamp < now - 4 * oneDay
        ) {
          fiveDaysAgoCount++;
        } else if (
          event.timestamp >= now - 6 * oneDay &&
          event.timestamp < now - 5 * oneDay
        ) {
          sixDaysAgoCount++;
        } else if (
          event.timestamp >= now - 7 * oneDay &&
          event.timestamp < now - 6 * oneDay
        ) {
          sevenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 8 * oneDay &&
          event.timestamp < now - 7 * oneDay
        ) {
          eightDaysAgoCount++;
        } else if (
          event.timestamp >= now - 9 * oneDay &&
          event.timestamp < now - 8 * oneDay
        ) {
          nineDaysAgoCount++;
        } else if (
          event.timestamp >= now - 10 * oneDay &&
          event.timestamp < now - 9 * oneDay
        ) {
          tenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 11 * oneDay &&
          event.timestamp < now - 10 * oneDay
        ) {
          elevenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 12 * oneDay &&
          event.timestamp < now - 11 * oneDay
        ) {
          twelveDaysAgoCount++;
        } else if (
          event.timestamp >= now - 13 * oneDay &&
          event.timestamp < now - 12 * oneDay
        ) {
          thirteenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 14 * oneDay &&
          event.timestamp < now - 13 * oneDay
        ) {
          fourteenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 15 * oneDay &&
          event.timestamp < now - 14 * oneDay
        ) {
          fifteenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 16 * oneDay &&
          event.timestamp < now - 15 * oneDay
        ) {
          sixteenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 17 * oneDay &&
          event.timestamp < now - 16 * oneDay
        ) {
          seventeenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 18 * oneDay &&
          event.timestamp < now - 17 * oneDay
        ) {
          eighteenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 19 * oneDay &&
          event.timestamp < now - 18 * oneDay
        ) {
          nineteenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 20 * oneDay &&
          event.timestamp < now - 19 * oneDay
        ) {
          twentyDaysAgoCount++;
        } else if (
          event.timestamp >= now - 21 * oneDay &&
          event.timestamp < now - 20 * oneDay
        ) {
          twentyOneDaysAgoCount++;
        } else if (
          event.timestamp >= now - 22 * oneDay &&
          event.timestamp < now - 21 * oneDay
        ) {
          twentyTwoDaysAgoCount++;
        } else if (
          event.timestamp >= now - 23 * oneDay &&
          event.timestamp < now - 22 * oneDay
        ) {
          twentyThreeDaysAgoCount++;
        } else if (
          event.timestamp >= now - 24 * oneDay &&
          event.timestamp < now - 23 * oneDay
        ) {
          twentyFourDaysAgoCount++;
        } else if (
          event.timestamp >= now - 25 * oneDay &&
          event.timestamp < now - 24 * oneDay
        ) {
          twentyFiveDaysAgoCount++;
        } else if (
          event.timestamp >= now - 26 * oneDay &&
          event.timestamp < now - 25 * oneDay
        ) {
          twentySixDaysAgoCount++;
        } else if (
          event.timestamp >= now - 27 * oneDay &&
          event.timestamp < now - 26 * oneDay
        ) {
          twentySevenDaysAgoCount++;
        } else if (
          event.timestamp >= now - 28 * oneDay &&
          event.timestamp < now - 27 * oneDay
        ) {
          twentyEightDaysAgoCount++;
        } else if (
          event.timestamp >= now - 29 * oneDay &&
          event.timestamp < now - 28 * oneDay
        ) {
          twentyNineDaysAgoCount++;
        } else if (
          event.timestamp >= now - 30 * oneDay &&
          event.timestamp < now - 29 * oneDay
        ) {
          thirtyDaysAgoCount++;
        }
      }
      if (
        event.context === "View photo" &&
        event.timestamp
        // event.timestamp <= now - oneYear_365Days
      ) {
        if (event.timestamp >= now - oneMonth_30Days && event.timestamp < now) {
          oneMonthAgoCount++;
        } else if (
          event.timestamp >= now - 2 * oneMonth_30Days &&
          event.timestamp < now - oneMonth_30Days
        ) {
          twoMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 3 * oneMonth_30Days &&
          event.timestamp < now - 2 * oneMonth_30Days
        ) {
          threeMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 4 * oneMonth_30Days &&
          event.timestamp < now - 3 * oneMonth_30Days
        ) {
          fourMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 5 * oneMonth_30Days &&
          event.timestamp < now - 4 * oneMonth_30Days
        ) {
          fiveMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 6 * oneMonth_30Days &&
          event.timestamp < now - 5 * oneMonth_30Days
        ) {
          sixMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 7 * oneMonth_30Days &&
          event.timestamp < now - 6 * oneMonth_30Days
        ) {
          sevenMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 8 * oneMonth_30Days &&
          event.timestamp < now - 7 * oneMonth_30Days
        ) {
          eightMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 9 * oneMonth_30Days &&
          event.timestamp < now - 8 * oneMonth_30Days
        ) {
          nineMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 10 * oneMonth_30Days &&
          event.timestamp < now - 9 * oneMonth_30Days
        ) {
          tenMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 11 * oneMonth_30Days &&
          event.timestamp < now - 10 * oneMonth_30Days
        ) {
          elevenMonthsAgoCount++;
        } else if (
          event.timestamp >= now - 12 * oneMonth_30Days &&
          event.timestamp < now - 11 * oneMonth_30Days
        ) {
          twelveMonthsAgoCount++;
        }
      }
    });

    oneDayAgoEvents.push(
      {
        value: twentyFourHoursAgoCount,
      },
      {
        label: "23 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyThreeHoursAgoCount,
      },
      {
        label: "22 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyTwoHoursAgoCount,
      },
      {
        label: "21 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyOneHoursAgoCount,
      },
      {
        label: "20 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyHoursAgoCount,
      },
      {
        label: "19 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: nineteenHoursAgoCount,
      },
      {
        label: "18 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: eighteenHoursAgoCount,
      },
      {
        label: "17 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: seventeenHoursAgoCount,
      },
      {
        label: "16 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sixteenHoursAgoCount,
      },
      {
        label: "15 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fifteenHoursAgoCount,
      },
      {
        label: "14 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fourteenHoursAgoCount,
      },
      {
        label: "13 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: thirteenHoursAgoCount,
      },
      {
        label: "12 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twelveHoursAgoCount,
      },
      {
        label: "11 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: elevenHoursAgoCount,
      },
      {
        label: "10 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: tenHoursAgoCount,
      },
      {
        label: "9 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: nineHoursAgoCount,
      },
      {
        label: "8 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: eightHoursAgoCount,
      },
      {
        label: "7 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sevenHoursAgoCount,
      },
      {
        label: "6 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sixHoursAgoCount,
      },
      {
        label: "5 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fiveHoursAgoCount,
      },
      {
        label: "4 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fourHoursAgoCount,
      },
      {
        label: "3 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: threeHoursAgoCount,
      },
      {
        label: "2 hours ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twoHoursAgoCount,
      },
      {
        label: "1 hour ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: oneHourAgoCount,
      }
    );
    oneMonthAgoEvents.push(
      {
        value: thirtyDaysAgoCount,
      },
      {
        label: "29 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyNineDaysAgoCount,
      },
      {
        label: "28 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyEightDaysAgoCount,
      },
      {
        label: "27 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentySevenDaysAgoCount,
      },
      {
        label: "26 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentySixDaysAgoCount,
      },
      {
        label: "25 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyFiveDaysAgoCount,
      },
      {
        label: "24 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyFourDaysAgoCount,
      },
      {
        label: "23 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyThreeDaysAgoCount,
      },
      {
        label: "22 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyTwoDaysAgoCount,
      },
      {
        label: "21 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyOneDaysAgoCount,
      },
      {
        label: "20 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twentyDaysAgoCount,
      },
      {
        label: "19 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: nineteenDaysAgoCount,
      },
      {
        label: "18 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: eighteenDaysAgoCount,
      },
      {
        label: "17 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: seventeenDaysAgoCount,
      },
      {
        label: "16 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sixteenDaysAgoCount,
      },
      {
        label: "15 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fifteenDaysAgoCount,
      },
      {
        label: "14 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fourteenDaysAgoCount,
      },
      {
        label: "13 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: thirteenDaysAgoCount,
      },
      {
        label: "12 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twelveDaysAgoCount,
      },
      {
        label: "11 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: elevenDaysAgoCount,
      },
      {
        label: "10 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: tenDaysAgoCount,
      },
      {
        label: "9 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: nineDaysAgoCount,
      },
      {
        label: "8 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: eightDaysAgoCount,
      },
      {
        label: "7 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sevenDaysAgoCount,
      },
      {
        label: "6 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sixDaysAgoCount,
      },
      {
        label: "5 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fiveDaysAgoCount,
      },
      {
        label: "4 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fourDaysAgoCount,
      },
      {
        label: "3 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: threeDaysAgoCount,
      },
      {
        label: "2 days ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twoDaysAgoCount,
      },
      {
        label: "1 day ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: oneDayAgoCount,
      },
      {
        label: "today",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: todayCount,
      }
    );
    oneYearAgoEvents.push(
      {
        value: twelveMonthsAgoCount,
      },
      {
        label: "11 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: elevenMonthsAgoCount,
      },
      {
        label: "10 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: tenMonthsAgoCount,
      },
      {
        label: "9 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: nineMonthsAgoCount,
      },
      {
        label: "8 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: eightMonthsAgoCount,
      },
      {
        label: "7 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sevenMonthsAgoCount,
      },
      {
        label: "6 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: sixMonthsAgoCount,
      },
      {
        label: "5 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fiveMonthsAgoCount,
      },
      {
        label: "4 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: fourMonthsAgoCount,
      },
      {
        label: "3 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: threeMonthsAgoCount,
      },
      {
        label: "2 months ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: twoMonthsAgoCount,
      },
      {
        label: "1 month ago",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: oneMonthAgoCount,
      },
      {
        label: "this month",
        labelTextStyle: {
          fontFamily: selectedFont,
          color: darkText,
        },
        value: thisMonthCount,
      }
    );

    setDayChartItems(oneDayAgoEvents);
    setMonthChartItems(oneMonthAgoEvents);
    setYearChartItems(oneYearAgoEvents);
    setTimesViewedToday(todayCount);
    setTimesViewedThisMonth(thisMonthCount);
    setTimesViewedThisYear(thisYearCount);
    setTimeout(() => setStatsLoading(false), 1000);
  }, [allEvents]);

  useEffect(() => {
    updateUri();
  }, [currentAlbumId, currentPhotoIndex]);

  useEffect(() => {
    setCurrentPhotoIndex(0);
    fetchAlbumLength(currentAlbumId, updateAlbumLength);
  }, [currentAlbumId]);

  useEffect(() => {
    if (viewAlbumIsOpen) {
      updateAlbumIsLoading(true);
      loadAlbumImages(currentAlbumId, setAlbumIsLoading, updateAlbumIsLoading);
    }
  }, [viewAlbumIsOpen]);

  /**
   * Components
   */
  const AlbumButton = ({ id, index, title }: Album) => (
    <Pressable
      onPress={() => {
        const date = new Date();
        const newEvent: EventObject = {
          name: "Press button",
          location: "Photos",
          context: "View album",
          detail: title,
          timestamp: date.getTime(),
          date: date.toDateString(),
          time: date.toTimeString(),
          timeZone: timeZone || "UTC",
          constants: {
            selectedLanguage: currentLang,
            selectedBook: currentBook,
            selectedFont: currentFont,
            selectedTheme: currentTheme,
          },
        };
        captureEvent(newEvent);
        const uri: string[] = getUri(id, currentPhotoIndex).split("/");
        // newEvent.context = "View photo";
        // newEvent.detail = `${uri[uri.length - 1]}`;
        // captureEvent(newEvent);
        const newPhotoMetric: EventMetric = {
          context: "View photo",
          eventType: "photo",
          detail: `${uri[uri.length - 1]}`,
          startTime: date.getTime(),
          endTime: null,
          value: null,
        };
        setPhotoMetric(newPhotoMetric);
        setCurrentAlbumIndex(index);
        setCurrentAlbumId(id);
        setListOfAlbumsIsOpen(false);
        // setAlbumIsLoading(true);

        if (OS === "android") {
          ToastAndroid.showWithGravity(
            `Loading album ${title}...`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        setViewAlbumIsOpen(true);
      }}
      style={{
        ...styles.albumItem,
        padding: albums[currentAlbumIndex].id === id ? 18 : 6,
        borderColor: lightText,
        backgroundColor: color500,
        width: albums[currentAlbumIndex].id === id ? "100%" : "90%",
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          ...styles.albumItemText,
          color: lightText,
          fontFamily:
            albums[currentAlbumIndex].id === id
              ? selectedHeavyFont
              : selectedFont,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <BackgroundImage uri={photosBgUri}>
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {listOfAlbumsIsOpen && (
            <View
              style={{
                ...styles.photosView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 32,
                  textDecorationLine: "underline",
                  paddingBottom: 6,
                }}
              >
                <FormattedMessage
                  id="photos.albums.title"
                  defaultMessage="Photo Albums"
                />
              </Text>
              <View
                style={{
                  ...styles.albumsContainer,
                  backgroundColor: color300,
                }}
              >
                <ScrollView ref={albumsSVRef}>
                  {albums.map((album) => (
                    <AlbumButton
                      key={album.id}
                      id={album.id}
                      title={album.title}
                      index={album.index}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          {viewAlbumIsOpen && (
            <View
              style={{
                ...styles.photosView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 32,
                  paddingBottom: 6,
                  textAlign: "center",
                }}
              >
                {albums[currentAlbumIndex].title}
              </Text>
              <View
                style={{
                  ...styles.albumsContainer,
                  width: "90%",
                  height: "70%",
                  borderWidth: 0,
                }}
              >
                {albumIsLoading ? (
                  <ActivityIndicator
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    size="large"
                    color={color500}
                  />
                ) : (
                  <Pressable onLongPress={handleViewPhotoStats}>
                    <Image
                      // source={currentAlbumPhotos[currentPhotoIndex]}
                      source={{
                        uri: uri,
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      contentFit="contain"
                      transition={300}
                    />
                  </Pressable>
                )}
              </View>
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 26,
                  paddingTop: 6,
                  textAlign: "center",
                }}
              >
                {`(${currentPhotoIndex + 1} / ${currentAlbumLength})`}
              </Text>
            </View>
          )}
          <View
            style={{
              ...styles.photosControlsView,
              backgroundColor: color700,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.photosControls}>
              <Pressable
                onPressIn={handlePressInMenu}
                onPressOut={handlePressOutMenu}
                onPress={handlePressMenu}
                style={{
                  padding: 6,
                }}
              >
                {!listOfAlbumsIsOpen ? (
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
                onPressIn={handlePressInPreviousPhoto}
                onPressOut={handlePressOutPreviousPhoto}
                onPress={handlePressPreviousPhoto}
                style={{
                  padding: 6,
                }}
              >
                <MaterialIcons
                  name="navigate-before"
                  size={48}
                  color={viewAlbumIsOpen ? previousPhotoIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInAlbums}
                onPressOut={handlePressOutAlbums}
                onPress={handlePressAlbums}
                style={{
                  padding: 6,
                }}
              >
                {!viewAlbumIsOpen ? (
                  <MaterialIcons
                    name="photo-album"
                    size={48}
                    color={albumsIconColor}
                  />
                ) : (
                  <Fontisto
                    name="photograph"
                    size={48}
                    color={albumsIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInNextPhoto}
                onPressOut={handlePressOutNextPhoto}
                onPress={handlePressNextPhoto}
                style={{
                  padding: 6,
                }}
              >
                <MaterialIcons
                  name="navigate-next"
                  size={48}
                  color={viewAlbumIsOpen ? nextPhotoIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInShare}
                onPressOut={handlePressOutShare}
                onPress={handlePressShare}
                style={{
                  padding: 6,
                }}
              >
                {!shareIsOpen ? (
                  <FontAwesome
                    name="share-alt"
                    size={48}
                    color={viewAlbumIsOpen ? shareIconColor : "#808080"}
                  />
                ) : (
                  <MaterialIcons
                    name="ios-share"
                    size={48}
                    color={viewAlbumIsOpen ? shareIconColor : "#808080"}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isViewingPhotoStats}
        >
          <View style={styles.modal}>
            <View
              style={{
                ...styles.modalView,
                height: "75%",
                alignContent: "center",
                justifyContent: "space-between",
                backgroundColor: color500,
              }}
            >
              <View>
                <Text
                  style={{
                    ...styles.modalTitle,
                    color: lightText,
                    fontFamily: selectedHeavyFont,
                    textDecorationLine: "underline",
                    textDecorationColor: color700,
                  }}
                >
                  {`${uri?.split("/")[uri.split("/").length - 1]}`}
                </Text>
                {isViewingStats && (
                  <Text
                    style={{
                      ...styles.modalTitle,
                      padding: 0,
                      color: lightText,
                      fontFamily: selectedHeavyFont,
                      alignSelf: "center",
                    }}
                  >
                    {`Photo Stats:`}
                  </Text>
                )}
                {isViewingDayChart && (
                  <Text
                    style={{
                      ...styles.modalTitle,
                      padding: 0,
                      color: lightText,
                      fontFamily: selectedHeavyFont,
                      alignSelf: "center",
                    }}
                  >
                    {`Today's Stats:`}
                  </Text>
                )}
                {isViewingMonthChart && (
                  <Text
                    style={{
                      ...styles.modalTitle,
                      padding: 0,
                      color: lightText,
                      fontFamily: selectedHeavyFont,
                      alignSelf: "center",
                    }}
                  >
                    {`This Month's Stats:`}
                  </Text>
                )}
                {isViewingYearChart && (
                  <Text
                    style={{
                      ...styles.modalTitle,
                      padding: 0,
                      color: lightText,
                      fontFamily: selectedHeavyFont,
                      alignSelf: "center",
                    }}
                  >
                    {`This Year's Stats:`}
                  </Text>
                )}
              </View>
              {statsLoading ? (
                <View
                  style={{
                    ...styles.barChartContainer,
                    width: "100%",
                    height: "60%",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator style={{}} size="large" color={color700} />
                </View>
              ) : (
                <View>
                  {isViewingStats && (
                    <View
                      style={{
                        ...styles.barChartContainer,
                        width: "100%",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.modalText,
                          color: darkText,
                          fontFamily: selectedFont,
                          textDecorationLine: "underline",
                        }}
                      >
                        Times viewed today:
                      </Text>
                      <Text
                        style={{
                          ...styles.modalText,
                          color: darkText,
                          fontFamily: selectedFont,
                        }}
                      >
                        {timesViewedToday}
                      </Text>
                      <Text
                        style={{
                          ...styles.modalText,
                          color: darkText,
                          fontFamily: selectedFont,
                          textDecorationLine: "underline",
                        }}
                      >
                        Times viewed this month:
                      </Text>
                      <Text
                        style={{
                          ...styles.modalText,
                          color: darkText,
                          fontFamily: selectedFont,
                        }}
                      >
                        {timesViewedThisMonth}
                      </Text>
                      <Text
                        style={{
                          ...styles.modalText,
                          color: darkText,
                          fontFamily: selectedFont,
                          textDecorationLine: "underline",
                        }}
                      >
                        Times viewed this year:
                      </Text>
                      <Text
                        style={{
                          ...styles.modalText,
                          color: darkText,
                          fontFamily: selectedFont,
                        }}
                      >
                        {timesViewedThisYear}
                      </Text>
                    </View>
                  )}
                  {isViewingDayChart && (
                    <View
                      style={{
                        ...styles.barChartContainer,
                        width: "100%",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ScrollView horizontal={true}>
                        <LineChart
                          areaChart={true}
                          isAnimated={true}
                          data={dayChartItems}
                          hideRules={false}
                          thickness={5}
                          showVerticalLines={true}
                          verticalLinesColor={color700}
                          color={color500}
                          startOpacity={1}
                          endOpacity={0.7}
                          startFillColor={color300}
                          endFillColor={color300}
                          curved={true}
                          // frontColor={color500}
                          // sideColor={color700}
                          // topColor={color300}
                          // isThreeD={true}
                          // labelWidth={60}
                          // barWidth={40}
                          // sideWidth={15}
                          // side={"right"}
                          initialSpacing={0}
                          spacing={80}
                        />
                      </ScrollView>
                    </View>
                  )}
                  {isViewingMonthChart && (
                    <View
                      style={{
                        ...styles.barChartContainer,
                        width: "100%",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ScrollView horizontal={true}>
                        <LineChart
                          areaChart={true}
                          isAnimated={true}
                          data={monthChartItems}
                          hideRules={false}
                          thickness={5}
                          showVerticalLines={true}
                          verticalLinesColor={color700}
                          color={color500}
                          startOpacity={1}
                          endOpacity={0.7}
                          startFillColor={color300}
                          endFillColor={color300}
                          curved={true}
                          // frontColor={color500}
                          // sideColor={color700}
                          // topColor={color300}
                          // isThreeD={true}
                          // labelWidth={60}
                          // barWidth={40}
                          // sideWidth={15}
                          // side={"right"}
                          initialSpacing={0}
                          spacing={80}
                        />
                      </ScrollView>
                    </View>
                  )}
                  {isViewingYearChart && (
                    <View
                      style={{
                        ...styles.barChartContainer,
                        width: "100%",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ScrollView horizontal={true}>
                        <LineChart
                          areaChart={true}
                          isAnimated={true}
                          data={yearChartItems}
                          hideRules={false}
                          thickness={5}
                          showVerticalLines={true}
                          verticalLinesColor={color700}
                          color={color500}
                          startOpacity={1}
                          endOpacity={0.7}
                          startFillColor={color300}
                          endFillColor={color300}
                          curved={true}
                          // frontColor={color500}
                          // sideColor={color700}
                          // topColor={color300}
                          // isThreeD={true}
                          // labelWidth={60}
                          // barWidth={40}
                          // sideWidth={15}
                          // side={"right"}
                          initialSpacing={0}
                          spacing={80}
                        />
                      </ScrollView>
                    </View>
                  )}
                  {/* <ScrollView horizontal={true}>
                                <BarChart
                                  isAnimated={true}
                                  data={eventChartItems}
                                  hideRules={false}
                                  frontColor={color500}
                                  sideColor={color700}
                                  topColor={color300}
                                  isThreeD={true}
                                  labelWidth={60}
                                  barWidth={40}
                                  sideWidth={15}
                                  side={"right"}
                                  spacing={80}
                                />
                              </ScrollView> */}
                </View>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Pressable
                  style={{
                    ...styles.modalButton,
                    borderColor: modalPreviousColor,
                    padding: 12,
                    borderRadius: 50,
                    width: "auto",
                    marginRight: 12,
                    marginBottom: 12,
                    backgroundColor: color700,
                  }}
                  onPress={() => {
                    if (isViewingStats) {
                      setIsViewingStats(false);
                      setIsViewingDayChart(false);
                      setIsViewingMonthChart(false);
                      setIsViewingYearChart(true);
                    } else if (isViewingDayChart) {
                      setIsViewingStats(true);
                      setIsViewingDayChart(false);
                      setIsViewingMonthChart(false);
                      setIsViewingYearChart(false);
                    } else if (isViewingMonthChart) {
                      setIsViewingStats(false);
                      setIsViewingDayChart(true);
                      setIsViewingMonthChart(false);
                      setIsViewingYearChart(false);
                    } else if (isViewingYearChart) {
                      setIsViewingStats(false);
                      setIsViewingDayChart(false);
                      setIsViewingMonthChart(true);
                      setIsViewingYearChart(false);
                    }
                  }}
                  onPressIn={() => setModalPreviousColor(color300)}
                  onPressOut={() => setModalPreviousColor(lightText)}
                >
                  <AntDesign
                    name="caretleft"
                    size={48}
                    color={modalPreviousColor}
                  />
                  {/* <Text
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
                  </Text> */}
                </Pressable>
                <Pressable
                  style={{
                    ...styles.modalButton,
                    borderColor: modalCloseColor,
                    backgroundColor: color700,
                  }}
                  onPress={() => {
                    setIsViewingPhotoStats(false);
                    setEventChartItems([]);
                    setTimesViewedToday(0);
                    setTimesViewedThisMonth(0);
                    setTimesViewedThisYear(0);
                  }}
                  onPressIn={() => setModalCloseColor(color300)}
                  onPressOut={() => setModalCloseColor(lightText)}
                >
                  <Text
                    style={{
                      ...styles.modalButtonText,
                      color: modalCloseColor,
                      fontFamily: selectedFont,
                    }}
                  >
                    <FormattedMessage
                      id="listen.modal.close"
                      defaultMessage="Close"
                    />
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    ...styles.modalButton,
                    borderColor: modalNextColor,
                    padding: 12,
                    borderRadius: 50,
                    width: "auto",
                    marginLeft: 12,
                    marginBottom: 12,
                    backgroundColor: color700,
                  }}
                  onPress={() => {
                    if (isViewingStats) {
                      setIsViewingStats(false);
                      setIsViewingDayChart(true);
                      setIsViewingMonthChart(false);
                      setIsViewingYearChart(false);
                    } else if (isViewingDayChart) {
                      setIsViewingStats(false);
                      setIsViewingDayChart(false);
                      setIsViewingMonthChart(true);
                      setIsViewingYearChart(false);
                    } else if (isViewingMonthChart) {
                      setIsViewingStats(false);
                      setIsViewingDayChart(false);
                      setIsViewingMonthChart(false);
                      setIsViewingYearChart(true);
                    } else if (isViewingYearChart) {
                      setIsViewingStats(true);
                      setIsViewingDayChart(false);
                      setIsViewingMonthChart(false);
                      setIsViewingYearChart(false);
                    }
                  }}
                  onPressIn={() => setModalNextColor(color300)}
                  onPressOut={() => setModalNextColor(lightText)}
                >
                  <AntDesign
                    name="caretright"
                    size={48}
                    color={modalNextColor}
                  />
                  {/* <Text
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
                  </Text> */}
                </Pressable>
              </View>
              {/* <Pressable
                style={{
                  ...styles.modalButton,
                  backgroundColor: color700,
                }}
                onPress={() => {
                  setIsViewingPhotoStats(false);
                  setEventChartItems([]);
                  setTimesViewedToday(0);
                  setTimesViewedThisMonth(0);
                  setTimesViewedThisYear(0);
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
              </Pressable> */}
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
    // contentFit: "cover",
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
  photosControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  photosControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  photosView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  albumsContainer: {
    width: "90%",
    height: "88%",
    borderColor: "#FFFFFF",
    borderWidth: 6,
    padding: 6,
    borderRadius: 12,
  },
  albumItem: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderRadius: 12,
  },
  albumItemText: {
    fontSize: 24,
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
  barChartContainer: {
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    marginBottom: 10,
  },
});
