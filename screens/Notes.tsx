import {
  View,
  StyleSheet,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  ScrollView,
  Modal,
  GestureResponderEvent,
} from "react-native";
import { FormattedMessage, useIntl } from "react-intl";
import { BarChart } from "react-native-gifted-charts";
import { BarChartItem } from "../types/types";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { NotesContext } from "../context/NotesContext";
import { PlatformContext } from "../context/PlatformContext";
import { wordCountRegex } from "../constants/regex";
import moment from "moment";
import { LocalContext } from "../context/LocalContext";
import { Image } from "expo-image";

const sectionItems = [
  {
    title: "General",
    id: "general",
    param: "general",
  },
  {
    title: "Introduction",
    id: "introduction",
    param: "introduction",
  },
  {
    title: "The Anatomy of Everything",
    id: "anatomy_of_everything",
    param: "anatomy",
  },
  {
    title: "My Love",
    id: "my_love",
    param: "love",
  },
  {
    title: "My Happiness",
    id: "my_happiness",
    param: "happiness",
  },
  {
    title: "My Strength",
    id: "my_strength",
    param: "strength",
  },
  {
    title: "My Inspiration and My Motivation",
    id: "my_inspiration_and_my_motivation",
    param: "inspiration",
  },
  {
    title: "My Peace",
    id: "my_peace",
    param: "peace",
  },
  {
    title: "My Home",
    id: "my_home",
    param: "home",
  },
  {
    title: "Where are they going?\nWhere are we going?",
    id: "where_are_they_going",
    param: "where",
  },
  {
    title: "I want EVERYTHING with you",
    id: "i_want_everything_with_you",
    param: "everything",
  },
  {
    title: "Особлива кінцівка, частина 1",
    id: "outro_part_1",
    param: "outro1",
  },
  {
    title: "Особлива кінцівка, частина 2",
    id: "outro_part_2",
    param: "outro2",
  },
];

export default function Notes({ navigation }: any) {
  const intl = useIntl();
  const generalLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.general",
  });
  const introLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.introduction",
  });
  const anatomyLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.anatomy_of_everything",
  });
  const loveLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.my_love",
  });
  const happinessLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.my_happiness",
  });
  const strengthLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.my_strength",
  });
  const inspirationLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.my_inspiration_and_my_motivation",
  });
  const peaceLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.my_peace",
  });
  const homeLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.my_home",
  });
  const whereLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.where_are_they_going",
  });
  const everythingLabel = intl.formatMessage({
    id: "listen.infoBookmarkMenu.i_want_everything_with_you",
  });
  const outro1Label = intl.formatMessage({
    id: "listen.infoBookmarkMenu.outro_part_1",
  });
  const outro2Label = intl.formatMessage({
    id: "listen.infoBookmarkMenu.outro_part_2",
  });
  const { color300, color500, color700, lightText, darkText, notesBgUri } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { currentLang } = useContext(LocalContext);
  const { notes, allNotesList, getNotes, saveNote } = useContext(NotesContext);
  const [generalNotesIsOpen, setGeneralNotesIsOpen] = useState<boolean>(false);
  const [introductionNotesIsOpen, setIntroductionNotesIsOpen] =
    useState<boolean>(false);
  const [anatomyNotesIsOpen, setAnatomyNotesIsOpen] = useState<boolean>(false);
  const [loveNotesIsOpen, setLoveNotesIsOpen] = useState<boolean>(false);
  const [happinessNotesIsOpen, setHappinessNotesIsOpen] =
    useState<boolean>(false);
  const [strengthNotesIsOpen, setStrengthNotesIsOpen] =
    useState<boolean>(false);
  const [inspirationNotesIsOpen, setInspirationNotesIsOpen] =
    useState<boolean>(false);
  const [peaceNotesIsOpen, setPeaceNotesIsOpen] = useState<boolean>(false);
  const [homeNotesIsOpen, setHomeNotesIsOpen] = useState<boolean>(false);
  const [whereNotesIsOpen, setWhereNotesIsOpen] = useState<boolean>(false);
  const [everythingNotesIsOpen, setEverythingNotesIsOpen] =
    useState<boolean>(false);
  const [outro1NotesIsOpen, setOutro1NotesIsOpen] = useState<boolean>(false);
  const [outro2NotesIsOpen, setOutro2NotesIsOpen] = useState<boolean>(false);
  const [totalNotesChartItems, setTotalNotesChartItems] = useState<
    BarChartItem[]
  >([]);
  const [generalChartItems, setGeneralChartItems] = useState<BarChartItem[]>(
    []
  );
  const [introChartItems, setIntroChartItems] = useState<BarChartItem[]>([]);
  const [anatomyChartItems, setAnatomyChartItems] = useState<BarChartItem[]>(
    []
  );
  const [loveChartItems, setLoveChartItems] = useState<BarChartItem[]>([]);
  const [happinessChartItems, setHappinessChartItems] = useState<
    BarChartItem[]
  >([]);
  const [strengthChartItems, setStrengthChartItems] = useState<BarChartItem[]>(
    []
  );
  const [inspirationChartItems, setInspirationChartItems] = useState<
    BarChartItem[]
  >([]);
  const [peaceChartItems, setPeaceChartItems] = useState<BarChartItem[]>([]);
  const [homeChartItems, setHomeChartItems] = useState<BarChartItem[]>([]);
  const [whereChartItems, setWhereChartItems] = useState<BarChartItem[]>([]);
  const [everythingChartItems, setEverythingChartItems] = useState<
    BarChartItem[]
  >([]);
  const [outro1ChartItems, setOutro1ChartItems] = useState<BarChartItem[]>([]);
  const [outro2ChartItems, setOutro2ChartItems] = useState<BarChartItem[]>([]);
  const [statsIsOpen, setStatsIsOpen] = useState<boolean>(false);
  const [statsIconColor, setStatsIconColor] = useState<string>("#FFFFFF");
  const [notebookIsOpen, setNotebookIsOpen] = useState<boolean>(false);
  const [readNoteIsOpen, setReadNoteIsOpen] = useState<boolean>(false);
  const [readNoteSubject, setReadNoteSubject] = useState<string>("");
  const [readNoteCreationDate, setReadNoteCreationDate] = useState<number>(
    Date.now()
  );
  const [readNoteText, setReadNoteText] = useState<string>("");
  const [generalIsOpen, setGeneralIsOpen] = useState<boolean>(false);
  const [introIsOpen, setIntroIsOpen] = useState<boolean>(false);
  const [anatomyIsOpen, setAnatomyIsOpen] = useState<boolean>(false);
  const [loveIsOpen, setLoveIsOpen] = useState<boolean>(false);
  const [happyIsOpen, setHappyIsOpen] = useState<boolean>(false);
  const [strengthIsOpen, setStrengthIsOpen] = useState<boolean>(false);
  const [inspireIsOpen, setInspireIsOpen] = useState<boolean>(false);
  const [peaceIsOpen, setPeaceIsOpen] = useState<boolean>(false);
  const [homeIsOpen, setHomeIsOpen] = useState<boolean>(false);
  const [whereIsOpen, setWhereIsOpen] = useState<boolean>(false);
  const [everythingIsOpen, setEverythingIsOpen] = useState<boolean>(false);
  const [outro1IsOpen, setOutro1IsOpen] = useState<boolean>(false);
  const [outro2IsOpen, setOutro2IsOpen] = useState<boolean>(false);
  const [openCloseNotebokIconColor, setOpenCloseNotebookIconColor] =
    useState<string>("#FFFFFF");
  const [addNoteIsOpen, setAddNoteIsOpen] = useState<boolean>(false);
  const [addNoteIconColor, setAddNoteIconColor] = useState<string>("#FFFFFF");
  const [saveNoteColor, setSaveNoteColor] = useState<string>(darkText);
  const [selectedSection, setSelectedSection] = useState<string>("General");
  const [sectionParam, setSectionParam] = useState<string>("general");
  const [selectedSectionId, setSelectedSectionId] =
    useState<string>("read.selectSection");
  const [selectSectionIsVisible, setSelectSectionIsVisible] =
    useState<boolean>(false);
  const [selectSectionColor, setSelectSectionColor] =
    useState<string>(color700);
  const subjectPlaceholder = intl.formatMessage({
    id: "notes.subject.placeholder",
  });
  const [subjectText, setSubjectText] = useState<string>("");
  const noteTextPlaceholder = intl.formatMessage({
    id: "notes.noteText.placeholder",
  });
  const [noteText, setNoteText] = useState<string>("");
  const toastDropdownText = intl.formatMessage({ id: "toast.dropdown" });
  const toastSubjectText = intl.formatMessage({ id: "toast.subject" });
  const toastNoteTextText = intl.formatMessage({ id: "toast.noteText" });

  /**
   * Functions
   */
  const handlePressInStats = () => setStatsIconColor(color300);
  const handlePressOutStats = () => setStatsIconColor("#FFFFFF");
  const handlePressStats = () => {
    setStatsIsOpen(!statsIsOpen);
    setNotebookIsOpen(false);
    setAddNoteIsOpen(false);
    closeSectionNotes();
    setGeneralNotesIsOpen(false);
    setIntroductionNotesIsOpen(false);
    setAnatomyNotesIsOpen(false);
    setLoveNotesIsOpen(false);
    setHappinessNotesIsOpen(false);
    setStrengthNotesIsOpen(false);
    setInspirationNotesIsOpen(false);
    setPeaceNotesIsOpen(false);
    setHomeNotesIsOpen(false);
    setWhereNotesIsOpen(false);
    setEverythingNotesIsOpen(false);
    setOutro1NotesIsOpen(false);
    setOutro2NotesIsOpen(false);
  };

  const handlePressInOpenCloseNotebook = () =>
    setOpenCloseNotebookIconColor(color300);
  const handlePressOutOpenCloseNotebook = () =>
    setOpenCloseNotebookIconColor("#FFFFFF");
  const handlePressOpenCloseNotebook = () => {
    setNotebookIsOpen(!notebookIsOpen);
    setStatsIsOpen(false);
    setAddNoteIsOpen(false);
    closeSectionNotes();
    setGeneralNotesIsOpen(false);
    setIntroductionNotesIsOpen(false);
    setAnatomyNotesIsOpen(false);
    setLoveNotesIsOpen(false);
    setHappinessNotesIsOpen(false);
    setStrengthNotesIsOpen(false);
    setInspirationNotesIsOpen(false);
    setPeaceNotesIsOpen(false);
    setHomeNotesIsOpen(false);
    setWhereNotesIsOpen(false);
    setEverythingNotesIsOpen(false);
    setOutro1NotesIsOpen(false);
    setOutro2NotesIsOpen(false);
  };

  const handlePressInAddNote = () => setAddNoteIconColor(color300);
  const handlePressOutAddNote = () => setAddNoteIconColor("#FFFFFF");
  const handlePressAddNote = () => {
    setAddNoteIsOpen(!addNoteIsOpen);
    setNotebookIsOpen(false);
    setStatsIsOpen(false);
    closeSectionNotes();
    setGeneralNotesIsOpen(false);
    setIntroductionNotesIsOpen(false);
    setAnatomyNotesIsOpen(false);
    setLoveNotesIsOpen(false);
    setHappinessNotesIsOpen(false);
    setStrengthNotesIsOpen(false);
    setInspirationNotesIsOpen(false);
    setPeaceNotesIsOpen(false);
    setHomeNotesIsOpen(false);
    setWhereNotesIsOpen(false);
    setEverythingNotesIsOpen(false);
    setOutro1NotesIsOpen(false);
    setOutro2NotesIsOpen(false);
  };
  const handlePressInSelectSection = () => setSelectSectionColor(color500);
  const handlePressOutSelectSection = () => setSelectSectionColor(color700);
  const handlePressSelectSection = () => {
    setSelectSectionIsVisible(true);
  };
  const handleSelectSection = (title: string, id: string, param: string) => {
    setSelectedSection(title);
    setSectionParam(param);
    setSelectSectionIsVisible(false);
    setSelectedSectionId(`listen.infoBookmarkMenu.${id}`);
  };
  const handlePressInSaveNote = () => setSaveNoteColor(color500);
  const handlePressOutSaveNote = () => setSaveNoteColor(color700);
  const handlePressSaveNote = async () => {
    // create hook to call server with axios
    // on success or failure, show toast
    if (!selectedSection) {
      ToastAndroid.show(toastDropdownText, ToastAndroid.SHORT);
      return;
    } else if (!subjectText || subjectText === "") {
      ToastAndroid.show(toastSubjectText, ToastAndroid.SHORT);
      return;
    } else if (!noteText || noteText === "") {
      ToastAndroid.show(toastNoteTextText, ToastAndroid.SHORT);
      return;
    }
    const newNote = {
      section: sectionParam,
      subject: subjectText,
      note: noteText,
      creationDate: Date.now(),
    };
    saveNote(newNote);
    setSubjectText("");
    setNoteText("");
    setSelectedSection("General");
    setSectionParam("general");
    setSelectedSectionId("read.selectSection");
    Keyboard.dismiss();
  };

  const handleReadNote = (
    subject: string,
    note: string,
    creationDate: number
  ) => {
    setReadNoteSubject(subject);
    setReadNoteCreationDate(creationDate);
    setReadNoteText(note);
    setReadNoteIsOpen(true);
  };

  const handleCloseReadNote = () => {
    setReadNoteSubject("");
    setReadNoteCreationDate(Date.now());
    setReadNoteText("");
    setReadNoteIsOpen(false);
  };

  const handleViewSectionNotes = (title: string) => {
    switch (title) {
      case "General":
        setGeneralIsOpen(true);
        break;
      case "Introduction":
        setIntroIsOpen(true);
        break;
      case "The Anatomy of Everything":
        setAnatomyIsOpen(true);
        break;
      case "My Love":
        setLoveIsOpen(true);
        break;
      case "My Happiness":
        setHappyIsOpen(true);
        break;
      case "My Strength":
        setStrengthIsOpen(true);
        break;
      case "My Inspiration and My Motivation":
        setInspireIsOpen(true);
        break;
      case "My Peace":
        setPeaceIsOpen(true);
        break;
      case "My Home":
        setHomeIsOpen(true);
        break;
      case "Where are they going?\nWhere are WE going?":
        setWhereIsOpen(true);
        break;
      case "I want EVERYTHING with you":
        setEverythingIsOpen(true);
        break;
      case "Особлива кінцівка, частина 1":
        setOutro1IsOpen(true);
        break;
      case "Особлива кінцівка, частина 2":
        setOutro2IsOpen(true);
        break;
      default:
        return;
    }
  };
  const closeSectionNotes = () => {
    setGeneralIsOpen(false);
    setIntroIsOpen(false);
    setAnatomyIsOpen(false);
    setLoveIsOpen(false);
    setHappyIsOpen(false);
    setStrengthIsOpen(false);
    setInspireIsOpen(false);
    setPeaceIsOpen(false);
    setHomeIsOpen(false);
    setWhereIsOpen(false);
    setEverythingIsOpen(false);
    setOutro1IsOpen(false);
    setOutro2IsOpen(false);
  };

  /**
   * Effects
   */
  useEffect(() => {
    const allNotesChartItems: BarChartItem[] = [];
    const generalItems: BarChartItem[] = [];
    const introItems: BarChartItem[] = [];
    const anatomyItems: BarChartItem[] = [];
    const loveItems: BarChartItem[] = [];
    const happinessItems: BarChartItem[] = [];
    const strengthItems: BarChartItem[] = [];
    const inspirationItems: BarChartItem[] = [];
    const peaceItems: BarChartItem[] = [];
    const homeItems: BarChartItem[] = [];
    const whereItems: BarChartItem[] = [];
    const everythingItems: BarChartItem[] = [];
    const outro1Items: BarChartItem[] = [];
    const outro2Items: BarChartItem[] = [];
    allNotesList.forEach((NotesSection) => {
      switch (NotesSection.section) {
        case "general":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: generalLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              console.log("generalNotesIsOpen:", generalNotesIsOpen);
              if (generalNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(true);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            generalItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setGeneralChartItems(generalItems);
          break;
        case "introduction":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: introLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (introductionNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(true);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            introItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setIntroChartItems(introItems);
          break;
        case "anatomy":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: anatomyLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (anatomyNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(true);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            anatomyItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setAnatomyChartItems(anatomyItems);
          break;
        case "love":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: loveLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (loveNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(true);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            loveItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setLoveChartItems(loveItems);
          break;
        case "happiness":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: happinessLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (happinessNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(true);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            happinessItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setHappinessChartItems(happinessItems);
          break;
        case "strength":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: strengthLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (strengthNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(true);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            strengthItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setStrengthChartItems(strengthItems);
          break;
        case "inspiration":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: inspirationLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (inspirationNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(true);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            inspirationItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setInspirationChartItems(inspirationItems);
          break;
        case "peace":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: peaceLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (peaceNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(true);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            peaceItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setPeaceChartItems(peaceItems);
          break;
        case "home":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: homeLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (homeNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(true);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            homeItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setHomeChartItems(homeItems);
          break;
        case "where":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: whereLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (whereNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(true);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            whereItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setWhereChartItems(whereItems);
          break;
        case "everything":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: everythingLabel,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (everythingNotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(true);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            everythingItems.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setEverythingChartItems(everythingItems);
          break;
        case "outro1":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: outro1Label,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (outro1NotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(true);
                setOutro2NotesIsOpen(false);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            outro1Items.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setOutro1ChartItems(outro1Items);
          break;
        case "outro2":
          allNotesChartItems.push({
            value: NotesSection.notes.length,
            label: outro2Label,
            labelTextStyle: {
              fontFamily: selectedFont,
              color: darkText,
            },
            onPress: () => {
              if (outro2NotesIsOpen) {
                return;
              } else {
                setGeneralNotesIsOpen(false);
                setIntroductionNotesIsOpen(false);
                setAnatomyNotesIsOpen(false);
                setLoveNotesIsOpen(false);
                setHappinessNotesIsOpen(false);
                setStrengthNotesIsOpen(false);
                setInspirationNotesIsOpen(false);
                setPeaceNotesIsOpen(false);
                setHomeNotesIsOpen(false);
                setWhereNotesIsOpen(false);
                setEverythingNotesIsOpen(false);
                setOutro1NotesIsOpen(false);
                setOutro2NotesIsOpen(true);
              }
            },
          });
          NotesSection.notes.forEach((note) => {
            outro2Items.push({
              value: note.note.match(wordCountRegex)
                ? note.note.match(wordCountRegex).length
                : 0,
              label: note.subject,
              labelTextStyle: {
                fontFamily: selectedFont,
                color: darkText,
              },
              onPress: () =>
                handleReadNote(note.subject, note.note, note.creationDate),
            });
          });
          setOutro2ChartItems(outro2Items);
          break;
      }
    });
    setTotalNotesChartItems(allNotesChartItems);
  }, [allNotesList]);

  /**
   * Components
   */
  const SectionItem = ({
    title,
    id,
    onPress,
  }: {
    title: string;
    id: string;
    onPress: (title: GestureResponderEvent) => void;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={{
          ...styles.notesSectionButton,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.notesSectionText,
            color: lightText,
            fontFamily: selectedHeavyFont,
          }}
        >
          <FormattedMessage
            id={`listen.infoBookmarkMenu.${id}`}
            defaultMessage={title}
          />
        </Text>
      </Pressable>
    );
  };

  const NoteItem = ({
    subject,
    onPress,
  }: {
    subject: string;
    onPress: (e: GestureResponderEvent) => void;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={{
          ...styles.notesSectionButton,
          backgroundColor: color700,
        }}
      >
        <Text
          style={{
            ...styles.notesSectionText,
            color: lightText,
            fontFamily: selectedFont,
          }}
        >
          {subject}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: notesBgUri,
        }}
        contentFit="cover"
        transition={100}
        style={styles.imageBackground}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {statsIsOpen && (
            <View
              style={{
                ...styles.notebookView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  ...styles.notesTitle,
                  color: lightText,
                  fontFamily: selectedHeavyFont,
                }}
              >
                <FormattedMessage
                  id="notes.title.stats"
                  defaultMessage="Stats"
                />
              </Text>
              <View
                style={{
                  ...styles.notesContainer,
                  backgroundColor: color300,
                }}
              >
                <ScrollView nestedScrollEnabled={true}>
                  <View
                    style={{
                      ...styles.chartTitleContainer,
                      backgroundColor: color700,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.chartTitle,
                        color: lightText,
                        fontFamily: selectedHeavyFont,
                      }}
                    >
                      <FormattedMessage
                        id="notes.stats.dailyNotesCountOfTheWeek"
                        defaultMessage="Notes written this week"
                      />
                    </Text>
                  </View>
                  <View style={styles.barChartContainer}>
                    <ScrollView horizontal={true}>
                      <BarChart
                        isAnimated={true}
                        data={totalNotesChartItems}
                        hideRules={true}
                        frontColor={color500}
                        sideColor={color700}
                        topColor={color300}
                        isThreeD={true}
                        barWidth={40}
                        sideWidth={15}
                        side={"right"}
                        spacing={60}
                      />
                    </ScrollView>
                  </View>
                  {generalNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.general"
                            defaultMessage="General notes"
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={generalChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.general.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {introductionNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.introduction"
                            defaultMessage={"Introduction notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={introChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.introduction.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {anatomyNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.anatomy"
                            defaultMessage={"Anatomy of Everything notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={anatomyChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.anatomy.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {loveNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.love"
                            defaultMessage={"My Love notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={loveChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.love.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {happinessNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.happiness"
                            defaultMessage={"My Happiness notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={peaceChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.happiness.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {strengthNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.strength"
                            defaultMessage={"My Strength notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={strengthChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.strength.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {inspirationNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.inspiration"
                            defaultMessage={
                              "My Inspiration\nand\nMy Motivation\nnotes"
                            }
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={inspirationChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.inspiration.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {peaceNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.peace"
                            defaultMessage={"My Peace notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={peaceChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.peace.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {homeNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.home"
                            defaultMessage={"My Home notes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={homeChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.home.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {whereNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.where"
                            defaultMessage={
                              "Where are they going?\nWhere are WE going?\nnotes"
                            }
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={whereChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.where.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {everythingNotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.everything"
                            defaultMessage={"I want EVERYTHING with you\nnotes"}
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={everythingChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.everything.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {outro1NotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.outro1"
                            defaultMessage={
                              "Особлива кінцівка, частина 1 notes"
                            }
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={outro1ChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.outro1.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {outro2NotesIsOpen && (
                    <>
                      <View
                        style={{
                          ...styles.chartTitleContainer,
                          backgroundColor: color700,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.chartTitle,
                            color: lightText,
                            backgroundColor: color700,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.outro2"
                            defaultMessage={
                              "Особлива кінцівка, частина 2 notes"
                            }
                          />
                        </Text>
                        <Text
                          style={{
                            ...styles.wordCount,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id="notes.stats.wordCount"
                            defaultMessage={"Word count"}
                          />
                        </Text>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView horizontal={true}>
                          <BarChart
                            isAnimated={true}
                            hideRules={true}
                            frontColor={color500}
                            sideColor={color700}
                            topColor={color300}
                            isThreeD={true}
                            barWidth={40}
                            sideWidth={15}
                            side={"right"}
                            data={outro2ChartItems}
                            spacing={70}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.barChartContainer}>
                        <ScrollView>
                          {notes.outro2.map((note, i) => {
                            return (
                              <NoteItem
                                key={note.creationDate + `_${i}`}
                                subject={note.subject}
                                onPress={() =>
                                  handleReadNote(
                                    note.subject,
                                    note.note,
                                    note.creationDate
                                  )
                                }
                              />
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                </ScrollView>
              </View>
            </View>
          )}
          {notebookIsOpen && (
            <View
              style={{
                ...styles.notebookView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  ...styles.notesTitle,
                  color: lightText,
                  fontFamily: selectedHeavyFont,
                }}
              >
                <FormattedMessage
                  id="notes.title.notebook"
                  defaultMessage="Notebook"
                />
              </Text>
              <View
                style={{
                  ...styles.notesContainer,
                  backgroundColor: color300,
                }}
              >
                {!generalIsOpen &&
                  !introIsOpen &&
                  !anatomyIsOpen &&
                  !loveIsOpen &&
                  !happyIsOpen &&
                  !strengthIsOpen &&
                  !inspireIsOpen &&
                  !peaceIsOpen &&
                  !homeIsOpen &&
                  !whereIsOpen &&
                  !everythingIsOpen &&
                  !outro1IsOpen &&
                  !outro2IsOpen && (
                    <ScrollView>
                      {sectionItems.map((item) => {
                        return (
                          <SectionItem
                            key={item.id}
                            title={item.title}
                            id={item.id}
                            onPress={() => handleViewSectionNotes(item.title)}
                          />
                        );
                      })}
                    </ScrollView>
                  )}
                {generalIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.general"
                          defaultMessage={"General"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.general.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {introIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.introduction"
                          defaultMessage={"Introduction"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.introduction.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {anatomyIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.anatomy_of_everything"
                          defaultMessage={"The Anatomy of Everything"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.anatomy.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {loveIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.my_love"
                          defaultMessage={"My Love"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.love.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {happyIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.my_happiness"
                          defaultMessage={"My Happiness"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.happiness.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {strengthIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.my_strength"
                          defaultMessage={"My Strength"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.strength.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {inspireIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.my_inspiration_and_my_motivation"
                          defaultMessage={"My Inspiration and My Motivation"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.inspiration.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {peaceIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.my_peace"
                          defaultMessage={"My Peace"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.peace.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {homeIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.my_home"
                          defaultMessage={"My Home"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.home.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {whereIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.where_are_they_going"
                          defaultMessage={
                            "Where are they going?\nWhere are WE going?"
                          }
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.where.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {everythingIsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.i_want_everything_with_you"
                          defaultMessage={"I want EVERYTHING with you"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.everything.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {outro1IsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.outro_part_1"
                          defaultMessage={"Особлива кінцівка, частина 1"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.outro1.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
                {outro2IsOpen && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="listen.inforBookmarkMenu.outro_part_2"
                          defaultMessage={"Особлива кінцівка, частина 2"}
                        />
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.notesSectionContainer,
                        backgroundColor: color500,
                      }}
                    >
                      <ScrollView>
                        {notes.outro2.map((note, i) => {
                          return (
                            <NoteItem
                              key={note.creationDate + `${i}`}
                              subject={note.subject}
                              onPress={() =>
                                handleReadNote(
                                  note.subject,
                                  note.note,
                                  note.creationDate
                                )
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                    <Pressable
                      onPress={closeSectionNotes}
                      style={{
                        ...styles.notesSectionButton,
                        backgroundColor: color700,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.notesSectionText,
                          color: lightText,
                          fontFamily: selectedHeavyFont,
                        }}
                      >
                        <FormattedMessage
                          id="notes.close"
                          defaultMessage={"Close"}
                        />
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          )}
          {addNoteIsOpen && (
            <View
              style={{
                ...styles.notebookView,
                backgroundColor: color700,
              }}
            >
              <View
                style={{
                  ...styles.page,
                  backgroundColor: color300,
                  height: "80%",
                  paddingTop: 10,
                }}
              >
                <Text
                  style={{
                    ...styles.menuItemText,
                    fontFamily: selectedHeavyFont,
                    textDecorationLine: "underline",
                    textAlign: "left",
                    fontSize: 22,
                    color: darkText,
                  }}
                >
                  <FormattedMessage
                    id="read.selectSection"
                    defaultMessage="Select a section"
                  />
                </Text>
                <Pressable
                  onPressIn={handlePressInSelectSection}
                  onPressOut={handlePressOutSelectSection}
                  onPress={handlePressSelectSection}
                  style={{
                    ...styles.menuItem,
                    backgroundColor: selectSectionColor,
                    width: "100%",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.menuItemText,
                      color: lightText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    <FormattedMessage
                      id={selectedSectionId}
                      defaultMessage={selectedSection}
                    />
                  </Text>
                </Pressable>
                <ScrollView>
                  <View>
                    <Text
                      style={{
                        ...styles.menuItemText,
                        color: darkText,
                        fontFamily: selectedHeavyFont,
                        textAlign: "left",
                        textDecorationLine: "underline",
                        paddingTop: 5,
                        fontSize: 22,
                      }}
                    >
                      <FormattedMessage
                        id="notes.write.subject.title"
                        defaultMessage="Subject"
                      />
                    </Text>
                    <TextInput
                      spellCheck={currentLang === "en" ? true : false}
                      placeholder={subjectPlaceholder}
                      style={{
                        ...styles.menuItemText,
                        color: darkText,
                        backgroundColor: "#FFFFFF",
                        fontFamily: selectedFont,
                        padding: 6,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: color700,
                        fontSize: 18,
                      }}
                      onChangeText={setSubjectText}
                      value={subjectText}
                      multiline={false}
                    />
                    <Text
                      style={{
                        ...styles.menuItemText,
                        color: darkText,
                        fontFamily: selectedHeavyFont,
                        textAlign: "left",
                        textDecorationLine: "underline",
                        paddingTop: 5,
                        fontSize: 22,
                      }}
                    >
                      <FormattedMessage
                        id="notes.write.content.title"
                        defaultMessage="Content"
                      />
                    </Text>
                    <TextInput
                      spellCheck={currentLang === "en" ? true : false}
                      placeholder={noteTextPlaceholder}
                      style={{
                        ...styles.menuItemText,
                        color: darkText,
                        backgroundColor: "#FFFFFF",
                        fontFamily: selectedFont,
                        padding: 6,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: color700,
                        fontSize: 18,
                      }}
                      onChangeText={setNoteText}
                      value={noteText}
                      multiline={true}
                      numberOfLines={6}
                    />
                  </View>
                </ScrollView>
              </View>
              <Pressable
                onPressIn={handlePressInSaveNote}
                onPressOut={handlePressOutSaveNote}
                onPress={handlePressSaveNote}
                style={{
                  ...styles.menuItem,
                  backgroundColor: saveNoteColor,
                  alignItems: "center",
                  alignSelf: "center",
                  width: "50%",
                  marginBottom: 2,
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    ...styles.menuItemText,
                    color: lightText,
                    fontFamily: selectedHeavyFont,
                  }}
                >
                  <FormattedMessage
                    id="read.saveNote"
                    defaultMessage="Save note"
                  />
                </Text>
              </Pressable>
            </View>
          )}
          <View
            style={{
              ...styles.notesControlsView,
              backgroundColor: color700,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.notesControls}>
              <Pressable
                onPressIn={handlePressInStats}
                onPressOut={handlePressOutStats}
                onPress={handlePressStats}
              >
                {!statsIsOpen ? (
                  <AntDesign
                    name="linechart"
                    size={48}
                    color={statsIconColor}
                  />
                ) : (
                  <FontAwesome
                    name="line-chart"
                    size={48}
                    color={statsIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInOpenCloseNotebook}
                onPressOut={handlePressOutOpenCloseNotebook}
                onPress={handlePressOpenCloseNotebook}
              >
                {!notebookIsOpen ? (
                  <MaterialCommunityIcons
                    name="notebook-multiple"
                    size={64}
                    color={openCloseNotebokIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={64}
                    color={openCloseNotebokIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInAddNote}
                onPressOut={handlePressOutAddNote}
                onPress={handlePressAddNote}
              >
                {!addNoteIsOpen ? (
                  <MaterialCommunityIcons
                    name="notebook-plus"
                    size={48}
                    color={addNoteIconColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="pencil-box-multiple"
                    size={48}
                    color={addNoteIconColor}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={readNoteIsOpen}
        >
          <View style={styles.modal}>
            <View
              style={{
                ...styles.notebookView,
                backgroundColor: color700,
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "90%",
              }}
            >
              <View>
                <Text
                  style={{
                    ...styles.menuItemText,
                    fontFamily: selectedHeavyFont,
                    textDecorationLine: "underline",
                    textAlign: "center",
                    fontSize: 28,
                    color: lightText,
                  }}
                >
                  {readNoteSubject}
                </Text>
                <Text
                  style={{
                    ...styles.menuItemText,
                    fontFamily: selectedFont,
                    textAlign: "center",
                    fontSize: 20,
                    color: lightText,
                  }}
                >
                  {moment(readNoteCreationDate).format("YYYY-MM-DD")}
                  {"\n"}
                  {moment(readNoteCreationDate).fromNow()}
                </Text>
              </View>
              <View
                style={{
                  ...styles.page,
                  backgroundColor: color300,
                  height: "70%",
                  paddingTop: 10,
                }}
              >
                <ScrollView>
                  <Text
                    style={{
                      fontFamily: selectedFont,
                      color: darkText,
                      fontSize: 18,
                    }}
                  >
                    {readNoteText}
                  </Text>
                </ScrollView>
              </View>
              <Pressable
                onPress={handleCloseReadNote}
                style={{
                  ...styles.notesSectionButton,
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    ...styles.notesSectionText,
                    fontFamily: selectedHeavyFont,
                    color: lightText,
                  }}
                >
                  <FormattedMessage id="notes.close" defaultMessage={"Close"} />
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectSectionIsVisible}
        >
          <View
            style={{
              ...styles.notebookView,
              backgroundColor: color700,
            }}
          >
            <Text
              style={{
                ...styles.menuItemText,
                fontFamily: selectedHeavyFont,
                textDecorationLine: "underline",
                textAlign: "center",
                fontSize: 22,
                color: lightText,
              }}
            >
              <FormattedMessage
                id="read.selectSection"
                defaultMessage="Select a section"
              />
            </Text>
            <View
              style={{
                ...styles.page,
                backgroundColor: color300,
                height: "80%",
                paddingTop: 10,
              }}
            >
              <ScrollView>
                {sectionItems.map((item) => {
                  return (
                    <SectionItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      onPress={() =>
                        handleSelectSection(item.title, item.id, item.param)
                      }
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Image>
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
  topView: {
    borderTopWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
  },
  notebookView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  notesTitle: {
    fontSize: 32,
    textDecorationLine: "underline",
  },
  notesContainer: {
    width: "90%",
    height: "90%",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 10,
  },
  notesSectionContainer: {
    width: "90%",
    height: "80%",
    borderWidth: 4,
    borderRadius: 12,
    borderColor: "#FFFFFF",
  },
  notesSectionButton: {
    padding: 6,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 4,
  },
  notesSectionText: {
    fontSize: 20,
    textAlign: "center",
  },
  chartTitleContainer: {
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginVertical: 6,
  },
  chartTitle: {
    fontSize: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  wordCount: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
  },
  barChartContainer: {
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    marginBottom: 10,
  },
  noteButton: {
    borderRadius: 12,
    padding: 6,
    textAlign: "center",
    marginVertical: 4,
  },
  page: {
    width: "90%",
    height: "90%",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  notesControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  notesControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  menuItem: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 24,
  },
  modal: {
    backgroundColor: "rgba(40,40,40,0.8)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
