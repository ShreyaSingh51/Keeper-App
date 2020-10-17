const express=require("express");
const bodyParser=require("body-parser");
const morgan=require("morgan");
const path=require("path");
const mongoose=require("mongoose");

const app=express();
const PORT=process.env.PORT||8080;


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(process.env.MONGODB_URI||"mongodb+srv://admin-shreya:Test123@cluster0.xcbkn.mongodb.net/NotesDB?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',() => {
    console.log("Moongoose is connected!!");
});

const routes=require("./routes/users");


app.use(morgan("tiny"));
app.use("/",routes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.get("*",(req,res) =>{
        res.sendFile(path.join(__dirname,  "client","build","index.html"));
    });
    
}

app.listen(PORT,console.log(`Server is starting at `,(PORT)))