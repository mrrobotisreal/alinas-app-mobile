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
} from "../constants/books";
import axios from "axios";

export interface SectionItem {
  title: string;
  id: string;
}

export type BookStateContext = {
  currentBook: string;
  changeBook: (selectedBook: string) => void;
  sectionItems: SectionItem[];
  pageSVRef?: MutableRefObject<ScrollView | undefined>;
};
export type BookContextProps = {
  children?: ReactNode;
};

const initialState: BookStateContext = {
  currentBook: "My External Cause",
  changeBook: (selectedBook: string) => void 0,
  sectionItems: myExternalCauseSectionItems,
};

export const BookContext = createContext(initialState);

export const BookContextProvider = ({ children }: BookContextProps) => {
  const pageSVRef = useRef<ScrollView | undefined>();
  const [currentBook, setCurrentBook] = useState<string>("My External Cause");
  const [sectionItems, setSectionItems] = useState<SectionItem[]>(
    myExternalCauseSectionItems
  );

  const changeBook = (selectedBook: string) => {
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
