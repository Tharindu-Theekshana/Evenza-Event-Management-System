import api from "./api";

export const getAllCustomers = async () => {
    try{
        const res = await api.get("/user/getAllCustomers");
        return res.data;

    }catch(e){
        console.error("cant get all customers: ",e);
        throw e;
    }
};

export const getAllOrganizers = async () => {
    try{
        const res = await api.get("/user/getAllOrganizers");
        return res.data;

    }catch(e){
        console.error("cant get all organizers: ",e);
        throw e;

    }
};