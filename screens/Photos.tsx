import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
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
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { PlatformContext } from "../context/PlatformContext";
import { PhotoAlbumsImagesCache } from "../cache/PhotoAlbumsImages";
import { Album, PhotosContext } from "../context/PhotosContext";
import { Image } from "expo-image";
import { emulatorURL, serverURL } from "../constants/urls";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

function getUri(albumId: string, photoIndex: number) {
  const index = photoIndex + 1;

  // http://192.168.4.22:9090
  const uri = `${serverURL}/assets/photosAlbums/${albumId}/${albumId}${
    index >= 10 ? "0" + index : "00" + index
  }.jpg`;

  return uri;
}

export default function Photos() {
  const intl = useIntl();
  const albumsSVRef = useRef<ScrollView>();
  const { color300, color500, color700, lightText, darkText, photosBgUri } =
    useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { OS } = useContext(PlatformContext);
  const { albums, fetchAlbumLength } = useContext(PhotosContext);
  const { loadAlbumImages } = useContext(PhotoAlbumsImagesCache);
  const [menuIconColor, setMenuIconColor] = useState<string>("#FFFFFF");
  const [listOfAlbumsIsOpen, setListOfAlbumsIsOpen] = useState<boolean>(false);
  const [albumsIconColor, setAlbumsIconColor] = useState<string>("#FFFFFF");
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>(
    albums[0].id || "paris"
  );
  const [albumIsLoading, setAlbumIsLoading] = useState<boolean>(false);
  const [viewAlbumIsOpen, setViewAlbumIsOpen] = useState<boolean>(false);
  const [currentAlbumLength, setCurrentAlbumLength] = useState<number>(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [uri, setUri] = useState<string>();
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
    setCurrentPhotoIndex(
      currentPhotoIndex === 0 ? currentAlbumLength - 1 : currentPhotoIndex - 1
    );
  };

  const handlePressInNextPhoto = () => setNextPhotoIconColor(color300);
  const handlePressOutNextPhoto = () => setNextPhotoIconColor("#FFFFFF");
  const handlePressNextPhoto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentPhotoIndex(
      currentPhotoIndex === currentAlbumLength - 1 ? 0 : currentPhotoIndex + 1
    );
  };

  const handlePressInShare = () => setShareIconColor(color300);
  const handlePressOutShare = () => setShareIconColor("#FFFFFF");
  const handlePressShare = () => {
    if (!viewAlbumIsOpen) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setListOfAlbumsIsOpen(false);
    // setViewAlbumIsOpen(false);
    setShareIsOpen(!shareIsOpen);
    Sharing.isAvailableAsync()
      .then((res) => {
        console.log("Sharing.isAvailableAsync:", res);
        if (res) {
          Sharing.shareAsync(FileSystem.documentDirectory + "assets/splash.png")
            .then((res) => console.log("Sharing.shareAsync:", res))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const updateUri = () => {
    setUri(getUri(currentAlbumId, currentPhotoIndex));
  };

  const updateAlbumLength = (length: number) => {
    setCurrentAlbumLength(length);
  };

  const updateAlbumIsLoading = (isLoading: boolean) => {
    setAlbumIsLoading(isLoading);
  };

  useEffect(() => {
    updateUri();
  }, [currentAlbumId, currentPhotoIndex]);

  useEffect(() => {
    setCurrentPhotoIndex(0);
    fetchAlbumLength(currentAlbumId, updateAlbumLength);
  }, [currentAlbumId]);

  useEffect(() => {
    if (viewAlbumIsOpen) {
      updateAlbumIsLoading(true);
      loadAlbumImages(currentAlbumId, setAlbumIsLoading, updateAlbumIsLoading);
    }
  }, [viewAlbumIsOpen]);

  /**
   * Components
   */
  const AlbumButton = ({ id, index, title }: Album) => (
    <Pressable
      onPress={() => {
        setCurrentAlbumIndex(index);
        setCurrentAlbumId(id);
        setListOfAlbumsIsOpen(false);
        // setAlbumIsLoading(true);

        if (OS === "android") {
          ToastAndroid.showWithGravity(
            `Loading album ${title}...`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        setViewAlbumIsOpen(true);
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
      <Image
        source={{
          uri: photosBgUri,
        }}
        contentFit="cover"
        transition={100}
        style={styles.imageBackground}
      >
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
              <View
                style={{
                  ...styles.albumsContainer,
                  width: "90%",
                  height: "70%",
                  borderWidth: 0,
                }}
              >
                {albumIsLoading ? (
                  <ActivityIndicator
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    size="large"
                    color={color500}
                  />
                ) : (
                  <Image
                    // source={currentAlbumPhotos[currentPhotoIndex]}
                    source={{
                      uri: uri,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    contentFit="contain"
                    transition={300}
                  />
                )}
              </View>
              <Text
                style={{
                  fontFamily: selectedHeavyFont,
                  color: lightText,
                  fontSize: 26,
                  paddingTop: 6,
                  textAlign: "center",
                }}
              >
                {`(${currentPhotoIndex + 1} / ${currentAlbumLength})`}
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
                    color={viewAlbumIsOpen ? shareIconColor : "#808080"}
                  />
                ) : (
                  <MaterialIcons
                    name="ios-share"
                    size={48}
                    color={viewAlbumIsOpen ? shareIconColor : "#808080"}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Image>
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
