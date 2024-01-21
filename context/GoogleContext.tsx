import { ReactNode, createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  ConfigureParams,
  GoogleSignin,
  statusCodes,
  SignInParams,
  User,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "595018983301-f5t3qtb4o0o3fi6i5gll3ofsklgkavni.apps.googleusercontent.com",
  iosClientId:
    "595018983301-90nj93k69he9ihpb3u1fgdnp7me27uk2.apps.googleusercontent.com",
  scopes: [
    "https://www.googleapis.com/auth/cloud-translation",
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/photoslibrary",
    "https://www.googleapis.com/auth/photoslibrary.readonly",
  ],
});

export type GoogleStateContext = {
  user: User | null;
};
export type GoogleContextProps = {
  children?: ReactNode;
};

const initialState: GoogleStateContext = {
  user: null,
};

async function signIn() {
  try {
    // await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("userInfo:", userInfo);
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("user cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("operation (e.g. sign in) is in progress already");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("play services not available or outdated");
    } else {
      console.log("some other error happened");
    }
  }
}

export const GoogleContext = createContext(initialState);

export function GoogleContextProvider({ children }: GoogleContextProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let user: User;

    signIn()
      .then((res) => {
        user = res?.user;
        setUser(user);
      })
      .catch((err) => console.error(err));
  }, []);

  const values = {
    user,
  };

  return (
    <GoogleContext.Provider value={values}>{children}</GoogleContext.Provider>
  );
}
