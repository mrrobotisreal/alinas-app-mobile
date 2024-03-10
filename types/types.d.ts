import { TextStyle, ViewStyle } from "react-native";
import { EventObject } from "../hooks/useCaptureEvent";

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

/**
 * API request/response types and interfaces
 */
export type EventsResponse = EventObject[];

export interface SpecificEventsRequest {
  name?: string;
  location?: string;
  context?: string;
  date?: string;
  detail?: string;
}

export interface ContextEventsRequest {
  context: string;
}

export interface DateEventsRequest {
  date: string;
}

export interface LocationEventsRequest {
  location: string;
}

export interface NameEventsRequest {
  name: string;
}

export interface StoreNewEventRequest extends EventObject {}
