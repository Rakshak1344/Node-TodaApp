const {ObjectID} = require('mongodb');
//---------------------------------------------------
const {mongoose} = require('./../server/db/mongoose');
const {Toda} = require('./../server/models/toda');
const {User}= require('./../server/models/user');
//************************************************************************//
// var id = '4b93b68c5827561a5ccf43d1';

// if(!ObjectID.isValid(id)){
//     console.log('Not Valid ID');
// }
//---------------------------------------------------
// Toda.find({
//     _id: id
// }).then((todas)=>{
//     console.log('Todas',todas);
// });
//----------------------------------------------------
// Toda.findOne({
//     _id: id
// }).then((toda)=>{            //singular toda
//     console.log('Toda',toda);//sigular toda
// });
//----------------------------------------------------
// Toda.findById(id).then((toda)=>{   
//     if(!toda){
//         return console.log('ID not found');
//     }         //singular toda
//     console.log('Toda by ID',toda);//sigular toda
// }).catch((e)=>{
//     console.log(e);
// });
//************************************************************************//
var id = '5b8e6e59a1025b1864654702';
User.findById(id).then((user)=>{
    if(!user){
        return console.log('User Not Found');
    }
    console.log(JSON.stringify(user,undefined,2));
}).catch((e)=>{
    console.log(e);
});