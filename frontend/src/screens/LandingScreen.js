import React, {useEffect} from 'react'
import {Container, Card} from 'react-bootstrap'
import {useSelector} from 'react-redux';

const LandingScreen = ({location, history}) => {

   const userLogin = useSelector((state) => state.userLogin);
   const { loading, error, userInfo } = userLogin;
   const redirect = location.search ? location.search.split('=')[1] : '/';
   useEffect(()=>{
      if(userInfo){
         history.push('/home')
      }
   },[history, userInfo, redirect])
   return <>
      
      <Container className="text-center">
         
         <h1>Print-Buddy</h1>
         <h3>Welcome! Login or register to continue.</h3>
      
      
      </Container>
   </>
}

export default LandingScreen