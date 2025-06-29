import { useState } from 'react';
import {getAllApprovedEvents} from '../services/EventService';

const TrendingEvents = () => {

    const [events, setEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    


    return(
        <section></section>
    )
};

export default TrendingEvents;