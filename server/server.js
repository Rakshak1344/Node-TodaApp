var env = process.env.NODE_ENV || 'development';
console.log('env *****',env);

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodaApp';
}else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodaAppTest';
}




//global module
const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');
//local module
var {mongoose}=require('./db/mongoose');
var {Toda}= require('./models/toda');
var {User}= require('./models/user');
var {authenticate}= require('./middleware/authenticate');


var app = express();
const port = process.env.PORT || 3000;
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
//------------------USERS-----------------------------------------
app.post('/users',(req,res)=>{
    var body= _.pick(req.body,['email','password']);
    var user = new User(body);
    
    user.save().then(()=>{
       return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
    
});

//authenticate
app.get('/users/me',authenticate,(req,res)=>{
   res.send(req.user);
    // var token =req.header('x-auth');
    // User.findByToken(token).then((user)=>{
    //     if(!user){
    //         return Promise.reject();
    //     }
    //     res.send(user);
    // }).catch((e)=>{
    //     res.status(401).send();
    // });
});


app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
        // res.send(user);
        user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        })
    }).catch((e)=>{
        res.status(400).send();
    });
});



//------------------PORT-Listener---------------------------------
app.listen(port,()=>{
    console.log(`Started up at ${port}`);
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