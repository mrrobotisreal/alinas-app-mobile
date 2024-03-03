import { View } from "react-native";
import YouTube from "react-native-youtube-iframe";

interface YTViewerProps {
  videoId: string;
}

export default function YTViewer({ videoId }: YTViewerProps) {
  return (
    <View style={{ alignSelf: "stretch", height: 600, flex: 1 }}>
      {/* <YouTube videoId="BONaNWF1-dc" play={true} height={600} /> */}
      <YouTube videoId={videoId} play={true} height={600} />
    </View>
  );
}
