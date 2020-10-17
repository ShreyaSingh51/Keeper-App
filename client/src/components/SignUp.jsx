import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import {Link} from "react-router-dom";



function SignUp(){
    return(
        <div className="signUp">
        <h1>
           Keeper App
       </h1>
        <HighlightIcon style={{width:"25%",height:"auto",color:"#fff"}}/>
        <p className="sp">We keep your tasks and notes.</p>
        <Link to="/login"><button>LOGIN</button></Link>
        <Link to="/register"><button>REGISTER</button></Link>
        
        </div>
    );
}

export default SignUp;