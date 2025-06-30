import { useEffect, useState } from 'react';
import {getAllApprovedEvents} from '../services/EventService';

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
    }

    const [events, setEvents] = useState<Event[]>([]);
    const [showAll, setShowAll] = useState(false);


    useEffect(()=>{
    
        const fetchEvents = async () => {
         try{

            const data = await getAllApprovedEvents();
            setEvents(data);

            }catch(e){
            console.error("failed to load events : ", e);
            }
        };
        fetchEvents();
    },[]);

    const visibleEvents = showAll ? events : events.slice(0,4);

    return(
        <section className=" bg-gradient-to-r from-white via-blue-50 to-white">
            <h2 className='text-3xl font-bold text-center text-blue-950 pt-7 pb-7'>Trending Events Right Now</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {visibleEvents.map((event) => (
                    <div key={event.id}>
                        {event.images?.map((img) => (
                            <img src={img} alt="" />
                            
                        ))}
                        <div>
                            <h3>{event.name}</h3>
                            <h2>{event.date}</h2>
                            <h2>{event.time}</h2>
                            <h2>{event.location}</h2>
                            <h2>{event.price}</h2>
                        </div>
                        
                    </div>
                    
                ))}
            </div>
        </section>
    )
};

export default TrendingEvents;