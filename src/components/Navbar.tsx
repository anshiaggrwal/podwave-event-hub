
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Headphones } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b bg-white dark:bg-card shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Headphones className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-brand-dark">PodWave</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/events">Events</Link>
            </Button>
            <Button asChild>
              <Link to="/create">Create Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
