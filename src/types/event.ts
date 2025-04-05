
export type EventType = 'virtual' | 'physical';

export interface TimelineItem {
  time: string;
  description: string;
}

export interface PodcastEvent {
  id: string;
  title: string;
  podcastName: string;
  description: string;
  eventType: EventType;
  date: string;
  time: string;
  venue: string;
  location?: string;
  meetLink?: string;
  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;
  image?: string;
  host: string;
  timeline: TimelineItem[];
}
