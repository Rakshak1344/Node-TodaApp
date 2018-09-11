//global module
const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');
//local module
var {mongoose}=require('./db/mongoose');
var {Toda}= require('./models/toda');
var {User}= require('./models/user');


var app = express();
// const port = process.env.PORT || 3000;
//---middle-ware----------------------
app.use(bodyParser.json());

//--------post------------------------
app.post('/todas',(req,res)=>{
 var toda = new Toda({
     text: req.body.text
 });

 toda.save().then((docs)=>{
    res.send(docs);
 },(e)=>{
    res.status(400).send(e);
 });
});

//--------------------GET-------------------------------
app.get('/todas',(req,res)=>{
    Toda.find().then((todas)=>{
        res.send({todas});
    },(e)=>{
        res.status(400).send(e);
    });
});
//--------------------get data with id-----------------
app.get('/todas/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Toda.findById(id).then((toda)=>{
        if(!toda){
            return res.status(404).send();
        }
        res.send({toda});
    }).catch((e)=>{
        res.status(404).send();
    });
});

//---------------------Delete----------------------------
app.delete('/todas/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Toda.findByIdAndRemove(id).then((toda)=>{
        if(!toda){
            return res.status(404).send();
        }
        res.status(200).send(toda);
    }).catch((e)=>{
        res.status(404).send();
    });
});

//---------------patchMethod-Update------------------------------
app.patch('/todas/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed =false;
        body.completedAt=null;
    }

    Toda.findByIdAndUpdate(id,{$set: body},{new: true}).then((toda)=>{
        if(!toda){
            return res.status(404).send();
        }
        res.send({toda});
    }).catch((e)=>{
        res.status(404).send();
    });

});
//------------------PORT-Listener---------------------------------
app.listen(3000,()=>{
    console.log('Started up at port 3000');
});

module.exports={app};




























// var newUser = new  Users({
//     email: " harini1575@gmail.com "
// });

// newUser.save().then((docs)=>{
//     console.log('User saved',docs);
// },(e)=>{
//     console.log('Unable to save',e);
// });

//save new things