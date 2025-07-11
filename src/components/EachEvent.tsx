import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getEventById } from "../services/EventService";


 const EachEvent = () => {

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
    }

    const {id} = useParams();

    const [event, setEvent] = useState<Event | null>(null);

    useEffect(()=>{
        const fetchEvent =async () => {
        if(id){
            const eventID = parseInt(id, 10);
            const data = await getEventById(eventID);
            setEvent(data);
        }
    };
    fetchEvent();
    },[id]);

    return(
        <div>
            <h2>this is a event and id is {id}</h2>
            <h2>name is {event?.name}</h2>
            <h2>category is {event?.category}</h2>
            <h2>price {event?.price}</h2>
            {event?.images?.map((img)=>(
                <img src={img} alt="" className="w-[100px]" />
            ))}

        </div>
    )
}

export default EachEvent;