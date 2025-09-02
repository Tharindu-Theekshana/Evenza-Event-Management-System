import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getEventById } from "../services/EventService";
import { Calendar, Clock, MapPin, User, Tag, Users, DollarSign } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";


 const EachEvent = () => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('userRole');
    const navigate = useNavigate();

    interface Event{
        id: string | number;
        images? : string[];
        name?: string;
        description?: string;
        date?: string;
        time?: string;
        location?: string;
        price?: number;
        category?: string;
        postedDate?: string;
        seats?: number;
        status?: string;
        organizerName?: string;
    }

    const {id} = useParams();

    const [event, setEvent] = useState<Event | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(()=>{
        const fetchEvent =async () => {
        if(id){
            const eventID = parseInt(id, 10);
            const data = await getEventById(eventID);
            setEvent(data);
            console.log(data)
        }
    };
    fetchEvent();
    },[id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleBook = (event: Event) => {
        if(isLoggedIn && role == "customer"){
            navigate("/makeBooking", {state: {event}});
  
          }else{
            alert("Login as a customer to book ticket!");
          }
    }

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (!event) {
        return (
            <>
            <Navbar/>
            <div className='py-10 bg-blue-900'></div>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
            <Footer/>
            </>
        );
    }

    return (
        <>
        <Navbar/>
        <div className='py-10 bg-blue-900'></div>
        <div className="min-h-screen bg-gray-50">
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
            {event.images && event.images.length > 0 && (
                <>
                    {/* Main Image Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img
                            src={event.images[selectedImage]}
                            alt={event.name}
                            className="max-w-full max-h-full object-contain z-10 relative"
                        />
                    </div>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 ">
                        <div 
                            className="w-full h-full"
                            style={{
                                backgroundImage: `url(${event.images[selectedImage]})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'repeat',
                             
                            }}
                        ></div>
                    </div>
                </>
            )}
                
                

                {/* Image Navigation */}
                {event.images && event.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex space-x-2 bg-black/50 rounded-lg p-2">
                            {event.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                                        selectedImage === index
                                            ? 'border-white scale-110'
                                            : 'border-gray-400 hover:border-white'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${event.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Event Details */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-8 text-center">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{event.name}</h1>
                                <p className="text-xl text-gray-600 mb-6">{event.description}</p>
                                
                                {/* Quick Event Info Bar */}
                                <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base bg-blue-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center space-x-2 text-blue-900">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-semibold">{formatDate(event.date!)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-blue-900">
                                        <Clock className="w-5 h-5" />
                                        <span className="font-semibold">{formatTime(event.time!)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-blue-900">
                                        <MapPin className="w-5 h-5" />
                                        <span className="font-semibold">{event.location}</span>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="text-blue-900 w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatDate(event.date!)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="text-blue-900 w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatTime(event.time!)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <MapPin className="text-blue-900 w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-semibold text-gray-900">{event.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Tag className="text-blue-900 w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Category</p>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-900 capitalize">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <User className="text-blue-900 w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Organizer</p>
                                        <p className="font-semibold text-gray-900 capitalize">{event.organizerName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Users className="text-blue-900 w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Available Seats</p>
                                        <p className="font-semibold text-gray-900">{event.seats} seats</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Booking Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-18">
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-900">{event.price}</span>
                                    <span className="text-gray-500">LKR</span>
                                </div>
                                <p className="text-gray-600">per ticket</p>
                            </div>

                            <button 
                             onClick={()=> handleBook(event)}
                             className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 mb-4 text-lg">
                                Book Now
                            </button>

                            <div className="text-center text-sm text-gray-500">
                                <p>✓ Instant confirmation</p>
                                <p>✓ Mobile tickets accepted</p>
                                <p>✓ Free cancellation up to 24h</p>
                            </div>
                        </div>

                        {/* Event Info Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Event ID</span>
                                    <span className="font-medium">#{event.id}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Posted</span>
                                    <span className="font-medium">
                                        {new Date(event.postedDate!).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default EachEvent;