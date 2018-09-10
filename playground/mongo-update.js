// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodaApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB server');
    }
    console.log('Connected to mongo');
    const db = client.db('TodaApp');

    //------------------------------------------------------------------
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b857fe94a3c7e1158ac18bb')
    // },{
    //     //https://docs.mongodb.com/manual/reference/operator/update/
    //     //http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOneAndUpdate
    //     $set:{
    //         completed:false
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // });
    //------------------------------------------------------------------

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b8c1f922c1f3009dca24171')
    },{
        $set:{
            name: 'Rakshith G'
        },
        $inc:{
            //https://docs.mongodb.com/manual/reference/operator/update/inc/#up._S_inc
            age: 1
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    });

client.close();
});