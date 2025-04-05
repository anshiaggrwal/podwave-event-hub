
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PodcastEvent } from '@/types/event';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface EventContextType {
  events: PodcastEvent[];
  addEvent: (event: Omit<PodcastEvent, 'id' | 'availableSeats'>) => void;
  getEvent: (id: string) => PodcastEvent | undefined;
  registerForEvent: (eventId: string, numTickets: number) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<PodcastEvent[]>([
    {
      id: "1",
      title: "Podcast Production Masterclass",
      podcastName: "Audio Masters",
      description: "Learn how to produce professional quality podcasts with industry experts.",
      eventType: "physical",
      date: "2025-04-20",
      time: "10:00 AM",
      venue: "Sound Studio NYC",
      location: "240 Broadway Ave, New York, NY",
      ticketPrice: 75,
      totalSeats: 50,
      availableSeats: 32,
      host: "Sarah Johnson",
      timeline: [
        { time: "10:00 AM", description: "Registration & Welcome Coffee" },
        { time: "10:30 AM", description: "Introduction to Podcast Production" },
        { time: "12:00 PM", description: "Lunch Break" },
        { time: "1:00 PM", description: "Equipment Workshop" },
        { time: "3:00 PM", description: "Q&A Session" },
        { time: "4:00 PM", description: "Networking" }
      ],
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "Storytelling for Podcasters",
      podcastName: "Narrative Hub",
      description: "Virtual workshop on crafting compelling stories for your podcast audience.",
      eventType: "virtual",
      date: "2025-05-15",
      time: "2:00 PM",
      venue: "Zoom Webinar",
      meetLink: "https://zoom.us/j/123456789",
      ticketPrice: 25,
      totalSeats: 100,
      availableSeats: 65,
      host: "Michael Chen",
      timeline: [
        { time: "2:00 PM", description: "Introduction to Storytelling" },
        { time: "2:30 PM", description: "Story Structure Workshop" },
        { time: "3:30 PM", description: "Interactive Exercise" },
        { time: "4:15 PM", description: "Feedback & Discussion" }
      ],
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop"
    }
  ]);

  const addEvent = (event: Omit<PodcastEvent, 'id' | 'availableSeats'>) => {
    const newEvent: PodcastEvent = {
      ...event,
      id: uuidv4(),
      availableSeats: event.totalSeats
    };
    
    setEvents([...events, newEvent]);
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    });
  };

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const registerForEvent = (eventId: string, numTickets: number) => {
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) {
      toast({
        title: "Error",
        description: "Event not found.",
        variant: "destructive"
      });
      return false;
    }
    
    const event = events[eventIndex];
    
    if (event.availableSeats < numTickets) {
      toast({
        title: "Registration Failed",
        description: `Only ${event.availableSeats} seats available.`,
        variant: "destructive"
      });
      return false;
    }
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      ...event,
      availableSeats: event.availableSeats - numTickets
    };
    
    setEvents(updatedEvents);
    toast({
      title: "Registration Successful",
      description: `You have registered for ${numTickets} ticket(s).`,
    });
    
    return true;
  };

  return (
    <EventContext.Provider value={{ events, addEvent, getEvent, registerForEvent }}>
      {children}
    </EventContext.Provider>
  );
};
