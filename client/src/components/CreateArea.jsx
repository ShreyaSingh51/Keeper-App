import React, { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import Notes from "./Notes";
import axios from "axios"
import shortid from "shortid";



function CreateArea(props){

    const [array,setArray]=useState([]);

    const[noteContent,setContent]=useState({
        id:"",
        title:"",
        content:"",
        
    });

    const [edit,editNote]=useState(false);
    const[expand,setArea]=useState(false);


    const getdata=()=>{
        axios.get("/getUserDetails",{params:{userName:props.userName}})
        .then(response =>{
            console.log(response.data)
            setArray(response.data)
        })
        .catch(response =>{
            console.log(response)
        })
    }

    useEffect(()=>{
        getdata()
    },[])
    
    function handleChange(event){
        
        const {name,value}=event.target;
        setContent((prevValue) =>{
        
            return{
                ...prevValue,
                [name]:value
            }
        })
    }

    function handleArea(){
        setArea(true);
    }

    
    function submitNote(event){
        event.preventDefault();
        // props.handle(noteContent)
        noteContent.id=shortid.generate();
        axios({
            url:"/save",
            method:'POST',
            data:{
                userName:props.userName,
                newNote:noteContent
            }
        })
        .then(response =>{
            if(response.data.saved){
                setContent({
                  id:"",
                  title:"",
                  content:""
                })
                getdata();
            }
        })
    
       
    
    }

    // function handleClick(noteContent){
    //     setArray(prevValue =>{
    //         return(
    //          [...prevValue,noteContent]
    //         )
    //      })
        
         
    //  }

     function handleDelete(title,content,id){

        axios({
            url:"/delete",
            method:"POST",
            data:{
                userName:props.userName,
                title:title,
                content:content,
                id:id
            }
        })
        .then(response =>{
            if(response.data.deleted){
                getdata();
            }
        })
        // setArray((prevValue)=> {return(
        //         prevValue.filter((note,index) =>{
        //             return (index!==id);
        //       })
        
        // )})
    }

    function handleEdit(title,content,id){
        handleArea();
        editNote(true);
        setContent({
            id:id,
            title:title,
            content:content,
           
        })
    }

    function editNotes(event){ 
        event.preventDefault();
        
        console.log(noteContent.id)
        axios({
        url:"/edit",
        method:"POST",
        data:{
            userName:props.userName,
            id:noteContent.id,
            title:noteContent.title,
            content:noteContent.content
        }
       
    })
    .then((response)=>{
        if(response.data.updated){
            setContent({
                title:"",
                content:""
              })
            getdata();
            
        }
        editNote(false);
    })
}


    return (
    <div>
    <form className="createNote">
    {expand ? <input onChange={handleChange} name="title" placeholder="Title"  value={noteContent.title} row="1" /> : null }
        

        <textarea  onClick={handleArea} onChange={handleChange} name="content" placeholder="Take a Note...."  value={noteContent.content} rows={expand ? "3" : "1"} />
        <Zoom in={expand}>{edit?<Fab onClick={editNotes}><AddIcon /></Fab>:<Fab onClick={submitNote}><AddIcon /></Fab>}</Zoom>
    </form>

    
    {array.map((note,index) =>{
                return(<Notes 
                key={index}
                id={note.id}
                title={note.title} 
                content={note.content}
                click={handleDelete}
                edit={handleEdit} />)})}


    </div>);
}

export default CreateArea;