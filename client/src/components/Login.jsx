import React,{useEffect, useState} from "react";
import Input from "./Input";
import Header from "./Header";
import {useHistory,Link} from "react-router-dom";
import axios from "axios";


export default function Login(props){
    //to check whether a user wants to login or register
    const [state,setState]=useState(props.state);
    const history=useHistory();

    const initialState={
        userName:"",
        password:"",
        confirmPassword:"",
        email:"",
        userNameError:"",
        passwordError:"",
        confirmPasswordError:"",
        emailError:"",
        dataSet:[] //stores data fetched from mongoDB
    }

    const [userDetails,setDetails]=useState(initialState);

    useEffect(() =>{
        axios.get("/getdata")
        .then(response =>{
            setDetails(prevValue =>{
                return{
                    ...prevValue,
                    dataSet:response.data //stores all the data stored in db
                }
            })
        })
        .catch(err =>{
            console.log(err);
        })
    },[state]);
   
    //function change the state depending on whether the user clicked on the register button. 
    function changeState(){
        setState(prevValue =>
            !prevValue
        );
        setDetails(initialState);
    }

   

    function handleChange(event){
        const {name,value}=event.target;
        setDetails(prevValue =>{
            return{
                ...prevValue,
                [name]:value
            }
        })
    }

    function validate(){
        let userNameError=true;
        let passwordError=true;
        let confirmPasswordError=true;
        let emailError=true;
        let userNameExist=false;
        let passwordMatch=false;
        let emailExist=false;

        //to remove error everytime the user tries to login or register
        setDetails(prevValue =>{
            return{
            ...prevValue,
            userNameError:"",
            passwordError:"",
            confirmPasswordError:"",
            emailError:""
            }
        });

        //to check whether or user exists already 
        userDetails.dataSet.forEach((item) =>{
            if(item.userName===userDetails.userName){
                userNameExist=true;
                if(item.password===userDetails.password){
                    passwordMatch=true;
                }
            }
            if(item.email===userDetails.email){
                emailExist=true;
            }
        });

        
        console.log(userNameExist);
        console.log(passwordMatch);
        console.log(emailExist);

        //checking the errors in the login or registration form
        

        //check errors if user is in login page
        if(state){
            if(!userNameExist){
                userNameError=false
                setDetails(prevValue => {
                    return{
                        ...prevValue,
                        userNameError:"Username does not exist"
                    }
                })
            }
            if(userNameExist && !passwordMatch){
                passwordError=false
                setDetails(prevValue => {
                    return{
                        ...prevValue,
                        passwordError:"Wrong Password"
                    }
                })
            }
            if(userDetails.userName.length < 4){
                userNameError=false;
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        userNameError:"Username must contain atleast 4 characters"
                    }
                })
            }
    
            if(userDetails.password.length < 8){
                passwordError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        passwordError:"Password must contain atleast 8 characters"
                    }
                })
            }
    
            if(userDetails.userName===userDetails.password){
                passwordError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        passwordError:"Password cannot be username"
                    }
                })
            }
            
        }

        //check errors when user is on register page
        if(state===false){
            if(userNameExist){
                userNameError=false
                setDetails(prevValue => {
                    return{
                        ...prevValue,
                        userNameError:"UserName already taken"
                    }
                })
            }
            if(userDetails.confirmPassword!==userDetails.password){
                confirmPasswordError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        confirmPasswordError:"Password does not match"
                    }
                })
            }
            if(userDetails.confirmPassword.length===0){
                confirmPasswordError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        confirmPasswordError:"Confirm your password"
                    }
                })
            }
            if(emailExist){
                emailError=false
                setDetails(prevValue => {
                    return{...prevValue,
                    emailError:"Email already registered"
                    }
                })
            }
            if(userDetails.email.length===0){
                emailError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        emailError:"Enter your email"
                    }
                })
            }

            if(userDetails.userName.length < 4){
                userNameError=false;
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        userNameError:"Username must contain atleast 4 characters"
                    }
                })
            }
    
            if(userDetails.password.length < 8){
                passwordError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        passwordError:"Password must contain atleast 8 characters"
                    }
                })
            }
    
            if(userDetails.userName===userDetails.password){
                passwordError=false
                setDetails(prevValue =>{
                    return{
                        ...prevValue,
                        passwordError:"Password cannot be username"
                    }
                })
            }

        }

        if(state){
            if(userNameError && passwordError)
                return true;
            
        }

        if(!state){
            if(userNameError && passwordError && emailError && confirmPasswordError)
                return true;
        }
        return false;
    }
     
    const navigateTo=()=> history.push("/notes");

   //on form submission check for errors and if a user is a valid or not
    function validateUser(event){
        event.preventDefault();
        
        if(validate()){
            setDetails(initialState);
            props.sendData(userDetails);
            //user in registration page
            if(!state){
                
                //save the data of the new user in the database
                axios({
                    url:"/add",
                    method:"POST",
                    data:userDetails
                })
                .then(function(response){
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
               
                navigateTo();
            }
            //user in login page
            else{
                navigateTo();
                
            }
            
        }
       
    }


    return(
    <div>
    <Header />
    
    <form className="login" onSubmit={validateUser}>
    <div>
         <Input placeholder="UserName" value={userDetails.userName} name="userName" type="text"  change={handleChange} />
             <div className="error">
                {userDetails.userNameError}
             </div>
    </div>
    <div>
        <Input placeholder="Password" value={userDetails.password} name="password" type="passsword" change={handleChange} />
            <div className="error">
                {userDetails.passwordError}
            </div>
    </div>
    
    {state ? null:
    <div>
        <Input placeholder="Confirm Password" value={userDetails.confirmPassword} name="confirmPassword" type="passsword"  change={handleChange} />
            <div className="error">
                {userDetails.confirmPasswordError}
            </div>
    </div>}
    
    {state ? null:
    <div>
        <Input placeholder="Email" value={userDetails.email} name="email" type="email"  change={handleChange} />
        
            <div className="error">
                {userDetails.emailError}
            </div>
    </div>}
   <button type="Submit">{state ? "LOGIN":"REGISTER"}</button>
   <div >
    {state?<p>NEW USER : CLICK HERE<button type="Submit" onClick={changeState}>REGISTER</button></p> : null }
   </div>
   
    </form>
    
    </div>
    );
}

