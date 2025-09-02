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
};

export const createEvent = async (formData:any) => {
    try{

        const token = localStorage.getItem('token');

        const response = await api.post("/event/createEvent", formData, {
            headers: {
              'Authorization': `Bearer ${token}`,         
              'Content-Type': 'multipart/form-data',      
            }
          });

        return response.data;

    }catch(e){
        console.error("cant create profile : ",e);
        throw e;
    }
};

export const getEventsByStatus = async (status: string) => {
    try{

        const response = await api.get(`/event/getEventsByStatus`, {
            params : {
                status : status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant get events : ", e);
        throw e;
    }
};

export const updateEventStatus = async (id:number,status:string) => {
    try{
        const response = await api.put(`/event/updateStatus/${id}`,null, {
            params : {
                status : status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant update event status: ", e);
        throw e;
    }
};