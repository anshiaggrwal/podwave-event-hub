import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '@/contexts/EventContext';
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { PodcastEvent, TimelineItem } from '@/types/event';
import { X, Plus } from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEventContext();
  const [eventType, setEventType] = useState<'virtual' | 'physical'>('physical');
  const [timeline, setTimeline] = useState<TimelineItem[]>([
    { time: '', description: '' }
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    podcastName: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    meetLink: '',
    ticketPrice: 0,
    totalSeats: 50,
    host: '',
    image: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };
  
  const addTimelineItem = () => {
    setTimeline([...timeline, { time: '', description: '' }]);
  };
  
  const removeTimelineItem = (index: number) => {
    if (timeline.length > 1) {
      setTimeline(timeline.filter((_, i) => i !== index));
    }
  };
  
  const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index] = { ...updatedTimeline[index], [field]: value };
    setTimeline(updatedTimeline);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Omit<PodcastEvent, 'id' | 'availableSeats'> = {
      ...formData,
      eventType,
      timeline: timeline.filter(item => item.time && item.description),
      totalSeats: Number(formData.totalSeats),
      ticketPrice: Number(formData.ticketPrice)
    };
    
    addEvent(newEvent);
    navigate('/events');
  };
  
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 flex-grow">
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the details about your podcast event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                name="title" 
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Podcast Production Workshop"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="podcastName">Podcast Name</Label>
              <Input 
                id="podcastName" 
                name="podcastName" 
                required
                value={formData.podcastName}
                onChange={handleChange}
                placeholder="e.g., The Design Corner"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event details..."
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="host">Host Name</Label>
              <Input 
                id="host" 
                name="host" 
                required
                value={formData.host}
                onChange={handleChange}
                placeholder="e.g., John Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Event Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Choose the type and logistics for your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select 
                value={eventType} 
                onValueChange={(value) => setEventType(value as 'virtual' | 'physical')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Event</SelectItem>
                  <SelectItem value="virtual">Virtual Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input 
                  id="time" 
                  name="time" 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="venue">
                {eventType === 'virtual' ? 'Platform Name' : 'Venue Name'}
              </Label>
              <Input 
                id="venue" 
                name="venue" 
                required
                value={formData.venue}
                onChange={handleChange}
                placeholder={eventType === 'virtual' ? 'e.g., Zoom Webinar' : 'e.g., Conference Center'}
              />
            </div>
            
            {eventType === 'virtual' ? (
              <div className="space-y-2">
                <Label htmlFor="meetLink">Meeting Link</Label>
                <Input 
                  id="meetLink" 
                  name="meetLink"
                  value={formData.meetLink}
                  onChange={handleChange}
                  placeholder="e.g., https://zoom.us/j/123456789"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="location">Address</Label>
                <Input 
                  id="location" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., 123 Main St, City, State"
                />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketPrice">Ticket Price (USD)</Label>
                <Input 
                  id="ticketPrice" 
                  name="ticketPrice" 
                  type="number" 
                  min="0"
                  required
                  value={formData.ticketPrice}
                  onChange={handleNumberChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalSeats">Total Available Seats</Label>
                <Input 
                  id="totalSeats" 
                  name="totalSeats" 
                  type="number" 
                  min="1"
                  required
                  value={formData.totalSeats}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Event Timeline</CardTitle>
            <CardDescription>Add the schedule for your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor={`time-${index}`}>Time</Label>
                    <Input 
                      id={`time-${index}`}
                      value={item.time}
                      onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Input 
                      id={`description-${index}`}
                      value={item.description}
                      onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                      placeholder="e.g., Welcome and Registration"
                    />
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-8"
                  onClick={() => removeTimelineItem(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addTimelineItem}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Timeline Item
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/events')}
          >
            Cancel
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
