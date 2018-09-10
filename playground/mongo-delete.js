// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodaApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB server');
    }
    console.log('Connected to mongo');
    const db = client.db('TodaApp');

   //----------------delete-many-------------------------------
        // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=>{
        //     console.log(result);
        // });
   //----------------delete one--------------------------------
        // db.collection('Todos').deleteOne({text: 'something to do'}).then((result)=>{
        //     console.log(result);
        // });
   //----------------find-one-and-delete-----------------------
        // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
        //     console.log(result);
        // });

    //----------------delete-many-----------------Users--------------
        // db.collection('Users').deleteMany({name: 'Rakshak'}).then((result)=>{
        //     console.log(result);
        // });
    //delete----by------_id--------------------------------------------
        db.collection('Users').findOneAndDelete({
           _id: new ObjectID("5b8d7175b140020b0047b1bd")
        }).then((result)=>{
            console.log(JSON.stringify(result,undefined,2));
        });
    


client.close();
});