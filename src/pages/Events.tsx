
import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import { useEventContext } from '@/contexts/EventContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Events = () => {
  const { events } = useEventContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.podcastName.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'virtual' && event.eventType === 'virtual') ||
      (filter === 'physical' && event.eventType === 'physical');
      
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 flex-grow">
      <h1 className="text-3xl font-bold mb-8">Browse Events</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search events..."
          className="flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="physical">Physical Events</SelectItem>
            <SelectItem value="virtual">Virtual Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
