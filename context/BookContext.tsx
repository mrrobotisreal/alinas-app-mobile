import { ReactNode, createContext, useEffect, useState } from "react";
import { serverURL } from "../constants/urls";
import axios from "axios";

export type BookStateContext = {
  currentBook: string;
  changeBook: (selectedBook: string) => void;
};
export type BookContextProps = {
  children?: ReactNode;
};

const initialState: BookStateContext = {
  currentBook: "My External Cause",
  changeBook: (selectedBook: string) => void 0,
};

export const BookContext = createContext(initialState);

export const BookContextProvider = ({ children }: BookContextProps) => {
  const [currentBook, setCurrentBook] = useState<string>("My External Cause");

  const changeBook = (selectedBook: string) => {
    // saveBookSelection(selectedBook);
    setCurrentBook(selectedBook);
  };

  const getSavedBook = async () => {
    axios
      .get(`${serverURL}/getBook`)
      .then(({ data }) => {
        console.log("incoming lang:", data);
        // setCurrentLang(data);
        changeBook(data);
      })
      .catch((err) => console.error(err));
  };

  const saveBookSelection = async (id: string) => {
    axios
      .post(`${serverURL}/saveBookSelection`, {
        lang: id,
      })
      .then(({ data }) => {
        // getSavedLang();
      })
      .catch((err) => console.error(err));
  };

  // useEffect(() => {
  //   getSavedBook();
  // }, []);

  return (
    <BookContext.Provider
      value={{
        currentBook,
        changeBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
