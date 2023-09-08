import {createContext,useState,useEffect} from "react";
import axios from "axios";
export const UserContextt=createContext({});
export function UserContexttProvider({children}){
    const [user,setUser]=useState(null);
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        if(!user){
            axios.get('https://booker-qjtn.onrender.com/profile').then(({data})=>{
                setUser(data);
                setReady(true);
            });
        }
    },[]);
    return(
        <UserContextt.Provider value={{user,setUser,ready}}>
        {children}
        </UserContextt.Provider>
    );
}