import { ReactNode, createContext } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";

const devicePlatform = Platform.OS;
const deviceModel = Device.modelName;

export type PlatformStateContext = {
  OS: string;
  model: string | null;
};
export type PlatformContextProps = {
  children?: ReactNode;
};

const initialState: PlatformStateContext = {
  OS: devicePlatform,
  model: deviceModel,
};

export const PlatformContext = createContext(initialState);

export const PlatformContextProvider = ({ children }: PlatformContextProps) => {
  const values = {
    OS: devicePlatform,
    model: deviceModel,
  };

  return (
    <PlatformContext.Provider value={values}>
      {children}
    </PlatformContext.Provider>
  );
};
