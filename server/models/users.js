const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const taskSchema = new Schema({
    topic:String,
    content:String,
    topicColor:{type:String,default:"skyblue"},
    contentColor:{type:String,default:"skyblue"},
    _id:String
},{_id:false})

const columnSchema = new Schema({
    topic:String,
    columnColor:{type:String,default:"skyblue"},
    taskLists:[taskSchema],
    _id:String
},{_id:false})

const UserSchema = new Schema({
    columns: [columnSchema],
})


UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',UserSchema)