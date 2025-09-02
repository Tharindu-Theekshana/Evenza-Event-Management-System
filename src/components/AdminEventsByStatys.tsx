import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  User, 
  Tag, 
  FileText, 
  Hash,
  CheckCircle,
  XCircle
} from "lucide-react";
import { getEventsByStatus, updateEventStatus } from "../services/EventService";
import Navbar from "./Navbar";

interface Event {
  id: number;
  name: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  seats: number;
  organizerId: number;
  organizerName: string;
  postedDate: string;
  status: 'pending' | 'approved' | 'declined';
  images: string[];
}

export default function AdminEventsByStatus() {
  const location = useLocation();
  const status = location.state?.value;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEventsByStatus(status);
        setEvents(response);
        
      } catch (e) {
        console.error("error in fetching events: ", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [status]);

  const handleApprove = async (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'approved' as const } : event
    ));
    const updatedStatus = "approved";
    const res = await updateEventStatus(eventId, updatedStatus);
    alert(res.message);
  };

  const handleDecline = async (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'declined' as const } : event
    ));
    const updatedStatus = "declined";
    const res = await updateEventStatus(eventId, updatedStatus);
    alert(res.message);

  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1";
    
    switch (status) {
      case 'approved':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case 'declined':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle className="w-4 h-4" />
            Declined
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const renderActionButtons = (event: Event) => {
    if (event.status === 'pending') {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => handleApprove(event.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => handleDecline(event.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Decline
          </button>
        </div>
      );
    } else if (event.status === 'approved') {
      return (
        <button
          onClick={() => handleDecline(event.id)}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <XCircle className="w-4 h-4" />
          Decline
        </button>
      );
    } else if (event.status === 'declined') {
      return (
        <button
          onClick={() => handleApprove(event.id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </button>
      );
    }
    return null;
  };

  if (loading) {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
            </div>
        </div>
       </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>

    <div className="min-h-screen bg-gray-50">
      <div className=" text-blue-900 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl text-center font-bold mb-2">
            {status.charAt(0).toUpperCase() + status.slice(1)} Events
          </h1>
          <p className="text-blue-900 text-lg text-center">
            Manage events with {status} status
          </p>
          <div className="mt-4 bg-blue-900 text-white text-center backdrop-blur-sm px-4 py-2 rounded-lg">
            Total Events: {events.length}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {status} events found
            </h3>
            <p className="text-gray-500">
              There are currently no events with {status} status.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 relative overflow-hidden">
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={event.images[0]}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(event.status)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-blue-900" />
                        <span className="text-sm text-gray-500">ID: {event.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-blue-900" />
                        <span className="text-sm text-gray-700 capitalize">{event.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-900" />
                      <span className="text-sm text-gray-700">{event.date}</span>
                      <Clock className="w-4 h-4 text-blue-900 ml-4" />
                      <span className="text-sm text-gray-700">{event.time}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-900" />
                      <span className="text-sm text-gray-700">{event.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-blue-900" />
                        <span className="text-sm text-gray-700">LKR {event.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-900" />
                        <span className="text-sm text-gray-700">{event.seats} seats</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-900" />
                      <span className="text-sm text-gray-700">
                        {event.organizerName} (ID: {event.organizerId})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-900" />
                      <span className="text-sm text-gray-500">
                        Posted: {event.postedDate}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    {renderActionButtons(event)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>

  );
}