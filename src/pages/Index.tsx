
import React from 'react';
import EventCard from '@/components/EventCard';
import { useEventContext } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { events } = useEventContext();

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-r from-brand-light to-secondary py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PodWave <span className="text-primary">Event Hub</span>
            </h1>
            <p className="text-xl mb-8">
              Connect with your favorite podcasters at live events, workshops, and virtual meetups.
            </p>
            <Button size="lg" asChild>
              <Link to="/create">Create Your Event</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto py-12 px-4 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/events" className="text-primary font-medium hover:underline">
            View all events
          </Link>
        </div>
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No events available yet.</p>
            <Button asChild>
              <Link to="/create">Create the first event</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
