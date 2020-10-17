import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import {useHistory} from "react-router-dom";


function App(props){

    const history=useHistory();
    const navigateTo=()=> history.push("/");
  
    return(
        <div>
            <Header />
            <button className="logOut" onClick={navigateTo}>Log Out</button>

            <CreateArea userName={props.userDetails.userName} />
            
            <Footer />
            
        </div>
    );
  
}

export default App;



