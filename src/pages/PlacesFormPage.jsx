import { Link, useParams } from "react-router-dom";
import {UserContextt} from "../userContextt";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
export default function PlacesFormPage(){

    const {id} =useParams();
    console.log(id);
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);
    const [price,setPrice]=useState(100);
    const [redirect,setRedirect]=useState(false);

    useEffect(()=>{
        if(!id){return;}
        axios.get('https://booker-qjtn.onrender.com/places/'+id).then(response=>{ //for editing the place
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    },[id]); //only depenedency is id


    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header,description){
        return(
           <>
             {inputHeader(header)}
             {inputDescription(description)}
           </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData={title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests};
        
        if(id){ //its an update we would have come by the place id and it wont exist
            await axios.put('https://booker-qjtn.onrender.com/places',{
                id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price});
            setRedirect(true);
        }
        else{ //adding a new place
            await axios.post('https://booker-qjtn.onrender.com/places',{
                title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
            });
            setRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to={'/account/places'} />
    }
    
    return(
        <>
            <AccountNav />
            <div>
               <form onSubmit={savePlace}>
                    {preInput('Title','Title for your place. should be short and classy as in advertisement')}
                    <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)}
                     placeholder="title,for example:my wonderful place!"/>
                    {preInput('Address','Address to your place')}   
                    <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)}
                    placeholder="address"/>
                    {preInput('Photos','more=better')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    {preInput('Description','description of the place')}
                    <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
                    {preInput('Perks','select all the perks at your place')}
                    <Perks selected={perks} onChange={setPerks}/>
                    {preInput('Extra Info','house rules,etc')}
                    <textarea  value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />

                    {preInput('Check in&out times, max guests','add check in and remember to have some time window for cleaning the room before the guests arrive!')}
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder="14" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input type="text"  value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder="11" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input type="number"  value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Price Per Night</h3>
                            <input type="number"  value={price} onChange={ev=>setPrice(ev.target.value)}/>
                        </div>
                    </div>
                    <button className="primary my-4">Save</button>
               </form>  
             </div>  
        </>
    )
}