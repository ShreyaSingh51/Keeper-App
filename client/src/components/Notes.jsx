import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


function Notes(props){
    return(<div className="notes">
    <h1>{props.title}</h1>
    <p>{props.content}</p>
    <button onClick={() => {props.click(props.title,props.content,props.id)}}><DeleteIcon /></button>
    <button onClick={()=>{props.edit(props.title,props.content,props.id)}}><EditIcon /></button>
    </div>);
}

export default Notes;
