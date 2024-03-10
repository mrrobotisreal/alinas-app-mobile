import { useContext, useState, ReactNode, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  ViewStyle,
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { BarChart } from "react-native-gifted-charts";
import { BarChartItem } from "../types/types";
import {
  Entypo,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import BackgroundImage from "../components/BackgroundImage";
import {
  EventObject,
  EventContext,
  EventLocation,
  EventName,
} from "../hooks/useCaptureEvent";
import useGetEvents, { FetchEventsProps } from "../hooks/useGetEvents";

const chartList = [
  {
    id: "bar",
    title: "Bar Chart",
  },
  {
    id: "line",
    title: "Line Chart",
  },
  {
    id: "pie",
    title: "Pie Chart",
  },
];

const optionsList = [
  {
    id: "allEvents",
    title: "All Events",
    events: [],
  },
  {
    id: "specificEvents",
    title: "Specific Events",
    events: [],
  },
  {
    id: "contextEvents",
    title: "Context Events",
    events: [
      "Select book",
      "Previous book",
      "Next book",
      "Open read screen",
      "Read book",
      "Previous chapter",
      "Next chapter",
      "Select chapter",
      "View chapter",
      "Open photos screen",
      "Select album",
      "View album",
      "Previous photo",
      "Next photo",
      "View photo",
      "Open listen screen",
      "Select audiotrack",
      "Previous audiotrack",
      "Next audiotrack",
      "Start player",
      "Play audiotrack",
      "Pause audiotrack",
      "Open watch screen",
      "Select playlist",
      "Previous video",
      "Next video",
      "Play video",
      "Watch video",
      "Open notes screen",
      "Write note",
      "Open settings screen",
      "View fonts",
      "View font info",
      "Change font",
      "View themes",
      "Change theme",
      "View languages",
      "Change language",
    ],
  },
  {
    id: "dateEvents",
    title: "Date Events",
    events: [],
  },
  {
    id: "locationEvents",
    title: "Location Events",
    events: [
      "Home screen",
      "Photos screen",
      "Read screen",
      "Listen screen",
      "Watch screen",
      "Notes screen",
      "Settings screen",
    ],
  },
  {
    id: "nameEvents",
    title: "Name Events",
    events: ["Press button", "Long press button"],
  },
];

const screensList = [
  {
    id: "home",
    title: "Home screen",
  },
  {
    id: "photos",
    title: "Photos screen",
  },
  {
    id: "read",
    title: "Read screen",
  },
  {
    id: "listen",
    title: "Listen screen",
  },
  {
    id: "watch",
    title: "Watch screen",
  },
  {
    id: "notes",
    title: "Notes screen",
  },
  {
    id: "settings",
    title: "Settings screen",
  },
];

export default function Events() {
  const { fetchEvents, allEvents } = useGetEvents();
  const {
    color300,
    color500,
    color700,
    lightText,
    darkText,
    homeBgUri,
    currentTheme,
  } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont, currentFont } =
    useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const [fetchEventsProps, setFetchEventsProps] = useState<FetchEventsProps>(
    {}
  );
  const [eventsListIsOpen, setEventsListIsOpen] = useState(false);
  const [chartsAreOpen, setChartsAreOpen] = useState(false);
  const [chartsAreOpenColor, setChartsAreOpenColor] = useState("#FFFFFF");
  const [notepadIsOpen, setNotepadIsOpen] = useState(false);
  const [notepadIconColor, setNotepadIconColor] = useState("#FFFFFF");
  const [menuIconColor, setMenuIconColor] = useState("#FFFFFF");
  const [choosingChart, setChoosingChart] = useState(false);
  const [selectedChartStyle, setSelectedChartStyle] = useState(chartList[0]);
  const [choosingOption, setChoosingOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState(optionsList[0]);
  const [choosingContextEvent, setChoosingContextEvent] = useState(false);
  const [selectedContextEvent, setSelectedContextEvent] = useState(
    optionsList[0].events[0]
  );
  const [choosingNameEvent, setChoosingNameEvent] = useState(false);
  const [selectedNameEvent, setSelectedNameEvent] = useState(
    optionsList[4].events[0]
  );
  const [choosingScreen, setChoosingScreen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(screensList[0]);
  const [eventsChartItems, setEventsChartItems] = useState<BarChartItem[]>([]);
  const [chartTitle, setChartTitle] = useState("All Events");

  /**
   * Effects
   */
  useEffect(() => {
    console.log("allEvents:", JSON.stringify(allEvents, null, 2));
    if (selectedContextEvent === "Select book") {
      const myExternalCauseEvents = allEvents.filter(
        (event) => event.detail === "My External Cause"
      );
      const theJudgeEvents = allEvents.filter(
        (event) => event.detail === "The Judge"
      );
      const theDreamyManEvents = allEvents.filter(
        (event) => event.detail === "The Dreamy Man"
      );
      const passportalEvents = allEvents.filter(
        (event) => event.detail === "Passportal"
      );
      const loveDrunkEvents = allEvents.filter(
        (event) => event.detail === "Love Drunk"
      );
      const selectBookEvents: BarChartItem[] = [
        {
          value: myExternalCauseEvents.length,
          label: "My External Cause",
          labelTextStyle: {
            fontFamily: selectedFont,
            color: darkText,
          },
        },
        {
          value: theJudgeEvents.length,
          label: "The Judge",
          labelTextStyle: {
            fontFamily: selectedFont,
            color: darkText,
          },
        },
        {
          value: theDreamyManEvents.length,
          label: "The Dreamy Man",
          labelTextStyle: {
            fontFamily: selectedFont,
            color: darkText,
          },
        },
        {
          value: passportalEvents.length,
          label: "Passportal",
          labelTextStyle: {
            fontFamily: selectedFont,
            color: darkText,
          },
        },
        {
          value: loveDrunkEvents.length,
          label: "Love Drunk",
          labelTextStyle: {
            fontFamily: selectedFont,
            color: darkText,
          },
        },
      ];
      setEventsChartItems(selectBookEvents);
    }
  }, [allEvents]);

  /**
   * Functions
   */
  const handlePressInMenu = () => setMenuIconColor(color300);
  const handlePressOutMenu = () => setMenuIconColor("#FFFFFF");
  const handlePressMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setChoosingChart(true);
    setChoosingOption(false);
    setChoosingScreen(false);
    setEventsListIsOpen(!eventsListIsOpen);
    setChartsAreOpen(false);
    setNotepadIsOpen(false);
  };
  const handlePressMenuItem = (i: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSelectedChartStyle(chartList[i]);
    setChoosingChart(false);
    setChoosingOption(true);
    setChartsAreOpen(false);
    setNotepadIsOpen(false);
  };
  const handlePressOptionItem = (i: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const props: FetchEventsProps = {
      eventTypes: {},
      isSpecific: optionsList[i].id === "specificEvents",
    };
    switch (optionsList[i].id) {
      case "contextEvents":
        setChoosingContextEvent(true);
        setChoosingScreen(false);
        setChoosingNameEvent(false);
        break;
      case "locationEvents":
        setChoosingScreen(true);
        setChoosingContextEvent(false);
        setChoosingNameEvent(false);
        break;
      case "dateEvents":
        break;
      case "nameEvents":
        setChoosingNameEvent(true);
        setChoosingContextEvent(false);
        setChoosingScreen(false);
        break;
      case "specificEvents":
        break;
    }
    setSelectedOption(optionsList[i]);
    setChoosingChart(false);
    setChoosingOption(false);
    // setChoosingScreen(false);
    // setChoosingScreen(true);
    setChartsAreOpen(false);
    setNotepadIsOpen(false);
  };
  const handlePressContextItem = (item: string, i: number) => {
    // if specific, then...
    const props: FetchEventsProps = {
      eventTypes: {
        context: item,
      },
      isSpecific: selectedOption.id === "specificEvents",
    };
    fetchEvents(props);
    setChartTitle(item);
    setSelectedContextEvent(item);
    setChoosingChart(false);
    setChoosingOption(false);
    setChoosingContextEvent(false);
    setEventsListIsOpen(false);
    setChartsAreOpen(true);
    setNotepadIsOpen(false);
  };
  const handlePressScreenItem = (i: number) => {
    const props: FetchEventsProps = {
      eventTypes: {},
      isSpecific: selectedOption.id === "specificEvents",
    };
    // fetchEvents(selectedOption.events);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSelectedScreen(screensList[i]);
    setChoosingChart(false);
    setChoosingOption(false);
    setChoosingScreen(false);
    setEventsListIsOpen(false);
    setChartsAreOpen(true);
    setNotepadIsOpen(false);
  };

  const handlePressInOpenCloseCharts = () => setChartsAreOpenColor(color300);
  const handlePressOutOpenCloseCharts = () => setChartsAreOpenColor("#FFFFFF");
  const handlePressOpenCloseCharts = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setChartsAreOpen(!chartsAreOpen);
    setEventsListIsOpen(false);
    setNotepadIsOpen(false);
  };

  const handlePressInNotepad = () => setNotepadIconColor(color300);
  const handlePressOutNotepad = () => setNotepadIconColor("#FFFFFF");
  const handlePressNotepad = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setNotepadIsOpen(!notepadIsOpen);
    setEventsListIsOpen(false);
    setChartsAreOpen(false);
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

  return (
    <View style={styles.container}>
      <BackgroundImage uri={homeBgUri}>
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {eventsListIsOpen && (
            <View
              style={{
                ...styles.tvView,
                backgroundColor: color700,
              }}
            >
              <View
                style={{
                  ...styles.page,
                  backgroundColor: color300,
                }}
              >
                {choosingChart && (
                  <ScrollView>
                    {chartList.map((item, i) => {
                      return (
                        <Pressable
                          key={item.title}
                          onPress={() => handlePressMenuItem(i)}
                        >
                          <MenuItem
                            style={{
                              ...styles.menuItem,
                              borderColor: lightText,
                              backgroundColor: color700,
                            }}
                          >
                            <Text
                              style={{
                                ...styles.menuItemText,
                                color: lightText,
                                fontFamily: selectedFont,
                                textAlign: "center",
                              }}
                            >
                              {item.title}
                            </Text>
                          </MenuItem>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                )}
                {choosingOption && (
                  <ScrollView>
                    {optionsList.map((item, i) => {
                      return (
                        <Pressable
                          key={item.title}
                          onPress={() => handlePressOptionItem(i)}
                        >
                          <MenuItem
                            style={{
                              ...styles.menuItem,
                              borderColor: lightText,
                              backgroundColor: color700,
                            }}
                          >
                            <Text
                              style={{
                                ...styles.menuItemText,
                                color: lightText,
                                fontFamily: selectedFont,
                                textAlign: "center",
                              }}
                            >
                              {item.title}
                            </Text>
                          </MenuItem>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                )}
                {choosingContextEvent && (
                  <ScrollView>
                    {optionsList[2].events.map((item, i) => {
                      return (
                        <Pressable
                          key={item}
                          onPress={() => handlePressContextItem(item, i)}
                        >
                          <MenuItem
                            style={{
                              ...styles.menuItem,
                              borderColor: lightText,
                              backgroundColor: color700,
                            }}
                          >
                            <Text
                              style={{
                                ...styles.menuItemText,
                                color: lightText,
                                fontFamily: selectedFont,
                                textAlign: "center",
                              }}
                            >
                              {item}
                            </Text>
                          </MenuItem>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                )}
                {choosingScreen && (
                  <ScrollView>
                    {screensList.map((item, i) => {
                      return (
                        <Pressable
                          key={item.title}
                          onPress={() => handlePressScreenItem(i)}
                        >
                          <MenuItem
                            style={{
                              ...styles.menuItem,
                              borderColor: lightText,
                              backgroundColor: color700,
                            }}
                          >
                            <Text
                              style={{
                                ...styles.menuItemText,
                                color: lightText,
                                fontFamily: selectedFont,
                                textAlign: "center",
                              }}
                            >
                              {item.title}
                            </Text>
                          </MenuItem>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
            </View>
          )}
          {chartsAreOpen && (
            <View
              style={{
                ...styles.tvView,
                backgroundColor: color700,
              }}
            >
              <View
                style={{
                  ...styles.page,
                  backgroundColor: color300,
                }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    padding: 6,
                    color: darkText,
                    fontFamily: selectedFont,
                    fontSize: 32,
                  }}
                >
                  {chartTitle}
                </Text>
                <View style={styles.barChartContainer}>
                  <ScrollView horizontal={true}>
                    <BarChart
                      isAnimated={true}
                      data={eventsChartItems}
                      hideRules={false}
                      frontColor={color500}
                      sideColor={color700}
                      topColor={color300}
                      isThreeD={true}
                      labelWidth={80}
                      rotateLabel={false}
                      barWidth={40}
                      sideWidth={15}
                      side={"right"}
                      spacing={100}
                    />
                  </ScrollView>
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              ...styles.tvControlsView,
              backgroundColor: color700,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.tvControls}>
              <Pressable
                onPressIn={handlePressInMenu}
                onPressOut={handlePressOutMenu}
                onPress={handlePressMenu}
                style={{}}
              >
                {!eventsListIsOpen ? (
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
                onPressIn={handlePressInOpenCloseCharts}
                onPressOut={handlePressOutOpenCloseCharts}
                onPress={handlePressOpenCloseCharts}
                style={styles.openTvIcon}
              >
                {!chartsAreOpen ? (
                  <AntDesign
                    name="areachart"
                    size={64}
                    color={chartsAreOpenColor}
                  />
                ) : (
                  <AntDesign
                    name="linechart"
                    size={64}
                    color={chartsAreOpenColor}
                  />
                )}
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
  topView: {
    borderTopWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
  },
  tvView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
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
  barChartContainer: {
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    marginBottom: 10,
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
    height: "100%",
    padding: 6,
  },
  tvControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  tvControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  openTvIcon: {
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
    // width: "90%",
    padding: 6,
    // borderRadius: 12,
    // borderWidth: 4,
    // borderColor: "#FFFFFF",
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
  playlistSectionButton: {
    padding: 6,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 4,
  },
  playlistSectionText: {
    fontSize: 20,
    textAlign: "center",
  },
});
