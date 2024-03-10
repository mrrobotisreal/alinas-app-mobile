import { useState, useEffect } from "react";
import axios from "axios";
import { analyticsURL } from "../constants/urls";
import { EventObject } from "../hooks/useCaptureEvent";
import {
  ContextEventsRequest,
  DateEventsRequest,
  LocationEventsRequest,
  NameEventsRequest,
  SpecificEventsRequest,
} from "../types/types";

export interface FetchEventsProps {
  eventTypes?: {
    name?: string;
    location?: string;
    context?: string;
    date?: string;
    detail?: string;
  };
  isSpecific?: boolean;
}

export interface UseGetEventsReturns {
  allEvents: EventObject[];
  fetchEvents: (props: FetchEventsProps) => void;
}

export default function useGetEvents(): UseGetEventsReturns {
  const [allEvents, setAllEvents] = useState<EventObject[]>([]);

  const fetchEvents = async ({ eventTypes, isSpecific }: FetchEventsProps) => {
    try {
      let response: EventObject[];
      if (isSpecific) {
        // Fetch specific events
        const request: SpecificEventsRequest = {
          name: eventTypes?.name,
          location: eventTypes?.location,
          context: eventTypes?.context,
          date: eventTypes?.date,
          detail: eventTypes?.detail,
        };
        response = (
          await axios.post<EventObject[]>(
            `${analyticsURL}/getSpecificEvents`,
            request
          )
        ).data;
      } else if (eventTypes?.context) {
        // Fetch events by context
        const request: ContextEventsRequest = {
          context: eventTypes.context,
        };
        response = (
          await axios.post<EventObject[]>(
            `${analyticsURL}/getEventsByContext`,
            request
          )
        ).data;
      } else if (eventTypes?.date) {
        // Fetch events by date
        const request: DateEventsRequest = {
          date: eventTypes.date,
        };
        response = (
          await axios.post<EventObject[]>(
            `${analyticsURL}/getEventsByDate`,
            request
          )
        ).data;
      } else if (eventTypes?.location) {
        // Fetch events by location
        const request: LocationEventsRequest = {
          location: eventTypes.location,
        };
        response = (
          await axios.post<EventObject[]>(
            `${analyticsURL}/getEventsByLocation`,
            request
          )
        ).data;
      } else if (eventTypes?.name) {
        // Fetch events by name
        const request: NameEventsRequest = {
          name: eventTypes.name,
        };
        response = (
          await axios.post<EventObject[]>(
            `${analyticsURL}/getEventsByName`,
            request
          )
        ).data;
      } else {
        // Fetch all events
        response = (
          await axios.get<EventObject[]>(`${analyticsURL}/getAllEvents`)
        ).data;
      }

      setAllEvents(response);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    allEvents,
    fetchEvents,
  };
}
