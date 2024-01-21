import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { emulatorURL, serverURL } from "../constants/urls";
import { ToastAndroid } from "react-native";
import { useIntl } from "react-intl";

export type Note = {
  section: string;
  subject: string;
  note: string;
  creationDate: number;
};

export type NotesSection = {
  section: string;
  notes: Note[];
};

export type Notes = {
  general: Note[];
  introduction: Note[];
  anatomy: Note[];
  love: Note[];
  happiness: Note[];
  strength: Note[];
  inspiration: Note[];
  peace: Note[];
  home: Note[];
  where: Note[];
  everything: Note[];
  outro1: Note[];
  outro2: Note[];
};

export type NotesState = {
  notes: Notes;
  allNotesList: NotesSection[];
  getNotes: () => void;
  saveNote: (note: Note) => void;
};

const initialState: NotesState = {
  notes: {
    general: [],
    introduction: [],
    anatomy: [],
    love: [],
    happiness: [],
    strength: [],
    inspiration: [],
    peace: [],
    home: [],
    where: [],
    everything: [],
    outro1: [],
    outro2: [],
  },
  allNotesList: [],
  getNotes: () => {},
  saveNote: (note: Note) => {},
};

export const NotesContext = createContext<NotesState>(initialState);

export function NotesContextProvider({ children }: { children: ReactNode }) {
  const intl = useIntl();
  const toastSaveNoteSuccess = intl.formatMessage({
    id: "toast.saveNoteSuccess",
  });
  const toastSaveNoteFailure = intl.formatMessage({
    id: "toast.saveNoteFailure",
  });
  const [notes, setNotes] = useState<Notes>(initialState.notes);
  const [allNotesList, setAllNotesList] = useState<NotesSection[]>([]);

  const getNotes = () => {
    axios
      .get(`${serverURL}/getAllNotes`)
      .then(({ data }) => {
        setNotes(data);
        const keys = Object.keys(data);
        const allNotes: NotesSection[] = [];
        keys.forEach((key) => {
          allNotes.push({
            section: key,
            notes: data[key],
          });
        });
        setAllNotesList(allNotes);
      })
      .catch((err) => console.error(err));
  };

  const saveNote = (note: Note) => {
    axios
      .post(`${serverURL}/saveNote`, note)
      .then(({ data }) => {
        if (data) {
          ToastAndroid.show(toastSaveNoteSuccess, ToastAndroid.SHORT);
          getNotes();
        } else {
          ToastAndroid.show(toastSaveNoteFailure, ToastAndroid.SHORT);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const values = {
    notes,
    allNotesList,
    getNotes,
    saveNote,
  };

  return (
    <NotesContext.Provider value={values}>{children}</NotesContext.Provider>
  );
}
