import { FC } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  LucideIcon,
  User
} from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  icon: LucideIcon;
  value: string;
}



const OrganizerDashboard: FC = () => {
  const name = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleClick = (value:any) => {

    if(value == "total"){
        navigate("/totalEvents");
    }else{
        navigate("/eventsByStatus", {state: {value}})
    }
}

const StatCard: FC<StatCardProps> = ({ title,value, icon: Icon }) => (
  <div onClick={()=> handleClick(value)} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm md:text-lg font-medium text-blue-950 mb-1">{title}</p>
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <Icon className="h-6 w-6 text-blue-900" />
      </div>
    </div>
  </div>
);

  return (
    <>
      <Navbar />
      <div className='py-10 bg-blue-900'></div>
      <div className="min-h-screen pt-5 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-3">
              Welcome back, <span className="text-blue-600">{name}</span>
            </h1>
            <p className="text-lg text-blue-700/70 max-w-2xl mx-auto">
              Manage your events and account settings from your personal dashboard
            </p>
          </div>

          <main>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Events" value='total' icon={Calendar} />
                <StatCard title="Pending" value='pending' icon={Clock} />
                <StatCard title="Approved" value='approved' icon={CheckCircle} />
                <StatCard title="Declined" value='declined' icon={XCircle} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={()=> {navigate("/createEvent")}}
                    className="flex items-center justify-center p-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Event
                  </button>
                  <button
                    onClick={()=> {navigate("/settings")}}
                    className="flex items-center justify-center p-4 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrganizerDashboard;
