const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const ejs=require("ejs");
const mongoose=require("mongoose");
const _ = require("lodash");
const axios=require("axios");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

mongoose.connect("mongodb+srv://admin-shubhi:2001shubhi@cluster0.mbvcn.mongodb.net/takeUforward",{useNewUrlParser:true});
const dataschema=new mongoose.Schema({
  username:String,
  language:String,
  stdin:String,
  code:String,
  timestamp:Date
});
const Input=mongoose.model("Input",dataschema);

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  }
};

app.get("/",function(req,res){
    res.render("first");
});
app.post("/first",function(req,res){
  if(req.body.submit=="submit"){
  const username=req.body.username;
  const language=req.body.language;
  const stdin=req.body.stdin;
  const code=req.body.code;
  

  Input.findOne({username:username}).exec().then(result=>{
    if(!result){
      const inputData=new Input({
        username:username,
        language:language,
        stdin:stdin,
        code:code,
        timestamp:new Date()
      });
      inputData.save();
      res.status(200).json({message:"Entry saved successfully!"});
    }
    else{
      res.status(201).json({message:"Entry already exists"});
    }
  }).catch(error=>{
    console.log("Error");
    res.status(500).json({error:error});
  });
}
else{
  Input.find({}).exec().then(result=>{
    res.render("second",{result});
  }).catch(err=>{
    res.json({error:err});
  });
  
}
  
})
app.listen(process.env.PORT|| 3000,function(){
    console.log("Server is on port 3000");
  })