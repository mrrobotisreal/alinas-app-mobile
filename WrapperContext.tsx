import { ReactNode } from "react";
import { FontContextProvider } from "./context/FontContext";
import { LocalContextProvider } from "./context/LocalContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { NotesContextProvider } from "./context/NotesContext";

export default function WrapperContext({ children }: { children: ReactNode }) {
  return (
    <LocalContextProvider>
      <ThemeContextProvider>
        <FontContextProvider>
          <NotesContextProvider>{children}</NotesContextProvider>
        </FontContextProvider>
      </ThemeContextProvider>
    </LocalContextProvider>
  );
}
