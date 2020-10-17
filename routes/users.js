const express=require("express");
const router=express.Router();
const User=require("../models/userSchema");
require('dotenv').config();
const nodemailer=require("nodemailer");

router.post("/add",(req,res)=>{
     
    const newUser=User({
        userName:req.body.userName,
        password:req.body.password,
        email:req.body.email
    });

    newUser.save((err)=>{
        if(!err){
            console.log("New user added to database.")
        }
        else{
            console.log(err);
        }
    });

    var smtpConfig={
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    };

    var transporter=nodemailer.createTransport(smtpConfig);

    let mailOptions={
        from:'Keeper App',
        to:req.body.email,
        subject:`Welcome ${req.body.userName} to Keeper App.`,
        
        html:`<p>Greetings from Keeper App.Thank you for trying out our app.</p><p>We wish you a usful and  happy journey as you continue to use our app.</p><p>Your Keeper App password is : <h3>${req.body.password}</h3></p><p>Keeper App : An app that helps you manage your notes and keep your tasks for the day.</p>`
    };

    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log("Could not send mail.",err);
        }
        else{
            console.log("Email sent.")
        }
    });
   
})

router.post("/save",(req,res)=>{
    const userName=req.body.userName
    User.findOne({userName:userName},function(err,found_data){
        if(!err && found_data){
            console.log(found_data)
            found_data.notesArray.push(req.body.newNote)
            
            found_data.save(err =>{
                if(!err){
                    console.log("Note added to database");
                    res.send({saved:true});
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    })
})

router.get("/getUserDetails",(req,res) =>{
    const userName=req.query.userName;
    User.findOne({userName:userName},function(err,found_data){
        if(!err && found_data){
            res.send(found_data.notesArray)
        }
        else{
            console.log(err)
        }
    })
})

router.get("/getdata",(req,res) =>{
    User.find({"userName":{$ne:null}},function(err,found_data){
        	if(!err){
                // console.log(found_data)
                res.json(found_data);
            }else{
                console.log(err);
            }
    })
})

router.post("/delete",(req,res) =>{
    const userName=req.body.userName
    const title=req.body.title
    const content=req.body.content
    const id=req.body.id
    User.findOneAndUpdate({userName:userName},{$pull:{notesArray:{id:id}}},function(err,found_data){
        if(!err){
            console.log("Data deleted")
            res.send({deleted:true});
        }
        else{
            console.log(err);
        }
    })
})

router.post("/edit",(req,res) => {
    const userName=req.body.userName
    const id=req.body.id
    const title=req.body.title
    const content=req.body.content
    console.log(id)
    console.log(title)
    console.log(content)
    User.updateOne({userName:userName,'notesArray.id':id},{$set:{'notesArray.$.title':title,'notesArray.$.content':content}},function(err,found_data){
        if(!err){
            console.log("Data updated");
            res.send({updated:true});

        }else{
            console.log(err);
        }
    })

})

module.exports=router;