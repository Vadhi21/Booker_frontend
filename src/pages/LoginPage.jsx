import { Link,Navigate } from "react-router-dom"
import { useContext,useState } from "react";
import axios from "axios";
import { UserContextt } from "../userContextt";




export default function LoginPage(){
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser}=useContext(UserContextt);
 
  async function loginUser(ev){
    ev.preventDefault();
    try{
      const response = await axios.post('http://localhost:4000/login',
      {email,password},{withCredentials:true},{headers: {'Content-Type': 'application/json'}});
        alert('Login Successful!');
        setUser(response.data);
        setRedirect(true);
    }catch(e){
        alert('Login failed.Please try again!');
    }
}
  if(redirect){
    return <Navigate to={'/'} />
  }
   return(
     <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={loginUser}>
                  <input type="email" placeholder="your@email.com" 
                         value={email} 
                         onChange={ev=>setEmail(ev.target.value)} />
                  <input type="password" placeholder="password" 
                         value={password} 
                         onChange={ev=>setPassword(ev.target.value)} />
                  <button className="primary">Login</button>
                  <div className="text-center py-2 text-gray-500">
                     Dont have an account yet? <Link className="underline text-black" to={'/register'}>Register Now</Link>
                  </div>
            </form>
        </div>
     </div>
   )
}