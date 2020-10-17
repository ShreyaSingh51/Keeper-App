import React from "react";

function Input(props){
    return(
    <div>
        <input placeholder={props.placeholder} value={props.value} type={props.type} name={props.name} onChange={props.change}></input>
    </div>);
}

export default Input;