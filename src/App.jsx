import './App.css'
// import AccountPage from './pages/AccountPage';
import {Route,Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContexttProvider } from './userContextt.jsx';
import PlacesFormPage from './pages/PlacesFormPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';
axios.defaults.baseURL= 'https://booker-qjtn.onrender.com';
// 'http://127.0.0.1:4000';
axios.defaults.withCredentials=true;

function App() {  
  return(
    <UserContexttProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<ProfilePage/>} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />}/>
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
     </UserContexttProvider>
    
  );
}
export default App;
