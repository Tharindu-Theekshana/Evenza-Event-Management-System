import React from 'react';
import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  CreditCard, 
  RefreshCw, 
  X,
  Settings,
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

interface AdminOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}



const AdminDashboard: React.FC = () => {

    const navigate = useNavigate();
  const adminOptions: AdminOption[] = [
    {
      id: '/createAdmin',
      title: 'Create Admin Account',
      description: 'Add new administrators to the system',
      icon: UserPlus,
      color: 'text-blue-900',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200'
    },
    {
      id: '/allCustomers',
      title: 'All Customers',
      description: 'View and manage customer accounts',
      icon: Users,
      count: "Click to access",
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200'
    },
    {
      id: '/allOrganizers',
      title: 'All Organizers',
      description: 'Manage event organizer accounts',
      icon: Users,
      count: "Click to access",
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-100',
      hoverColor: 'hover:bg-indigo-200'
    },
    {
      id: 'pending-events',
      title: 'Pending Events',
      description: 'Events awaiting approval',
      icon: Clock,
      count: "Click to access",
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200'
    },
    {
      id: 'approved-events',
      title: 'Approved Events',
      description: 'Successfully approved events',
      icon: CheckCircle,
      count: "Click to access",
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:bg-green-200'
    },
    {
      id: 'declined-events',
      title: 'Declined Events',
      description: 'Events that were rejected',
      icon: XCircle,
      count: "Click to access",
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      hoverColor: 'hover:bg-red-200'
    },
    {
      id: 'refund-requested',
      title: 'Refund Requested Tickets',
      description: 'Pending refund requests',
      icon: CreditCard,
      count: "Click to access",
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      hoverColor: 'hover:bg-yellow-200'
    },
    {
      id: 'refunded-tickets',
      title: 'Refunded Tickets',
      description: 'Successfully processed refunds',
      icon: RefreshCw,
      count: "Click to access",
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      hoverColor: 'hover:bg-emerald-200'
    },
    {
      id: 'refund-cancelled',
      title: 'Refund Cancelled Tickets',
      description: 'Cancelled refund requests',
      icon: X,
      count: "Click to access",
      color: 'text-rose-700',
      bgColor: 'bg-rose-100',
      hoverColor: 'hover:bg-rose-200'
    }
  ];

 
  const handleOptionClick = (optionId: string): void => {
    navigate(optionId);
  };

  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>
    <div className="min-h-screen bg-gray-50">
      <div className="md:px-25 ">
        
        <div className="p-6">
         
          <div className="mb-8">
            <h2 className="text-3xl text-center font-bold text-gray-900 mb-2">Administration Center</h2>
            <p className="text-gray-600 text-center text-lg">Manage all aspects of your platform from this central dashboard</p>
          </div>

          {/* Admin options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-1 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${option.bgColor} rounded-lg flex items-center justify-center transition-colors ${option.hoverColor} group-hover:scale-110 transform duration-200`}>
                    <option.icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {option.count !== undefined ? `${option.count} items` : 'Click to access'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-lg py-1 shadow-sm mb-5 border hover:shadow-md duration-200 hover:border-blue-300 hover:-translate-y-1 border-gray-200">
            <button
                    onClick={()=> {navigate("/settings")}}
                    className="flex items-center justify-center w-full p-4 text-lg text-blue-900 rounded-lg transition-colors duration-200"
                  >
                    <Settings className="h-6 w-6 mr-2" />
                    Settings
                </button>
             </div>
          </div>

         
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;