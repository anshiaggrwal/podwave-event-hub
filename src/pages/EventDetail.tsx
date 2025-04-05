
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventContext } from '@/contexts/EventContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, MapPin, Video, Users, 
  Headphones, Ticket, ScrollText
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, registerForEvent } = useEventContext();
  const [numTickets, setNumTickets] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const event = getEvent(id || '');
  
  if (!event) {
    return (
      <>
        <Navbar />
        <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-8 text-muted-foreground">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/events')}>Browse Events</Button>
        </div>
      </>
    );
  }

  const handleRegister = () => {
    const success = registerForEvent(event.id, numTickets);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto py-8 px-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="h-5 w-5 text-primary" />
                <span className="font-medium">{event.podcastName}</span>
                <Badge variant={event.eventType === 'virtual' ? 'secondary' : 'default'}>
                  {event.eventType === 'virtual' ? (
                    <Video className="mr-1 h-3 w-3" />
                  ) : (
                    <MapPin className="mr-1 h-3 w-3" />
                  )}
                  {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <p className="text-sm text-muted-foreground">Hosted by <span className="font-medium">{event.host}</span></p>
            </div>

            <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={event.image || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-8">
              <div className="flex items-start gap-2 mb-6">
                <ScrollText className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Event Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-4">Event Timeline</h2>
                  <div className="space-y-4">
                    {event.timeline.map((item, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                        <h3 className="font-medium">{item.time}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {event.eventType === 'virtual' ? (
                      <Video className="h-5 w-5 text-primary" />
                    ) : (
                      <MapPin className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {event.eventType === 'virtual' ? 'Platform' : 'Venue'}
                      </p>
                      <p className="font-medium">{event.venue}</p>
                      {event.eventType === 'physical' && event.location && (
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Price</p>
                      <p className="font-medium">{formatCurrency(event.ticketPrice)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <div className="font-medium flex items-center">
                        <span className="animate-count-up">{event.availableSeats}</span>
                        <span> / {event.totalSeats} seats available</span>
                      </div>
                    </div>
                  </div>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-4">
                        Register Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Register for Event</DialogTitle>
                        <DialogDescription>
                          Complete your registration for "{event.title}"
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="tickets">Number of tickets</Label>
                          <Input
                            id="tickets"
                            type="number"
                            min="1"
                            max={event.availableSeats}
                            value={numTickets}
                            onChange={(e) => setNumTickets(parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="flex justify-between">
                          <span>Price per ticket:</span>
                          <span>{formatCurrency(event.ticketPrice)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>{formatCurrency(event.ticketPrice * numTickets)}</span>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleRegister}>
                          Complete Registration
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-muted py-6 mt-12">
        <div className="container max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 PodWave Event Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventDetail;
