import { useEffect, useState } from 'react';
import {getAllApprovedEvents} from '../services/EventService';

const TrendingEvents = () => {

    const [events, setEvents] = useState([]);
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
        <section></section>
    )
};

export default TrendingEvents;