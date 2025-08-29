import { useEffect, useState } from 'react';
import {getAllApprovedEvents} from '../services/EventService';
import { ArrowRight, Calendar, Clock, MapPin, Tag } from 'lucide-react';
import  EachEvent  from './EachEvent';
import { useNavigate } from 'react-router-dom';


const TrendingEvents = () => {

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
    }

    const [events, setEvents] = useState<Event[]>([]);
    const [showAll, setShowAll] = useState(false);


    useEffect(()=>{
    
        const fetchEvents = async () => {
         try{

            const status = "approved";

            const data = await getAllApprovedEvents(status);
            setEvents(data);

            }catch(e){
            console.error("failed to load events : ", e);
            }
        };
        fetchEvents();
    },[]);

    const visibleEvents = showAll ? events : events.slice(0,4);

    const formatTime = (timeStr: string | undefined) => {
        if (!timeStr) return 'Still not mentioned';
        
        const timeWithDate = `2025-01-01T${timeStr}`;
        const date = new Date(timeWithDate);
        
        return isNaN(date.getTime()) 
            ? 'Still not mentioned'
            : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const navigate = useNavigate();

    const handleClick = (id:number) => {
        navigate(`/eachEvent/${id}`)
    }

    

    return(
        <section id='events' className=" bg-gray-50 ">
            <h2 className='text-3xl md:text-4xl font-bold text-center text-blue-950 pt-7 pb-7'>Trending Events Right Now</h2>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto '>
                {visibleEvents.map((event) => (
                    <div key={event.id} onClick={ () => handleClick(Number(event.id))} className='shadow-lg mx-5 rounded-2xl bg-gray-50 hover:scale-101 duration-300'>
                        {event.images?.map((img) => (
                            <img src={img} alt="" className=' w-[100%] h-100 object-cover rounded-t-2xl' />
                            
                        ))}
                        <div className='px-4 py-4'>
                            <div className='font-bold text-[19px] text-blue-950 uppercase'>{event.name}</div>
                            <div className='pt-1 flex items-center gap-3 text-blue-800 font-medium'><Calendar className="h-4 w-4 text-blue-900" /><span>{event.date? new Date(event.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year: 'numeric'}) : 'Still not mentioned'}</span></div>
                            <div className='flex items-center gap-3 text-blue-800 font-medium'><Clock className="h-4 w-4 text-blue-900" /><span>{formatTime(event.time)}</span></div>
                            <div className='flex items-center gap-3 text-[17px] text-gray-800 font-semibold'><MapPin className="h-4 w-4 text-blue-900" /><span>{event.location}</span></div>
                            <div className='flex items-center gap-3 text-gray-600'><Tag className="h-4 w-4 text-gray-500" /><span>{event.category}</span></div>
                            <span className='text-[12px] text-gray-700 font-bold'>{event.price} LKR </span><span className='text-[12px] text-gray-600'>Upwards</span>
                        </div>
                        
                    </div>
                    
                ))}
            </div>
            {!showAll && events.length > 4 && (
                <div className='text-center py-10'>
                    <button className='bg-blue-900 rounded-3xl text-white text-[17px] px-15 py-3 hover:bg-blue-950 duration-300' onClick={()=> setShowAll(true) }>View All Events</button>
                </div>
            )}
        </section>
    )
};

export default TrendingEvents;