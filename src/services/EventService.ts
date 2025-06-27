import api from './api';

export const getAllApprovedEvents = async () => {
    try{

        const response = await api.get('/getApprovedEvents');
        return response.data;

    }catch(e){
        console.error("Error fetching events : ", e);
        throw e;
    }
}