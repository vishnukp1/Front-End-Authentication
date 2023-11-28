import React, { useEffect, useState } from 'react';
import HomeNav from './HomeNav';
import Footer from './Footer';
import SignUp from './SignUp'; 
import "../styles/Login.css"
import Login from './Login';
import { useSelector } from 'react-redux';
import "../styles/offerPedia.css"
import axios from 'axios';


function Home() {
  const signup = useSelector((state)=>state.login);
  const [token, setToken] = useState(null); 
  const [users, setUsers] = useState([]);
  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(signup);


  useEffect(() => {


    const fetchUsers = async () => {
      try {
        // Make the API request to get the list of users
        const response = await axios.get('https://authapidemo.pythonanywhere.com/api/v1/users/');
        // Update state with the fetched list of users
        setUsers(response.data);
      } catch (error) {
        // Handle errors by updating the error state
        setError(error);
      } finally {
        // Set loading state to false after the API request completes (whether it succeeded or failed)
        setLoading(false);
      }
    };

    
    fetchUsers();
  }, []); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token)
  
  },[token])
  
  return (
    <div  style={{ width:"100vw",height:"100vh"}}>
     <HomeNav />
      <div className='home-main'
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/abstract-elegant-green-waves-lines-black-background-best-smart-design-your-business_518299-870.jpg?w=1060')`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '95vh',
          display: 'flex', 
          justifyContent: "space-between"
        }}
      >
        <div className='home-text' style={{width: "50rem", marginLeft: "4rem", marginTop: "10rem"}}>
          <h2 className='home-h4-text' style={{color: "white", fontSize: "2.5rem"}}>Start selling online with Offerpedia!</h2>
          <br></br>
          <h4 className='home-h4-text' style={{color: "white"}}>Our website allows you to create an online store for free and save time with order notifications on WhatsApp.</h4>
        </div>
    
        <div className='home-login' style={{marginRight: "8rem"}}> 
          {signup ? <Login /> : <SignUp/> }
        </div> 
      </div>

      <Footer />
    </div>
  );
}

export default Home;
