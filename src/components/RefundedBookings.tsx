import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllRefundedBookingsOfEachUser } from "../services/Booking";

export default function RefundedBookings() {

    const customerId = Number(localStorage.getItem('userId'));
    const [bookings,setBookings] = useState([]);

    useEffect(()=>{
        const fetchRefundedBookings = async () => {
            const response = await getAllRefundedBookingsOfEachUser(customerId);
            setBookings(response);
            console.log(response);
        };
        fetchRefundedBookings();
    },[customerId]);
  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>

    </>
  )
}
