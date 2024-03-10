import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import { ScrollView } from "react-native";
import { serverURL } from "../constants/urls";
import {
  myExternalCauseSectionItems,
  theJudgeSectionItems,
  theDreamyManSectionItems,
} from "../constants/books";
import axios from "axios";
import useCaptureEvent, { EventObject } from "../hooks/useCaptureEvent";
import { getCalendars } from "expo-localization";

export interface SectionItem {
  title: string;
  id: string;
}

export type BookStateContext = {
  currentBook: string;
  changeBook: (
    selectedBook: string,
    selectedLanguage: string,
    selectedTheme: string,
    selectedFont: string
  ) => void;
  sectionItems: SectionItem[];
  pageSVRef?: MutableRefObject<ScrollView | undefined>;
};
export type BookContextProps = {
  children?: ReactNode;
};

const initialState: BookStateContext = {
  currentBook: "My External Cause",
  changeBook: (
    selectedBook: string,
    selectedLanguage: string,
    selectedTheme: string,
    selectedFont: string
  ) => void 0,
  sectionItems: myExternalCauseSectionItems,
};

export const BookContext = createContext(initialState);

export const BookContextProvider = ({ children }: BookContextProps) => {
  const pageSVRef = useRef<ScrollView | undefined>();
  const { captureEvent } = useCaptureEvent();
  const { timeZone } = getCalendars()[0];
  const [currentBook, setCurrentBook] = useState<string>("My External Cause");
  const [sectionItems, setSectionItems] = useState<SectionItem[]>(
    myExternalCauseSectionItems
  );

  const changeBook = (
    selectedBook: string,
    selectedLanguage: string,
    selectedTheme: string,
    selectedFont: string
  ) => {
    const date = new Date();
    const newEvent: EventObject = {
      name: "Press button",
      location: "Home",
      context: "Select book",
      detail: selectedBook,
      description: `Book "${selectedBook}" selected`,
      timestamp: date.getTime(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      timeZone: timeZone || "UTC",
      constants: {
        selectedBook,
        selectedLanguage,
        selectedTheme,
        selectedFont,
      },
    };
    captureEvent(newEvent);
    saveBookSelection(selectedBook);
    setCurrentBook(selectedBook);
  };

  const getSavedBook = async () => {
    axios
      .get(`${serverURL}/getBook`)
      .then(({ data }) => {
        console.log("incoming book:", data);
        setCurrentBook(data);
      })
      .catch((err) => console.error(err));
  };

  const saveBookSelection = async (id: string) => {
    console.log("saving book selection:", id);
    axios
      .post(`${serverURL}/saveBookSelection`, {
        book: id,
      })
      .then(({ data }) => {
        console.log("book selection saved:", data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSavedBook();
  }, []);

  useEffect(() => {
    switch (currentBook) {
      case "My External Cause":
        setSectionItems(myExternalCauseSectionItems);
        break;
      case "The Judge":
        setSectionItems(theJudgeSectionItems);
        break;
      case "The Dreamy Man":
        setSectionItems(theDreamyManSectionItems);
        break;
      // default:
      //   setSectionItems(myExternalCauseSectionItems);
    }
  }, [currentBook]);

  return (
    <BookContext.Provider
      value={{
        currentBook,
        changeBook,
        sectionItems,
        pageSVRef,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
