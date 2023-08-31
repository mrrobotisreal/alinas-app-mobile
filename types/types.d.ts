import { TextStyle, ViewStyle } from "react-native";

export type DropdownItem = {
  label: string;
  value: string;
};

export type BarChartItem = {
  value: number;
  barWidth?: number;
  onPress?: () => void;
  disablePress?: boolean;
  frontColor?: string;
  label?: string;
  labelTextStyle?: TextStyle;
  labelComponent?: React.FC;
  topLabelComponent?: React.FC;
  topLabelContainerStyle?: ViewStyle;
};
