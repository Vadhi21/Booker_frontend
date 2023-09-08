import { useContext, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContextt } from "./userContextt";
export default function BookingWidget({place}){
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [numberOfGuests,setNumberOfGuests]=useState(1);
    const [name,setName]=useState('');
    const [phone,setPhone]=useState('');
    const [redirect,setRedirect]=useState('');
    const {user}=useContext(UserContextt);

    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    },[user]);
   
    let numberOfNights=0;
    if(checkIn && checkOut){
        numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    async function bookThisPlace(){
        
        const response=await axios.post('https://booker-qjtn.onrender.com/bookings',{
            checkIn,checkOut,numberOfGuests,name,phone,
            place:place._id,
            price:numberOfNights * place.price,
        });
        const bookingId=response.data._id;
        console.log(bookingId);
        setRedirect(`/account/bookings/${bookingId}`);
    }
    if(redirect){ //if the booking was made, redirect will be set and we have to get there
        return <Navigate to={redirect} />
    }
   
   
  
    return(
             <div>
             <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                    Price: {place.price} /per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4 ">
                            <label>Check in:</label>
                            <input type="date" value={checkIn} onChange={(ev)=>setCheckIn(ev.target.value)}/>
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check out:</label>
                            <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
                        </div>
                    </div>
                    <div className="py-3 px-4 border-t">
                            <label>Number of  Guests:</label>
                            <input type="number" value={numberOfGuests} onChange={ev=>setNumberOfGuests(ev.target.value)}/>
                    </div>
                    
                </div>
                {numberOfNights>0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input type="text" value={name} onChange={ev=>setName(ev.target.value)}/>
                        <label>Phone Number:</label>
                        <input type="tel" value={phone} onChange={ev=>setPhone(ev.target.value)}/>
                    </div>
                )}
                <button onClick={bookThisPlace} className="mt-4 primary">
                Book this place
                {numberOfNights>0 && (
                    <span> for  ${numberOfNights * place.price}</span>
                )}
                </button>
                </div>
        </div>
    )
}