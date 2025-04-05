
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/Navbar";
import { EventProvider } from "./contexts/EventContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EventProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/create" element={<CreateEvent />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <footer className="bg-muted py-6">
              <div className="container max-w-7xl mx-auto px-4 text-center text-muted-foreground">
                <p>© 2025 PodWave Event Hub. All rights reserved.</p>
              </div>
            </footer>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </EventProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
