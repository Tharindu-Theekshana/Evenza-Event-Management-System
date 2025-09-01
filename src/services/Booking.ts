import api from "./api";

export const getAllBookingsOfEachUser = async (id:number) => {
    try{
        const response = await api.get(`/booking/getAllBookingsOfUser/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get all bookings:", e);
        throw e;
    }
};

export const updateBookingStatus = async (bookingId:number,status:string) => {
    try{
        const response = await api.put(`/booking/updateBookingStatus/${bookingId}`,null, {
            params : {
                status : status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant update booking status: ", e);
        throw e;
    }
};

export const getAllRefundedBookingsOfEachUser = async (id:number) => {
    try{
        const response = await api.get(`/booking/getRefundedBookings/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get all bookings:", e);
        throw e;
    }
};