import { useEffect, useState } from "react"
import { getAllCustomers } from "../services/UserService";
import Navbar from "./Navbar";

export default function AllCustomers() {

    const [customers,setCustomers] = useState([]);

    useEffect(()=>{
        try{
            const fetchUsers = async () => {

                const response = await getAllCustomers();
                setCustomers(response);
                console.log(response);

            };
            fetchUsers();
        }catch(e){
            console.error("error in fetching users: ",e);
        }
    },[]);

  return (
    <>
    <Navbar/>
    <div className='py-10 bg-blue-900'></div>
    </>
  )
}
