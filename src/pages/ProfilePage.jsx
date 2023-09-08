import '../index.css';
import axios from "axios";
import {useContext,useState} from "react";
import { Link,Navigate,useParams } from "react-router-dom";
import {UserContextt} from "../userContextt";
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';
export default function AccountPage(){
    const {user,ready,setUser,setReady}=useContext(UserContextt);
    const [redirect,setRedirect]=useState(null);
    
    let {subpage}=useParams();  
    if(subpage===undefined){
        subpage='profile'; //default is profile now
    }
    console.log(subpage);
    
    async function logout(){
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }
    
    if(!ready){
        return 'Loading....';
    }
    if( ready && !user && !redirect){ //incase of logout redirect will be true so we will get to index page. otherwise login.
        return <Navigate to={'/login'} />
    }


    
    if(redirect){
        return <Navigate to={redirect}></Navigate>
    }


    return(
        <div>
            <AccountNav />
            { subpage==='profile' && (
                <div className="text-center max-w-lg mx-auto">
                  Logged in as {user.name} ({user.email}) <br />
                  <button onClick={logout} className="primary max-w-sm mt-2" >LogOut</button><br/>
                </div>
            )}

            { subpage==='places' && (
                <PlacesPage />
            )}
        </div>
    );
}