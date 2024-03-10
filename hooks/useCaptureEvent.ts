import { analyticsURL } from "../constants/urls";
import axios from "axios";

export type EventName = "Press button" | "Long press button";
export type EventLocation =
  | "Home"
  | "Photos"
  | "Read"
  | "Listen"
  | "Watch"
  | "Notes"
  | "Settings";
export type EventContext =
  | "Select book"
  | "Previous book"
  | "Next book"
  | "Open photos screen"
  | "Select album"
  | "View album"
  | "Previous photo"
  | "Next photo"
  | "View photo"
  | "Open read screen"
  | "Read book"
  | "Previous chapter"
  | "Next chapter"
  | "Select chapter"
  | "View chapter"
  | "Open listen screen"
  | "Select audiotrack"
  | "Previous audiotrack"
  | "Next audiotrack"
  | "Start player"
  | "Play audiotrack"
  | "Pause audiotrack"
  | "Open watch screen"
  | "Select playlist"
  | "Previous video"
  | "Next video"
  | "Play video"
  | "Watch video"
  | "Open notes screen"
  | "Write note"
  | "Open settings screen"
  | "View fonts"
  | "View font info"
  | "Change font"
  | "View themes"
  | "Change theme"
  | "View languages"
  | "Change language";
export type EventMetricType = "page" | "audiotrack" | "video" | "photo";

export interface EventConstants {
  selectedBook: string;
  selectedLanguage: string;
  selectedTheme: string;
  selectedFont: string;
}

export interface EventMetric {
  context: string;
  eventType: EventMetricType;
  detail: string;
  startTime: number | null;
  endTime: number | null;
  value: number | null;
  description?: string;
}

export interface EventObject {
  name: EventName;
  location: EventLocation;
  context: EventContext;
  detail: string;
  description?: string;
  timestamp: number;
  date: string;
  time: string;
  timeZone: string;
  metrics?: EventMetric;
  constants: EventConstants;
}

/**
 * Example events:
 *
 * {
 *    name: "Press button", <- options are "Press button", "Long press button" for now, will add more gesture options later
 *    location: "Home screen", <- options are "Home screen", "Photos screen", "Read screen", "Listen screen", "Watch screen", "Notes screen", "Settings screen"
 *    context: "Select book", <- options can vary, but examples are "Show albums", "Select album", "Next page", "Close book", etc...
 *    detail: "The Judge", <- options can vary, but examples are "My External Cause", "The Judge", "Coral theme", "Russian language", "portugal003.jpg", etc...
 *    description: "'The Judge' book is selected", <- optional, can be used for more detailed description
 *    timestamp: 1622136240000, <- timestamp in milliseconds
 *    date: "5/27/2024",
 *    time: "13:44",
 *    timeZone: "Europe/Vienna", <- get this with expo-localization getCalendars() method
 *    metrics: {
 *       context: "The Judge", <- whichever book is selected, for the videos and photos it will be the album or playlist name
 *       type: "page", <- options are "page", "audiotrack", "video", "photo"
 *       detail: "Chapter 3: Publicity", <- for "page" and "audiotrack" type it will be the title, for "video" and "photo" type it will be the video or photo name
 *       value: 120000, <- time in milliseconds
 *       description: "Read 'Chapter 3: Publicity' in 'The Judge' book for 2 minutes"
 *    }
 *    constants: {
 *      selectedBook: "The Judge",
 *      selectedLanguage: "English",
 *      selectedTheme: "Coral",
 *      selectedFont: "Roboto",
 *    }
 * }
 *
 */

/**
 * Context options: "Select book", "Open photos screen", "Select album", "View photo", "Open read screen", "Select chapter", "View chapter", "Open listen screen",
 * "Select audiotrack", "Play audiotrack", "Open watch screen", "Select playlist", "Watch video", "Open notes screen", "Write note", "Open settings screen",
 * "View fonts", "Change font", "View themes", "Change theme", "View languages", "Change language"
 */

/**
 * What's important to track?
 * - Which book is selected
 * - Which sections are visited most (Read, Listen, Watch, Photos, Notes, Settings)
 * - Which chapters are read most, or listened to the most
 * - Which playlists and videos are watched most
 * - Which albums and photos are viewed most
 * - How much time is spent on each section
 * - Which fonts, themes, and languages are used
 * - How many notes are written
 */

async function captureEvent(event: EventObject, metrics?: EventMetric) {
  console.log(
    "Capturing event:\n",
    JSON.stringify(
      {
        ...event,
        metrics,
      },
      null,
      2
    )
  );
  const response = await axios.post(`${analyticsURL}/storeNewEvent`, {
    ...event,
    metrics,
  });

  console.log("Event captured:\n", JSON.stringify(response.data, null, 2));

  return response.data;
}

export interface UseCaptureEventReturns {
  captureEvent: (event: EventObject, metrics?: EventMetric) => Promise<any>;
}

export default function useCaptureEvent(): UseCaptureEventReturns {
  return {
    captureEvent,
  };
}
