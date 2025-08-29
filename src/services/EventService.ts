import api from './api';

export const getAllApprovedEvents = async (status: string) => {
    try{

        const response = await api.get('/event/getEventsByStatus', {
            params : {
                status : status
            }
        });
        return response.data;

    }catch(e){
        console.error("Error fetching events : ", e);
        throw e;
    }
}

export const getEventById = async (id: number)=> {
    try{

        const response = await api.get(`event/getEventById/${id}`);
        return response.data;
    }catch(e){
        console.error("Error fetching each event : ", e);
        throw e;
    }
}

export const getAllEventsOfOrganizer = async (id:number) => {

    try{
        const response = await api.get(`/event/eventsOfOrganizer/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get all events: ",e);
        throw e;
    }
};

export const getEventsOfOrganizerByStatus = async (status: string,id:number) => {
    try{

        const response = await api.get(`/event/getOrganizerEventsByStatus/${id}`, {
            params : {
                status : status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant get events : ", e);
        throw e;
    }
}