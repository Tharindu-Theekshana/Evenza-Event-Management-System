import Navbar from "./Navbar";
import {
    Ticket,
    RefreshCw,
    Settings,
    User,
    Bell,
    ChevronRight
  } from 'lucide-react';
import { useNavigate } from "react-router-dom";

  const CustomerDashboard: React.FC = () => {
    
    const name = localStorage.getItem('name');
    const navigate = useNavigate();
  
    const navigateTo = (page: string) => {
      navigate(page);
    };
  
    const dashboardCards = [
      {
        id: 'bookings',
        title: 'My Bookings',
        description: 'View and manage your event bookings',
        icon: Ticket,
        count: 5,
        color: 'bg-blue-50 text-blue-900',
        onClick: () => navigateTo('/myBookings')
      },
      {
        id: 'refunded',
        title: 'Refunded Bookings',
        description: 'View your refunded event bookings',
        icon: RefreshCw,
        count: 2,
        color: 'bg-green-50 text-green-900',
        onClick: () => navigateTo('/refundedBookings')
      },
      {
        id: 'settings',
        title: 'Settings',
        description: 'Manage your account and preferences',
        icon: Settings,
        count: null,
        color: 'bg-purple-50 text-purple-900',
        onClick: () => navigateTo('/settings')
      }
    ];
  
    return (
        <>
        <Navbar/>
        <div className='py-10 bg-blue-900'></div>
      <div className="min-h-screen bg-gray-50">
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-full mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-3">
              Welcome back, <span className="text-blue-600">{name}!</span>
            </h1>
            <p className="text-lg text-blue-700/70 max-w-2xl mx-auto">
              Manage your bookings and account settings
            </p>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-900 mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dashboardCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={card.onClick}
                    className="bg-white rounded-xl shadow-sm border border-blue-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-xl ${card.color}`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-6">{card.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-blue-900 font-medium hover:text-blue-700 transition-colors">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigateTo('/')}
                className="flex items-center justify-center gap-3 p-6 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                <Ticket className="h-5 w-5" />
                Browse Events
              </button>
              
              <button
                onClick={() => navigateTo('/settings')}
                className="flex items-center justify-center gap-3 p-6 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <User className="h-5 w-5" />
                My Account
              </button>
              
              <button
                onClick={() => navigateTo('/contact')}
                className="flex items-center justify-center gap-3 p-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
                Get Support
              </button>
            </div>
          </div>
          </div>
      </div>
      </>
    );
  };
  
  export default CustomerDashboard;
