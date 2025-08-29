import { useEffect, useState } from "react"
import { getAllEventsOfOrganizer } from "../services/EventService";
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    DollarSign,
    Eye,
    Filter,
    Search,
    Tag
  } from 'lucide-react';
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

export default function TotalEvents() {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const organizerId = Number(localStorage.getItem('userId'));
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(()=>{
        const fetchAllEventsOfOrganizer = async () => {
            try{
                const response = await getAllEventsOfOrganizer(organizerId);
                setEvents(response);
                console.log(response);
            }catch(e){
                console.error("error in fetching all events: ",e);
            }

        };
        fetchAllEventsOfOrganizer();
    },[organizerId]);

    const getStatusColor = (status: string): string => {
        switch (status) {
          case 'approved':
            return 'bg-green-100 text-green-800';
          case 'pending':
            return 'bg-yellow-100 text-yellow-800';
          case 'declined':
            return 'bg-red-100 text-red-800';
          default:
            return 'bg-gray-100 text-gray-800';
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
    
      const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
        
        return matchesSearch && matchesFilter;
      });
    
      const handleViewEvent = (event: Event): void => {
        console.log('Viewing event:', event.name);
        // Add your navigation logic here
        // For example: router.push(`/events/${event.id}`)
      };
    
      return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 md:pt-20 pt-18">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-2">All Events</h1>
            <p className="text-gray-600 md:text-lg text-center">Manage and view all your events</p>
          </div>
    
          {/* Filters and Search */}
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by name, location, or category..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
    
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
          </div>
    
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleViewEvent(event)}
              >
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-700">
                  {event.images.length > 0 ? (
                    <img
                      src={event.images[0]}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)} backdrop-blur-sm`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                </div>
    
                {/* Event Header */}
                <div className="p-6 pb-4">
                  <h3 className="text-xl font-semibold text-blue-900 truncate mb-2">{event.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 capitalize">{event.category}</span>
                  </div>
                </div>
    
                {/* Event Details */}
                <div className="px-6 pb-4 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-4 w-4 text-blue-900" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-4 w-4 text-blue-900" />
                    <span className="text-sm">{formatTime(event.time)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-900" />
                    <span className="text-sm truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-blue-900" />
                      <span className="text-sm">{event.seats} seats</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-900" />
                      <span className="text-sm font-semibold text-blue-900">${event.price}</span>
                    </div>
                  </div>
                </div>
    
                {/* View Button */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">View Bookings</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
    
          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
    
          {/* Event Count */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </div>
        </div>
        </>
      );
}
