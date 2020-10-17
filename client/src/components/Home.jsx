import React,{useState} from "react";
import App from "./App";
import Login from "./Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Signup from "./SignUp";

function Home(){

    const initialState={
        userName:"",
        password:"",
        confirmPassword:"",
        email:"",
        userNameError:"",
        passwordError:"",
        confirmPasswordError:"",
        emailError:"",
        dataSet:[]
    }

    const [userDetails,setDetails]=useState(initialState)

    function getUserName(data){
        setDetails(data)
    }

    return(
       
       <Router>
       <div>
       <Switch>
       <Route path="/" exact component={Signup} />
       <Route path="/login" >
        <Login  state={true} sendData={getUserName} />
       </Route>  
       <Route path="/register">
           <Login state={false} sendData={getUserName} />
       </Route>
       <Route path="/notes">
        <App userDetails={userDetails} />
       </Route>
       </Switch>
       </div>
        </Router>
       

    );
}


export default Home;