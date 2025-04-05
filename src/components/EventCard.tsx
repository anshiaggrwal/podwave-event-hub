
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Headphones, Video } from 'lucide-react';
import { PodcastEvent } from '@/types/event';
import { formatCurrency } from '@/utils/format';

interface EventCardProps {
  event: PodcastEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 right-3" variant={event.eventType === 'virtual' ? 'secondary' : 'default'}>
            {event.eventType === 'virtual' ? (
              <Video className="mr-1 h-3 w-3" />
            ) : (
              <MapPin className="mr-1 h-3 w-3" />
            )}
            {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Headphones className="h-4 w-4" />
            <span>{event.podcastName}</span>
          </div>
          <h3 className="font-bold text-lg line-clamp-2">{event.title}</h3>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-muted-foreground line-clamp-2 text-sm mb-3">
            {event.description}
          </p>
          <div className="flex items-center gap-1 text-sm mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{event.venue}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-3">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{event.availableSeats} seats left</span>
          </div>
          <div className="font-bold text-primary">
            {formatCurrency(event.ticketPrice)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
