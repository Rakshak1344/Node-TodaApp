const MongoClient = require('mongodb').MongoClient;

//-------------------creating new id----------------------------
// const {MongoClient,ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);
//-------------------Destructuring user object------------------
// var user = {name:'Rakshith',age:20};
// var {name} = user;
// console.log(name);
//---------------------------------------------------------------

MongoClient.connect('mongodb://localhost:27017/TodaApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB server');
    }
    console.log('Connected to mongo');
    const db = client.db('TodaApp');
    
    //---------------insertion---------------------------
    // db.collection('Todas').insertOne({
    //     name: 'Rakshak',
    //         age: 20,
    //          location: 'Bangalore'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert data',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    //-------Insert new doc into user (name,age,location)----

    // db.collection('Users').insertOne({
    //     // _id: 123,
    //     name: 'Rakshak',
    //     age: 20,
    //     location: 'Bangalore'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('unable to insert the user_data',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    //     //output for console.log up above =>(2018-09-02T17:36:18.000Z)
    // });

    client.close();
});