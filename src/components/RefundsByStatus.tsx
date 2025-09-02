import { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  Ticket, 
  User, 
  Hash, 
  CheckCircle, 
  XCircle,
  CreditCard,
  AlertCircle,
  FileText
} from "lucide-react";
import { getRefundBookingsByStatus, updateBookingStatus } from "../services/Booking";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

interface Refund {
  bookingId: number;
  eventDate: string;
  eventId: number;
  eventName: string;
  eventTime: string;
  numberOfTickets: number;
  refunded: boolean;
  status: string;
  userId: number;
}

export default function RefundsByStatus() {
  const location = useLocation();
  const status = location.state?.value;
  const [bookings, setBookings] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        setLoading(true);
         const res = await getRefundBookingsByStatus(status);
         setBookings(res);
        
      } catch (e) {
        console.error("error fetching refunds: ", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRefunds();
  }, [status]);

  const handleApprove = async (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.bookingId === bookingId 
        ? { ...booking, status: 'approved', refunded: true } 
        : booking
    ));
    const updatedStatus = "refund approved";
    const res = await updateBookingStatus(bookingId, updatedStatus);
    alert(res.message);
  };

  const handleCancel = async (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.bookingId === bookingId 
        ? { ...booking, status: 'cancelled', refunded: false } 
        : booking
    ));
    const updatedStatus = "refund cancelled";
    const res = await updateBookingStatus(bookingId, updatedStatus);
    alert(res.message);
  };

  const getStatusBadge = (status: string, refunded: boolean) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1";
    
    switch (status.toLowerCase()) {
      case 'approved':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case 'cancelled':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle className="w-4 h-4" />
            Cancelled
          </span>
        );
      case 'refund requested':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <AlertCircle className="w-4 h-4" />
            Requested
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            <FileText className="w-4 h-4" />
            {status}
          </span>
        );
    }
  };

  const getRefundBadge = (refunded: boolean) => {
    return refunded ? (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center gap-1">
        <CreditCard className="w-3 h-3" />
        Refunded
      </span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
        Not Refunded
      </span>
    );
  };

  const renderActionButtons = (booking: Refund) => {
    if (booking.status.toLowerCase() === 'refund requested') {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => handleApprove(booking.bookingId)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => handleCancel(booking.bookingId)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Cancel
          </button>
        </div>
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
          <p className="text-gray-600">Loading refunds...</p>
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
      <div className=" text-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl text-center font-bold mb-2 capitalize">
            {status} Refunds
          </h1>
          <p className="text-blue-900 text-center text-lg">
            Manage refund requests with {status} status
          </p>
          <div className="mt-4 bg-blue-900 text-white text-center backdrop-blur-sm px-4 py-2 rounded-lg ">
            Total Refunds: {bookings.length}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {status} refunds found
            </h3>
            <p className="text-gray-500">
              There are currently no refund requests with {status} status.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-blue-900 text-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold truncate">{booking.eventName}</h3>
                    {getStatusBadge(booking.status, booking.refunded)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100 text-sm">
                      Booking #{booking.bookingId}
                    </span>
                    {getRefundBadge(booking.refunded)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-blue-900" />
                      <div>
                        <span className="text-xs text-gray-500 block">Event ID</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {booking.eventId}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-900" />
                      <div>
                        <span className="text-xs text-gray-500 block">User ID</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {booking.userId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-900" />
                      <span className="text-sm text-gray-700">{booking.eventDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-900" />
                      <span className="text-sm text-gray-700">{booking.eventTime}</span>
                    </div>
                  </div>

                  {/* Tickets */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Ticket className="w-5 h-5 text-blue-900" />
                      <span className="text-lg font-bold text-blue-900">
                        {booking.numberOfTickets}
                      </span>
                      <span className="text-sm text-gray-600">
                        {booking.numberOfTickets === 1 ? 'Ticket' : 'Tickets'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {renderActionButtons(booking) && (
                    <div className="border-t pt-4">
                      {renderActionButtons(booking)}
                    </div>
                  )}
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