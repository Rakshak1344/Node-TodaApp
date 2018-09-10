const {ObjectID} = require('mongodb');
//---------------------------------------------------
const {mongoose} = require('./../server/db/mongoose');
const {Toda} = require('./../server/models/toda');
const {User}= require('./../server/models/user');

// Toda.remove({}).then((res)=>{
//     console.log(JSON.stringify(res,undefined,2));
// });

Toda.findOneAndRemove({_id:''}).then((toda)=>{
    console.log(toda);
});

// Toda.findByIdAndRemove('5b9684a5d00a781704a24650').then((toda)=>{
//     console.log(toda);
// });