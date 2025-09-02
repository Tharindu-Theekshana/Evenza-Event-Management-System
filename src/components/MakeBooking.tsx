import React, { useState } from 'react';
import { 
  Ticket,
  Plus,
  Minus,
  CreditCard,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeBooking } from '../services/Booking';

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
  organizerName: string;
  images: string[];
}

const MakeBooking: React.FC = () => {


  const location = useLocation();
  const event = location.state?.event as Event;
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();

  const [numberOfTickets, setNumberOfTickets] = useState<number>(1);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');

  const maxTickets = Math.min(event.seats, 10); 
  const totalPrice = numberOfTickets * event.price;

  const handleIncrement = () => {
    if (numberOfTickets < maxTickets) {
      setNumberOfTickets(numberOfTickets + 1);
    }
  };

  const handleDecrement = () => {
    if (numberOfTickets > 1) {
      setNumberOfTickets(numberOfTickets - 1);
    }
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxTickets) {
      setNumberOfTickets(value);
    }
  };

  const handleBooking = async () => {
    setIsBooking(true);
    setBookingError('');
    
    try {
      const res = await makeBooking(userId,event.id,numberOfTickets);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(res.message); 

      setBookingSuccess(true);
      setIsBooking(false);
    } catch (error) {
      setBookingError('Booking failed. Please try again.');
      setIsBooking(false);
    }
  };

  if (bookingSuccess) {
    return (
      <>
      <Navbar/>
      <div className='py-10 bg-blue-900'></div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 text-center max-w-md w-full">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">
              Your booking for {numberOfTickets} {numberOfTickets === 1 ? 'ticket' : 'tickets'} has been confirmed.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">{event.name}</h3>
            <p className="text-sm text-blue-700">
              {event.date} at {event.time}
            </p>
            <p className="text-sm text-blue-700">{event.location}</p>
            <p className="text-lg font-bold text-blue-900 mt-2">
              Total: LKR {totalPrice.toLocaleString()}
            </p>
          </div>
          
          <button
            onClick={() => {navigate("/myBookings")}}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            View Booking Status
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className=" text-white md:px-0 px-3">
        <div className="mx-auto bg-blue-900 md:w-[435px] w-auto  shadow-lg rounded-xl md:mb-6 mb-5 px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="md:text-4xl text-3xl text-center font-bold mb-2 ">Book Your Tickets</h1>
          <p className="text-lg text-center">Secure your spot for this amazing event</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center">
          
          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ticket className="w-6 h-6 text-blue-900" />
              Select Number of Tickets
            </h3>

            {/* Ticket Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Number of Tickets (Max: {maxTickets})
              </label>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                  onClick={handleDecrement}
                  disabled={numberOfTickets <= 1}
                  className="w-12 h-12 bg-blue-900 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <input
                    type="number"
                    min="1"
                    max={maxTickets}
                    value={numberOfTickets}
                    onChange={handleTicketChange}
                    className="w-20 h-16 text-3xl font-bold text-center border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {numberOfTickets === 1 ? 'ticket' : 'tickets'}
                  </p>
                </div>
                
                <button
                  onClick={handleIncrement}
                  disabled={numberOfTickets >= maxTickets}
                  className="w-12 h-12 bg-blue-900 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {[1, 2, 4, 6].filter(num => num <= maxTickets).map(num => (
                  <button
                    key={num}
                    onClick={() => setNumberOfTickets(num)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      numberOfTickets === num
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num} {num === 1 ? 'ticket' : 'tickets'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Price per ticket:</span>
                <span className="text-gray-900 font-semibold">LKR {event.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Number of tickets:</span>
                <span className="text-gray-900 font-semibold">{numberOfTickets}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-900">
                  LKR {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {bookingError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{bookingError}</span>
              </div>
            )}

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={isBooking || numberOfTickets > maxTickets}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isBooking ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Book {numberOfTickets} {numberOfTickets === 1 ? 'Ticket' : 'Tickets'}
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Your booking will be confirmed instantly upon payment
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MakeBooking;