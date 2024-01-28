import { ReactNode } from "react";
import { FontContextProvider } from "./context/FontContext";
import { LocalContextProvider } from "./context/LocalContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { NotesContextProvider } from "./context/NotesContext";
import { PlatformContextProvider } from "./context/PlatformContext";
import { BookContextProvider } from "./context/BookContext";

export default function WrapperContext({ children }: { children: ReactNode }) {
  return (
    <PlatformContextProvider>
      <LocalContextProvider>
        <BookContextProvider>
          <ThemeContextProvider>
            <FontContextProvider>
              <NotesContextProvider>{children}</NotesContextProvider>
            </FontContextProvider>
          </ThemeContextProvider>
        </BookContextProvider>
      </LocalContextProvider>
    </PlatformContextProvider>
  );
}
