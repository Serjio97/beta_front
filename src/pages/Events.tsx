
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { CMSService, Event } from '@/data/cmsData';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await CMSService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const eventTypes = ['all', 'workshop', 'webinar', 'networking', 'pitch'];
  
  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedType);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800',
      webinar: 'bg-green-100 text-green-800',
      networking: 'bg-purple-100 text-purple-800',
      pitch: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-50 py-20">
        <div className="container-width section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Upcoming <span className="gradient-text">Events</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our community events, workshops, and networking sessions designed to accelerate your startup journey. 
              Connect with fellow entrepreneurs, investors, and industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="py-8 border-b">
        <div className="container-width section-padding">
          <div className="flex flex-wrap gap-2 justify-center">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Events' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8 md:py-20">
        <div className="container-width section-padding">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Check back soon for upcoming events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredEvents.map((event, index) => (
                <Card key={event.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                  <div className={`${index === 0 ? 'md:flex' : ''}`}>
                    <div className={`${index === 0 ? 'md:w-1/2' : ''} aspect-video`}>
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className={`${index === 0 ? 'md:w-1/2' : ''} p-6`}>
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={`capitalize ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </Badge>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.time}
                          </div>
                        </div>
                        <CardTitle className={`${index === 0 ? 'text-2xl' : 'text-lg'} mb-2`}>
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {event.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-4">
                        {/* Event Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <span className="font-medium text-gray-900 mr-2">Date:</span>
                            <span className="text-gray-600">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-start">
                            <span className="font-medium text-gray-900 mr-2">Location:</span>
                            <span className="text-gray-600">{event.location}</span>
                          </div>
                        </div>

                        {/* Registration Button */}
                        <Button className="w-full" size={index === 0 ? 'lg' : 'default'}>
                         <a 
  href={event.registrationUrl} 
  target="_blank" 
  rel="noopener noreferrer"
>
  <Button className="w-full" size={index === 0 ? 'lg' : 'default'}>
    Register Now
  </Button>
</a>

                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Categories Info */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Events
            </h2>
            <p className="text-xl text-gray-600">
              We host various types of events to support your entrepreneurial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: 'Workshops',
                description: 'Hands-on learning sessions covering essential startup skills and technologies',
                icon: '🛠️'
              },
              {
                type: 'Webinars',
                description: 'Online sessions with industry experts sharing insights and best practices',
                icon: '💻'
              },
              {
                type: 'Networking',
                description: 'Connect with fellow entrepreneurs, mentors, and potential partners',
                icon: '🤝'
              },
              {
                type: 'Pitch Events',
                description: 'Opportunities to present your startup to investors and get feedback',
                icon: '🚀'
              }
            ].map((category, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.type}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Host an Event?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Partner with us to organize workshops, networking events, or speaking sessions for our startup community.
          </p>
          <Button size="lg" variant="secondary">
            Partner With Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
