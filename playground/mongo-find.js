// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodaApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB server');
    }
    console.log('Connected to mongo');
    const db = client.db('TodaApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID("5b8526abde9b441888b00516")
    // }).count().then((count)=>{
    //     console.log(`Todos count s:${count}`);
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('unable to fetch Todos',err);
    // });

    db.collection('Users').find({name: 'Rakshak'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to find the data');
    });

client.close();
});