import  { JSX, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Tag,
} from 'lucide-react';
import { getEventsOfOrganizerByStatus } from "../services/EventService";
import Navbar from "./Navbar";

interface Event {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  seats: number;
  status: 'approved' | 'pending' | 'declined';
  postedDate: string;
  images: string[];
}

export default function EventsByStatus(): JSX.Element {
  const location = useLocation();
  const status = location.state?.value;
  const organizerId = Number(localStorage.getItem('userId'));
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventsByStatus = async () => {
      try {
        setLoading(true);
        const response = await getEventsOfOrganizerByStatus(status, organizerId);
        console.log(response);
        setEvents(response);
      } catch (e) {
        console.error("Can't fetch events: ", e);
      } finally {
        setLoading(false);
      }
    };
    
    if (status && organizerId) {
      fetchEventsByStatus();
    }
  }, [status, organizerId]);

  const getStatusColor = (eventStatus: string): string => {
    switch (eventStatus) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string): string => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (event: Event): void => {
    console.log('Editing event:', event.name);
    // Add your edit navigation logic here
    // For example: navigate(`/events/edit/${event.id}`)
  };

  const handleDelete = async (eventId: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // Add your delete API call here
        console.log('Deleting event:', eventId);
        setEvents(events.filter(event => event.id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const canEdit = (eventStatus: string): boolean => {
    return eventStatus === 'pending' || eventStatus === 'declined';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>
    <div className="min-h-screen bg-gray-50 md:pt-10 pt-10 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-2">
          {status ? `${status.charAt(0).toUpperCase() + status.slice(1)} Events` : 'Events'}
        </h1>
        <p className="text-gray-600 text-center md:text-lg">
          {events.length} event{events.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-700">
                {event.images && event.images.length > 0 ? (
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-white opacity-50" />
                  </div>
                )}
                
                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)} backdrop-blur-sm`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                {/* Event Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2 line-clamp-2">
                    {event.name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 capitalize">{event.category}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-4 w-4 text-blue-900 flex-shrink-0" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-4 w-4 text-blue-900 flex-shrink-0" />
                    <span className="text-sm">{formatTime(event.time)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-900 flex-shrink-0" />
                    <span className="text-sm truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-blue-900" />
                      <span className="text-sm">{event.seats} seats</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-900" />
                      <span className="text-sm font-semibold text-blue-900">LKR {event.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {canEdit(event.status) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(event);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(event.id);
                    }}
                    className={`${canEdit(event.status) ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 max-w-md mx-auto">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              No {status} events available at the moment.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}