import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../constants/urls";

export type FontState = {
  selectedFont: string;
  selectedHeavyFont: string;
  changeFont: (id: string) => void;
};

const initialState: FontState = {
  selectedFont: "NSL",
  selectedHeavyFont: "NSH",
  changeFont: (id: string) => {},
};

export const FontContext = createContext<FontState>(initialState);

export function FontContextProvider({ children }: { children: ReactNode }) {
  const [currentFont, setCurrentFont] = useState<string>("nexa");
  const [selectedFont, setSelectedFont] = useState<string>("NSL");
  const [selectedHeavyFont, setSelectedHeavyFont] = useState<string>("NSH");

  const changeFont = (id: string) => {
    saveFontSelection(id);
    switch (id) {
      case "nexa":
        setCurrentFont("nexa");
        setSelectedFont("NSL");
        setSelectedHeavyFont("NSH");
        break;
      case "angelina":
        setCurrentFont("angelina");
        setSelectedFont("ANGREG");
        setSelectedHeavyFont("ANGREG");
        break;
      case "ananias":
        setCurrentFont("anania");
        setSelectedFont("ANAREG");
        setSelectedHeavyFont("ANABOLD");
        break;
      case "bauhaus_light":
        setCurrentFont("bauhaus_light");
        setSelectedFont("BHL");
        setSelectedHeavyFont("BHH");
        break;
      case "bauhaus_medium":
        setCurrentFont("bauhaus_medium");
        setSelectedFont("BHM");
        setSelectedHeavyFont("BHH");
        break;
      case "frank":
        setCurrentFont("frank");
        setSelectedFont("FRNK");
        setSelectedHeavyFont("FRNK");
        break;
      case "hummingbird":
        setCurrentFont("hummingbird");
        setSelectedFont("HMGBRD");
        setSelectedHeavyFont("HMGBRD");
        break;
      case "corruption":
        setCurrentFont("corruption");
        setSelectedFont("CRPTN");
        setSelectedHeavyFont("CRPTN");
        break;
      case "roboto":
        setCurrentFont("roboto");
        setSelectedFont("RR");
        setSelectedHeavyFont("RB");
        break;
      case "roboto_bold":
        setCurrentFont("roboto_bold");
        setSelectedFont("RB");
        setSelectedHeavyFont("RB");
        break;
      case "serif":
        setCurrentFont("serif");
        setSelectedFont("SRF");
        setSelectedHeavyFont("SRF");
        break;
      case "ubuntu":
        setCurrentFont("ubuntu");
        setSelectedFont("UR");
        setSelectedHeavyFont("UB");
        break;
      case "ubuntu_bold":
        setCurrentFont("ubuntu_bold");
        setSelectedFont("UB");
        setSelectedHeavyFont("UB");
        break;
      case "lobster":
        setCurrentFont("lobster");
        setSelectedFont("LOBR");
        setSelectedHeavyFont("LOBR");
        break;
      case "lobster_two":
        setCurrentFont("lobster_two");
        setSelectedFont("LOB2R");
        setSelectedHeavyFont("LOB2B");
        break;
      case "lobster_two_bold":
        setCurrentFont("lobster_two_bold");
        setSelectedFont("LOB2B");
        setSelectedHeavyFont("LOB2B");
        break;
      case "prata":
        setCurrentFont("prata");
        setSelectedFont("PRA");
        setSelectedHeavyFont("PRA");
        break;
      case "shadows_into_light":
        setCurrentFont("shadows_into_light");
        setSelectedFont("SIL");
        setSelectedHeavyFont("SIL");
        break;
      default:
        setCurrentFont("nexa");
        setSelectedFont("NSL");
        setSelectedHeavyFont("NSH");
    }
  };

  const getSavedFont = async () => {
    axios
      .get(`${serverURL}/getFont`)
      .then(({ data }) => {
        console.log("incoming font:", data);
        setCurrentFont(data);
        changeFont(data);
      })
      .catch((err) => console.error(err));
  };

  const saveFontSelection = async (font: string) => {
    axios
      .post(`${serverURL}/saveFontSelection`, {
        font: font,
      })
      .then(({ data }) => {
        // getSavedFont();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSavedFont();
  }, []);

  const values = {
    selectedFont,
    selectedHeavyFont,
    changeFont,
  };

  return <FontContext.Provider value={values}>{children}</FontContext.Provider>;
}
