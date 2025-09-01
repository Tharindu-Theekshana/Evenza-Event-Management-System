import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  Ticket, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
  Search
} from "lucide-react";
import { getAllBookingsOfEachUser, updateBookingStatus } from "../services/Booking";
import Navbar from "./Navbar";

interface Booking {
  bookingId: number;
  eventDate: string;
  eventId: number;
  eventName: string;
  eventTime: string;
  numberOfTickets: number;
  refunded: boolean;
  status: string;
}

interface BookingCardProps {
  booking: Booking;
  onRefundRequest: (bookingId: number) => void;
}

interface FilterState {
  status: string;
  refunded: string;
  searchTerm: string;
}

const MyBookings: React.FC = () => {
  const customerId = Number(localStorage.getItem('userId'));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    refunded: 'all',
    searchTerm: ''
  });

 

  useEffect(() => {
    const getAllBookings = async () => {
      try {
        setLoading(true);
        
        const response = await getAllBookingsOfEachUser(customerId);
 
        setTimeout(() => {
          setBookings(response);
          setLoading(false);
        }, 500);
        
      } catch (err) {
        setError("Failed to load bookings");
        setLoading(false);
      }
    };
    
    getAllBookings();
  }, []);

  const handleRefundRequest = async (bookingId: number) => {
    try {
      const status = "refund requested";
      console.log(`Requesting refund for booking ${bookingId}`);
      await updateBookingStatus(bookingId,status)
      setBookings(prev => 
        prev.map(booking => 
          booking.bookingId === bookingId 
            ? { ...booking, status: 'refund requested' }
            : booking
        )
      );
      
      alert('Refund request submitted successfully!');
    } catch (err) {
      alert('Failed to submit refund request. Please try again.');
    }
  };

  const getStatusIcon = (status: string, refunded: boolean) => {
    if (status.toLowerCase() === 'refunded' || refunded) return <RefreshCw className="h-4 w-4" />;
    
    switch (status.toLowerCase()) {
      case 'Not Refunded':
        return <CheckCircle className="h-4 w-4" />;
      case 'refund requested':
        return <Clock className="h-4 w-4" />;
      case 'refund cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string, refunded: boolean): string => {
    if (status.toLowerCase() === 'refunded' || refunded) return 'text-purple-600 bg-purple-50 border-purple-200';
    
    switch (status.toLowerCase()) {
      case 'Not Refunded':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'refund requested':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'refund cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'refunded':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filters.status === 'all' || booking.status === filters.status;
    const matchesRefunded = filters.refunded === 'all' || 
      (filters.refunded === 'refunded' && booking.refunded) ||
      (filters.refunded === 'not refunded' && !booking.refunded);
    const matchesSearch = booking.eventName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      booking.bookingId.toString().includes(filters.searchTerm);
    
    return matchesStatus && matchesRefunded && matchesSearch;
  });

  const BookingCard: React.FC<BookingCardProps> = ({ booking, onRefundRequest }) => {
    const canRequestRefund = !booking.refunded && 
      booking.status !== 'cancelled' && 
      booking.status !== 'refund requested' &&
      new Date(booking.eventDate) > new Date();

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-900 mb-1">{booking.eventName}</h3>
            <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(booking.status, booking.refunded)}`}>
            {getStatusIcon(booking.status, booking.refunded)}
            <span className="ml-1 capitalize">
              {booking.refunded ? 'Refunded' : booking.status === 'refunded' ? 'Refunded' : booking.status}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-900" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium">{new Date(booking.eventDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-blue-900" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-medium">{booking.eventTime}</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Ticket className="h-4 w-4 mr-2 text-blue-900" />
            <div>
              <p className="text-xs text-gray-500">Tickets</p>
              <p className="font-medium">{booking.numberOfTickets} ticket{booking.numberOfTickets > 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          
          
          {canRequestRefund && (
            <button 
              onClick={() => onRefundRequest(booking.bookingId)}
              className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm font-medium"
            >
              Apply for Refund
            </button>
          )}
          
          {booking.status=="refunded" && (
            <div className="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium text-center border border-green-200">
              Refund Processed
            </div>
          )}
          
          {booking.status === 'refund requested' && (
            <div className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium text-center border border-blue-200">
              Refund Pending
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50">
            <div className="py-10 bg-blue-900"></div>
            <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
            </div>
        </div>
       </>
    );
  }

  if (error) {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50">
            <div className="py-10 bg-blue-900"></div>
            <div className="container mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Bookings</h3>
                <p className="text-red-600">{error}</p>
                <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                Try Again
                </button>
            </div>
            </div>
        </div>
        </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="py-10 bg-blue-900"></div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your event tickets and bookings</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <select
              value={filters.refunded}
              onChange={(e) => setFilters(prev => ({ ...prev, refunded: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Refunds</option>
              <option value="refunded">Refunded</option>
              <option value="not_refunded">Not Refunded</option>
            </select>
            
            <button
              onClick={() => setFilters({ status: 'all', refunded: 'all', searchTerm: '' })}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-900">{bookings.length}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <Ticket className="h-5 w-5 text-blue-900" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Tickets</p>
                <p className="text-2xl font-bold text-blue-900">
                  {bookings.reduce((sum, booking) => sum + booking.numberOfTickets, 0)}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Refunded</p>
                <p className="text-2xl font-bold text-blue-900">
                  {bookings.filter(booking => booking.refunded).length}
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3">
                <RefreshCw className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Upcoming</p>
                <p className="text-2xl font-bold text-blue-900">
                  {bookings.filter(booking => new Date(booking.eventDate) > new Date()).length}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking: Booking) => (
              <BookingCard 
                key={booking.bookingId} 
                booking={booking} 
                onRefundRequest={handleRefundRequest}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {filters.searchTerm || filters.status !== 'all' || filters.refunded !== 'all' 
                  ? 'Try adjusting your filters to see more results.'
                  : 'You haven\'t made any bookings yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default MyBookings;