import {
  ActivityIndicator,
  Animated,
  Easing,
  GestureResponderEvent,
  ImageBackground,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  ViewStyle,
} from "react-native";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { Album, PhotosContext } from "../context/PhotosContext";
import { Image } from "expo-image";

// interface AlbumButtonItem {
//   id: string;
//   title: string;
//   url: string;
// }

// const albumsList: AlbumButtonItem[] = [
//   {
//     id: 0,
//     title: "Portugal\n(with my love ❤️)",
//     url: "https://jsonplaceholder.typicode.com/photos/1",
//   },
//   {
//     id: 1,
//     title: "Austria\n(with my love ❤️)",
//     url: "https://jsonplaceholder.typicode.com/photos/2",
//   },
//   {
//     id: 2,
//     title: "Paris\n(❤️🗽 with my love 🗼🎄)",
//     url: "https://jsonplaceholder.typicode.com/photos/3",
//   },
// ];

export default function Photos() {
  const intl = useIntl();
  const albumsSVRef = useRef<ScrollView>();
  const { color300, color500, color700, lightText, darkText, photosBG } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { albums } = useContext(PhotosContext);
  const [menuIconColor, setMenuIconColor] = useState<string>("#FFFFFF");
  const [listOfAlbumsIsOpen, setListOfAlbumsIsOpen] = useState<boolean>(false);
  const [albumsIconColor, setAlbumsIconColor] = useState<string>("#FFFFFF");
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0);
  const [albumIsLoading, setAlbumIsLoading] = useState<boolean>(false);
  const [viewAlbumIsOpen, setViewAlbumIsOpen] = useState<boolean>(false);
  const [photoPosition, setPhotoPosition] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [currentAlbumPhotos, setCurrentAlbumPhotos] = useState<
    ImageSourcePropType[]
  >(albums[0].photos);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [previousPhotoIconColor, setPreviousPhotoIconColor] =
    useState<string>("#FFFFFF");
  const [nextPhotoIconColor, setNextPhotoIconColor] =
    useState<string>("#FFFFFF");
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
  const [shareIconColor, setShareIconColor] = useState<string>("#FFFFFF");

  /**
   * Functions
   */
  const handlePressInMenu = () => setMenuIconColor(color300);
  const handlePressOutMenu = () => setMenuIconColor("#FFFFFF");
  const handlePressMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(!listOfAlbumsIsOpen);
    setViewAlbumIsOpen(false);
    setShareIsOpen(false);
  };

  const handlePressInAlbums = () => setAlbumsIconColor(color300);
  const handlePressOutAlbums = () => setAlbumsIconColor("#FFFFFF");
  const handlePressAlbums = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(false);
    setViewAlbumIsOpen(!viewAlbumIsOpen);
    setShareIsOpen(false);
    setCurrentPhotoIndex(0);
  };

  const handlePressInPreviousPhoto = () => setPreviousPhotoIconColor(color300);
  const handlePressOutPreviousPhoto = () =>
    setPreviousPhotoIconColor("#FFFFFF");
  const handlePressPreviousPhoto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // setTimeout(() => {
    //   setCurrentPhotoIndex(
    //     currentPhotoIndex === 0
    //       ? currentAlbumPhotos.length - 1
    //       : currentPhotoIndex - 1
    //   );
    // }, 5);
    setCurrentPhotoIndex(
      currentPhotoIndex === 0
        ? currentAlbumPhotos.length - 1
        : currentPhotoIndex - 1
    );
    animatePageRight();
    // albumsSVRef.current?.scrollTo({
    //   y: 0,
    //   animated: true,
    // });
  };
  const animatePageRight = () => {
    Animated.timing(photoPosition, {
      toValue: { x: 400, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setPhotoPosition(new Animated.ValueXY({ x: 0, y: 0 }));
      setTimeout(() => animatePageFromLeft(), 250);
    }, 200);
  };
  const animatePageFromLeft = () => {
    Animated.timing(photoPosition, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const handlePressInNextPhoto = () => setNextPhotoIconColor(color300);
  const handlePressOutNextPhoto = () => setNextPhotoIconColor("#FFFFFF");
  const handlePressNextPhoto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // setTimeout(() => {
    //   setCurrentPhotoIndex(
    //     currentPhotoIndex === currentAlbumPhotos.length - 1
    //       ? 0
    //       : currentPhotoIndex + 1
    //   );
    // }, 5);
    setCurrentPhotoIndex(
      currentPhotoIndex === currentAlbumPhotos.length - 1
        ? 0
        : currentPhotoIndex + 1
    );
    animatePageLeft();
    // pageSVRef.current?.scrollTo({
    //   y: 0,
    //   animated: true,
    // });
  };
  const animatePageLeft = () => {
    Animated.timing(photoPosition, {
      toValue: { x: -400, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setPhotoPosition(new Animated.ValueXY({ x: 0, y: 0 }));
      setTimeout(() => animatePageFromRight(), 250);
    }, 200);
  };
  const animatePageFromRight = () => {
    Animated.timing(photoPosition, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const handlePressInShare = () => setShareIconColor(color300);
  const handlePressOutShare = () => setShareIconColor("#FFFFFF");
  const handlePressShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(false);
    setViewAlbumIsOpen(false);
    setShareIsOpen(!shareIsOpen);
  };

  /**
   * Components
   */
  const AlbumButton = ({ id, index, title, photos }: Album) => (
    <Pressable
      onPress={() => {
        setCurrentAlbumIndex(index);
        setListOfAlbumsIsOpen(false);
        // setAlbumIsLoading(true);
        setCurrentAlbumPhotos(photos);

        if (OS === "android") {
          ToastAndroid.showWithGravity(
            `Loading album ${title}...`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        setTimeout(() => setViewAlbumIsOpen(true), 200);
      }}
      style={{
        ...styles.albumItem,
        padding: albums[currentAlbumIndex].id === id ? 18 : 6,
        borderColor: lightText,
        backgroundColor: color500,
        width: albums[currentAlbumIndex].id === id ? "100%" : "90%",
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          ...styles.albumItemText,
          color: lightText,
          fontFamily:
            albums[currentAlbumIndex].id === id
              ? selectedHeavyFont
              : selectedFont,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={photosBG} style={styles.imageBackground}>
        <View style={styles.mainContainer}>
          <View style={styles.topView}></View>
          {listOfAlbumsIsOpen && (
            <View
              style={{
                ...styles.photosView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 32,
                  textDecorationLine: "underline",
                  paddingBottom: 6,
                }}
              >
                <FormattedMessage
                  id="photos.albums.title"
                  defaultMessage="Photo Albums"
                />
              </Text>
              <View
                style={{
                  ...styles.albumsContainer,
                  backgroundColor: color300,
                }}
              >
                <ScrollView ref={albumsSVRef}>
                  {albums.map((album) => (
                    <AlbumButton
                      key={album.id}
                      id={album.id}
                      title={album.title}
                      index={album.index}
                      photos={album.photos}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          {viewAlbumIsOpen && (
            <View
              style={{
                ...styles.photosView,
                backgroundColor: color700,
              }}
            >
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 32,
                  paddingBottom: 6,
                  textAlign: "center",
                }}
              >
                {albums[currentAlbumIndex].title}
              </Text>
              <Animated.View
                style={[
                  {
                    ...styles.albumsContainer,
                    width: "90%",
                    height: "70%",
                    borderWidth: 0,
                  },
                  photoPosition.getLayout(),
                ]}
              >
                <Image
                  source={currentAlbumPhotos[currentPhotoIndex]}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                  transition={300}
                />
              </Animated.View>
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 26,
                  paddingTop: 6,
                  textAlign: "center",
                }}
              >
                {`(${currentPhotoIndex + 1} / ${currentAlbumPhotos.length})`}
              </Text>
            </View>
          )}
          <View
            style={{
              ...styles.photosControlsView,
              backgroundColor: color700,
              borderBottomLeftRadius: OS === "ios" ? 50 : 12,
              borderBottomRightRadius: OS === "ios" ? 50 : 12,
            }}
          >
            <View style={styles.photosControls}>
              <Pressable
                onPressIn={handlePressInMenu}
                onPressOut={handlePressOutMenu}
                onPress={handlePressMenu}
                style={{
                  padding: 6,
                }}
              >
                {!listOfAlbumsIsOpen ? (
                  <Entypo name="menu" size={48} color={menuIconColor} />
                ) : (
                  <Entypo
                    name="triangle-down"
                    size={48}
                    color={menuIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInPreviousPhoto}
                onPressOut={handlePressOutPreviousPhoto}
                onPress={handlePressPreviousPhoto}
                style={{
                  padding: 6,
                }}
              >
                <MaterialIcons
                  name="navigate-before"
                  size={48}
                  color={viewAlbumIsOpen ? previousPhotoIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInAlbums}
                onPressOut={handlePressOutAlbums}
                onPress={handlePressAlbums}
                style={{
                  padding: 6,
                }}
              >
                {!viewAlbumIsOpen ? (
                  <MaterialIcons
                    name="photo-album"
                    size={48}
                    color={albumsIconColor}
                  />
                ) : (
                  <Fontisto
                    name="photograph"
                    size={48}
                    color={albumsIconColor}
                  />
                )}
              </Pressable>
              <Pressable
                onPressIn={handlePressInNextPhoto}
                onPressOut={handlePressOutNextPhoto}
                onPress={handlePressNextPhoto}
                style={{
                  padding: 6,
                }}
              >
                <MaterialIcons
                  name="navigate-next"
                  size={48}
                  color={viewAlbumIsOpen ? nextPhotoIconColor : "#808080"}
                />
              </Pressable>
              <Pressable
                onPressIn={handlePressInShare}
                onPressOut={handlePressOutShare}
                onPress={handlePressShare}
                style={{
                  padding: 6,
                }}
              >
                {!shareIsOpen ? (
                  <FontAwesome
                    name="share-alt"
                    size={48}
                    color={shareIconColor}
                  />
                ) : (
                  <MaterialIcons
                    name="ios-share"
                    size={48}
                    color={shareIconColor}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    contentFit: "cover",
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  topView: {
    borderTopWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
  },
  photosControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  photosControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  photosView: {
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  albumsContainer: {
    width: "90%",
    height: "88%",
    // backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 6,
    padding: 6,
    borderRadius: 12,
  },
  albumItem: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderRadius: 12,
  },
  albumItemText: {
    fontSize: 24,
  },
});
