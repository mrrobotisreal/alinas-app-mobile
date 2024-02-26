import { useContext, ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { PlatformContext } from "../context/PlatformContext";

export default function BackgroundImage({
  children,
  uri,
}: {
  children: ReactNode;
  uri: string;
}) {
  const { OS } = useContext(PlatformContext);

  if (OS === "ios") {
    return (
      <Image
        source={{
          uri,
        }}
        contentFit="cover"
        transition={100}
        style={styles.imageBackground}
      >
        {children}
      </Image>
    );
  } else {
    return (
      <ImageBackground
        source={{
          uri,
        }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    contentFit: "cover",
    width: "100%",
    height: "100%",
  },
});
