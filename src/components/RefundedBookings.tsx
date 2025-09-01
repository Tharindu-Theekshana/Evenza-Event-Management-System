import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllRefundedBookingsOfEachUser } from "../services/Booking";

// TypeScript interfaces
interface Booking {
  bookingId: number;
  eventDate: string;
  eventId: number;
  eventName: string;
  eventTime: string;
  numberOfTickets: number;
  status: "refunded" | "refund requested" | "refund cancelled";
}

export default function RefundedBookings() {
  const customerId = Number(localStorage.getItem('userId'));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRefundedBookings = async () => {
      try {
        setLoading(true);
        const response = await getAllRefundedBookingsOfEachUser(customerId);
        setBookings(response);
        console.log(response);
      } catch (err) {
        setError('Failed to fetch refunded bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRefundedBookings();
  }, [customerId]);

  const getStatusBadge = (status: Booking['status']) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    
    switch (status) {
      case "refunded":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "refund requested":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "refund cancelled":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="bg-blue-900 py-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Refunded Bookings</h1>
            </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center h-64">
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
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="bg-blue-900 py-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Refunded Bookings</h1>
            </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 text-lg font-medium">{error}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
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
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-900 py-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">           
              <h1 className="text-3xl mt-5 text-center font-bold text-blue-900 mb-2 sm:mb-0">
                Refunded Bookings
              </h1>          
          </div>
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  No Refunded Bookings
                </h2>
                <p className="text-gray-500">
                  You don't have any refunded bookings at the moment.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div 
                  key={booking.bookingId} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.eventName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Booking ID: {booking.bookingId}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-4">
                        <span className={getStatusBadge(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Event Date</p>
                          <p className="text-sm text-gray-600">{formatDate(booking.eventDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Event Time</p>
                          <p className="text-sm text-gray-600">{formatTime(booking.eventTime)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tickets</p>
                          <p className="text-sm text-gray-600">{booking.numberOfTickets} {booking.numberOfTickets === 1 ? 'ticket' : 'tickets'}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Event ID</p>
                          <p className="text-sm text-gray-600">#{booking.eventId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                        Last updated: {new Date().toLocaleDateString()}
                      </div>
                      
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