import { ReactNode } from "react";
import { FontContextProvider } from "./context/FontContext";
import { LocalContextProvider } from "./context/LocalContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { NotesContextProvider } from "./context/NotesContext";
import { PlatformContextProvider } from "./context/PlatformContext";
import { GoogleContextProvider } from "./context/GoogleContext";

export default function WrapperContext({ children }: { children: ReactNode }) {
  return (
    <PlatformContextProvider>
      <GoogleContextProvider>
        <LocalContextProvider>
          <ThemeContextProvider>
            <FontContextProvider>
              <NotesContextProvider>{children}</NotesContextProvider>
            </FontContextProvider>
          </ThemeContextProvider>
        </LocalContextProvider>
      </GoogleContextProvider>
    </PlatformContextProvider>
  );
}
