import api from './api';

export const getAllApprovedEvents = async () => {
    try{

        const response = await api.get('/event/getApprovedEvents');
        return response.data;

    }catch(e){
        console.error("Error fetching events : ", e);
        throw e;
    }
}

export const getEventById = async (id: number)=> {
    try{

        const response = await api.get(`/getEventById/${id}`);
        return response.data;
    }catch(e){
        console.error("Error fetching each event : ", e);
        throw e;
    }
}