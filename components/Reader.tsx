import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { BookContext } from "../context/BookContext";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { FormattedMessage } from "react-intl";
import { useGetTexts } from "../hooks/useGetTexts";

interface ReaderProps {
  currentPageIndex: number;
  pagePosition: Animated.ValueXY;
}

export default function Reader({
  currentPageIndex,
  pagePosition,
}: ReaderProps) {
  const { color700, darkText } = useContext(ThemeContext);
  const { selectedFont, selectedHeavyFont } = useContext(FontContext);
  const { pageSVRef } = useContext(BookContext);
  const { textsList } = useGetTexts();

  return (
    <View
      style={{
        ...styles.bookView,
        backgroundColor: color700,
      }}
    >
      <Animated.View
        style={[
          {
            ...styles.page,
          },
          pagePosition.getLayout(),
        ]}
      >
        <ScrollView
          // contentContainerStyle={{
          //   alignItems: "center",
          //   height: "100%",
          //   width: "100%",
          // }}
          ref={pageSVRef}
        >
          {textsList[currentPageIndex].components.map((comp) => {
            switch (comp.type) {
              case "main_title":
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.mainTitle,
                      color: darkText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    <FormattedMessage
                      id={comp.id}
                      defaultMessage={comp.title}
                      values={{
                        s: (chunks) => (
                          <Text
                            style={{
                              textDecorationLine: "line-through",
                            }}
                          >
                            {chunks}
                          </Text>
                        ),
                      }}
                    />
                  </Text>
                );
              case "main_subtitle":
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.mainSubtitle,
                      color: darkText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    <FormattedMessage
                      id={comp.id}
                      defaultMessage={comp.title}
                    />
                  </Text>
                );
              case "author":
                if (comp.imageUri && comp.imageUri?.length > 0) {
                  return (
                    <View key={comp.id} style={styles.imageContainer}>
                      <Text
                        key={comp.id}
                        style={{
                          ...styles.author,
                          color: darkText,
                          fontFamily: selectedFont,
                          marginVertical: 4,
                          paddingVertical: 4,
                        }}
                      >
                        <FormattedMessage
                          id={comp.id}
                          defaultMessage={comp.title}
                          values={{
                            b: (chunks) => (
                              <Text
                                style={{
                                  fontFamily: selectedHeavyFont,
                                }}
                              >
                                {chunks}
                              </Text>
                            ),
                          }}
                        />
                      </Text>
                      {comp.imageUri?.map((src) => {
                        return (
                          <View
                            key={src}
                            style={{
                              width: "100%",
                              height: "100%",
                              marginTop: 20,
                              borderRadius: 12,
                              // marginBottom: 10,
                            }}
                          >
                            <Image
                              source={{
                                uri: src,
                              }}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 12,
                              }}
                              contentFit="contain"
                            />
                          </View>
                        );
                      })}
                    </View>
                  );
                }
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.author,
                      color: darkText,
                      fontFamily: selectedFont,
                      marginVertical: 4,
                      paddingVertical: 4,
                    }}
                  >
                    <FormattedMessage
                      id={comp.id}
                      defaultMessage={comp.title}
                      values={{
                        b: (chunks) => (
                          <Text
                            style={{
                              fontFamily: selectedHeavyFont,
                            }}
                          >
                            {chunks}
                          </Text>
                        ),
                      }}
                    />
                  </Text>
                );
              case "section_title":
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.sectionTitle,
                      color: darkText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    <FormattedMessage
                      id={comp.id}
                      defaultMessage={comp.title}
                      values={{
                        u: (chunks) => (
                          <Text
                            style={{
                              textDecorationLine: "underline",
                            }}
                          >
                            {chunks}
                          </Text>
                        ),
                      }}
                    />
                  </Text>
                );
              case "chapter_title":
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.chapterTitle,
                      color: darkText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    <FormattedMessage
                      id={comp.id}
                      defaultMessage={comp.title}
                    />
                  </Text>
                );
              case "chapter_content":
                // if (comp.imageUri && comp.imageUri?.length > 0) {
                //   return (
                // <View key={comp.id} style={styles.imageContainer}>
                //   {comp.imageUri?.map((src) => {
                //     return (
                //       <View
                //         key={src}
                //         style={{
                //           width: "100%",
                //           height: "100%",
                //           // marginTop: 40,
                //           // marginBottom: 40,
                //         }}
                //       >
                //         <Image
                //           source={{
                //             uri: src,
                //           }}
                //           style={{
                //             width: "100%",
                //             height: "100%",
                //             borderRadius: 12,
                //           }}
                //           contentFit="contain"
                //         />
                //       </View>
                //     );
                //   })}
                //   <Text
                //     style={{
                //       ...styles.chapterContent,
                //       color: darkText,
                //       fontFamily: selectedFont,
                //     }}
                //   >
                //     <FormattedMessage
                //       id={comp.id}
                //       defaultMessage={comp.title}
                //       values={{
                //         i: (chunks) => (
                //           <Text
                //             style={{
                //               fontFamily: selectedHeavyFont,
                //             }}
                //           >
                //             {chunks}
                //           </Text>
                //         ),
                //         u: (chunks) => (
                //           <Text
                //             style={{
                //               textDecorationLine: "underline",
                //             }}
                //           >
                //             {chunks}
                //           </Text>
                //         ),
                //       }}
                //     />
                //   </Text>
                // </View>
                //   );
                // }
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.chapterContent,
                      color: darkText,
                      fontFamily: selectedFont,
                    }}
                  >
                    <FormattedMessage
                      id={comp.id}
                      defaultMessage={comp.title}
                      values={{
                        i: (chunks) => (
                          <Text
                            style={{
                              fontFamily: selectedHeavyFont,
                            }}
                          >
                            {chunks}
                          </Text>
                        ),
                        u: (chunks) => (
                          <Text
                            style={{
                              textDecorationLine: "underline",
                            }}
                          >
                            {chunks}
                          </Text>
                        ),
                      }}
                    />
                  </Text>
                );
              case "image":
                return (
                  // <View key={comp.id} style={styles.imageContainer}>
                  comp.imageUri?.map((src) => {
                    return (
                      <View
                        key={src}
                        style={{
                          // width: "100%",
                          // height: "100%",
                          width: comp.size?.width || 400,
                          height: comp.size?.height || 400,
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: src,
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 12,
                          }}
                          contentFit="contain"
                          // resizeMode="contain"
                        />
                      </View>
                    );
                  })
                  // </View>
                );
              default:
                return (
                  <Text
                    key={comp.id}
                    style={{
                      ...styles.chapterTitle,
                      color: darkText,
                      fontFamily: selectedHeavyFont,
                    }}
                  >
                    Empty
                  </Text>
                );
            }
          })}
          {/* {textsList.map((txt) => {
            if (txt.index === currentPageIndex) {
              return (
                // <View key={txt.title}>
                txt.components.map((comp) => {
                  switch (comp.type) {
                    case "main_title":
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.mainTitle,
                            color: darkText,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id={comp.id}
                            defaultMessage={comp.title}
                            values={{
                              s: (chunks) => (
                                <Text
                                  style={{
                                    textDecorationLine: "line-through",
                                  }}
                                >
                                  {chunks}
                                </Text>
                              ),
                            }}
                          />
                        </Text>
                      );
                    case "main_subtitle":
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.mainSubtitle,
                            color: darkText,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id={comp.id}
                            defaultMessage={comp.title}
                          />
                        </Text>
                      );
                    case "author":
                      if (comp.imageUri && comp.imageUri?.length > 0) {
                        return (
                          <View key={comp.id} style={styles.imageContainer}>
                            <Text
                              key={comp.id}
                              style={{
                                ...styles.author,
                                color: darkText,
                                fontFamily: selectedFont,
                                marginVertical: 4,
                                paddingVertical: 4,
                              }}
                            >
                              <FormattedMessage
                                id={comp.id}
                                defaultMessage={comp.title}
                                values={{
                                  b: (chunks) => (
                                    <Text
                                      style={{
                                        fontFamily: selectedHeavyFont,
                                      }}
                                    >
                                      {chunks}
                                    </Text>
                                  ),
                                }}
                              />
                            </Text>
                            {comp.imageUri?.map((src) => {
                              return (
                                <View
                                  key={src}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    marginTop: 20,
                                    borderRadius: 12,
                                    // marginBottom: 10,
                                  }}
                                >
                                  <Image
                                    source={{
                                      uri: src,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: 12,
                                    }}
                                    contentFit="contain"
                                  />
                                </View>
                              );
                            })}
                          </View>
                        );
                      }
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.author,
                            color: darkText,
                            fontFamily: selectedFont,
                            marginVertical: 4,
                            paddingVertical: 4,
                          }}
                        >
                          <FormattedMessage
                            id={comp.id}
                            defaultMessage={comp.title}
                            values={{
                              b: (chunks) => (
                                <Text
                                  style={{
                                    fontFamily: selectedHeavyFont,
                                  }}
                                >
                                  {chunks}
                                </Text>
                              ),
                            }}
                          />
                        </Text>
                      );
                    case "section_title":
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.sectionTitle,
                            color: darkText,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id={comp.id}
                            defaultMessage={comp.title}
                            values={{
                              u: (chunks) => (
                                <Text
                                  style={{
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  {chunks}
                                </Text>
                              ),
                            }}
                          />
                        </Text>
                      );
                    case "chapter_title":
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.chapterTitle,
                            color: darkText,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          <FormattedMessage
                            id={comp.id}
                            defaultMessage={comp.title}
                          />
                        </Text>
                      );
                    case "chapter_content":
                      // if (comp.imageUri && comp.imageUri?.length > 0) {
                      //   return (
                      // <View key={comp.id} style={styles.imageContainer}>
                      //   {comp.imageUri?.map((src) => {
                      //     return (
                      //       <View
                      //         key={src}
                      //         style={{
                      //           width: "100%",
                      //           height: "100%",
                      //           // marginTop: 40,
                      //           // marginBottom: 40,
                      //         }}
                      //       >
                      //         <Image
                      //           source={{
                      //             uri: src,
                      //           }}
                      //           style={{
                      //             width: "100%",
                      //             height: "100%",
                      //             borderRadius: 12,
                      //           }}
                      //           contentFit="contain"
                      //         />
                      //       </View>
                      //     );
                      //   })}
                      //   <Text
                      //     style={{
                      //       ...styles.chapterContent,
                      //       color: darkText,
                      //       fontFamily: selectedFont,
                      //     }}
                      //   >
                      //     <FormattedMessage
                      //       id={comp.id}
                      //       defaultMessage={comp.title}
                      //       values={{
                      //         i: (chunks) => (
                      //           <Text
                      //             style={{
                      //               fontFamily: selectedHeavyFont,
                      //             }}
                      //           >
                      //             {chunks}
                      //           </Text>
                      //         ),
                      //         u: (chunks) => (
                      //           <Text
                      //             style={{
                      //               textDecorationLine: "underline",
                      //             }}
                      //           >
                      //             {chunks}
                      //           </Text>
                      //         ),
                      //       }}
                      //     />
                      //   </Text>
                      // </View>
                      //   );
                      // }
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.chapterContent,
                            color: darkText,
                            fontFamily: selectedFont,
                          }}
                        >
                          <FormattedMessage
                            id={comp.id}
                            defaultMessage={comp.title}
                            values={{
                              i: (chunks) => (
                                <Text
                                  style={{
                                    fontFamily: selectedHeavyFont,
                                  }}
                                >
                                  {chunks}
                                </Text>
                              ),
                              u: (chunks) => (
                                <Text
                                  style={{
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  {chunks}
                                </Text>
                              ),
                            }}
                          />
                        </Text>
                      );
                    case "image":
                      return (
                        // <View key={comp.id} style={styles.imageContainer}>
                        comp.imageUri?.map((src) => {
                          return (
                            // <View
                            //   key={src}
                            //   style={{
                            //     width: "100%",
                            //     height: "100%",
                            //   }}
                            // >
                            <Image
                              source={{
                                uri: src,
                              }}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 12,
                              }}
                              contentFit="contain"
                            />
                            // </View>
                          );
                        })
                        // </View>
                      );
                    default:
                      return (
                        <Text
                          key={comp.id}
                          style={{
                            ...styles.chapterTitle,
                            color: darkText,
                            fontFamily: selectedHeavyFont,
                          }}
                        >
                          Empty
                        </Text>
                      );
                  }
                })
                // </View>
              );
            }
          })} */}
        </ScrollView>
      </Animated.View>
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
  bookView: {
    flex: 1,
    height: "80%",
    width: "100%",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    width: "90%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 12,
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
  },
  mainSubtitle: {
    fontSize: 28,
    textAlign: "center",
  },
  author: {
    fontSize: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 28,
    textAlign: "center",
  },
  chapterTitle: {
    fontSize: 26,
    textAlign: "center",
  },
  chapterContent: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 2,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    padding: 6,
  },
  bookControlsView: {
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  bookControls: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  openBookIcon: {
    padding: 6,
  },
  menuItem: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 24,
  },
  saveNoteContainer: {
    width: "90%",
    height: "90%",
    padding: 6,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  saveNoteButton: {
    marginVertical: 6,
    borderWidth: 4,
    padding: 6,
    borderColor: "#FFFFFF",
    borderRadius: 12,
  },
  saveNoteText: {
    fontSize: 24,
  },
  notesSectionButton: {
    padding: 6,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 4,
  },
  notesSectionText: {
    fontSize: 20,
    textAlign: "center",
  },
});
