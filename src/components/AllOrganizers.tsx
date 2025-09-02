import { useEffect, useState } from "react"
import { getAllOrganizers } from "../services/UserService";
import Navbar from "./Navbar";
import { Trash2, User, Mail, Hash, Shield } from 'lucide-react';

interface Organizer {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AllOrganizers() {

    const [organizers,setOrganizers] = useState<Organizer[]>([]);

    useEffect(()=>{
        try{
            const fetchUsers = async () => {

                const response = await getAllOrganizers();
                setOrganizers(response);

            };
            fetchUsers();
        }catch(e){
            console.error("error in fetching users: ",e);
        }
    },[]);

    const handleDelete = (organizerId: number) => {
      setOrganizers(organizers.filter(organizer => organizer.id !== organizerId));
      };
    
      const handleDeleteConfirm = (organizerId: number, organizerName: string) => {
        if (window.confirm(`Are you sure you want to delete organizer "${organizerName}"?`)) {
          handleDelete(organizerId);
        }
      };

  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">Organizer Management</h1>
          <p className="text-gray-600 text-center">Manage your organizer database</p>
          <div className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-center">
            Total Organizers: {organizers.length}
          </div>
        </div>

        {/* Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {organizers.map((organizer) => (
            <div
              key={organizer.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-blue-900 text-white p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="font-semibold text-lg">{organizer.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteConfirm(organizer.id, organizer.name)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200 hover:scale-105"
                    title="Delete Customer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* ID */}
                <div className="flex items-center space-x-3">
                  <Hash className="w-4 h-4 text-blue-900" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">ID</span>
                    <p className="text-gray-800 font-semibold">{organizer.id}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-900" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-500">Email</span>
                    <p className="text-gray-800 truncate font-medium">{organizer.email}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-blue-900" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Role</span>
                    <p className="text-blue-900 font-semibold capitalize">{organizer.role}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 pb-4">
                <div className="border-t pt-3">
                  <span className="text-xs text-gray-400">organizer since 2024</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {organizers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Organizers found</h3>
            <p className="text-gray-500">All organizers have been removed.</p>
          </div>
        )}

       
      </div>
    </div>
    </>
  )
}
