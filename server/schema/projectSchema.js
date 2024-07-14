const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type:String ,
        required:true
    },
    status:{
        type:Boolean ,
        required:true
    }
})

const ProjectSchema = new mongoose.Schema({
    userId :{
        type : String ,
        required : true 
    },
    pname :{
        type : String ,
        required : true 
    },
    task :{
        type : [taskSchema] ,
        required : true 
    },
    dline :{    
        type : String,
        required : true 
    }
    
    
})

const Project = new mongoose.model('Project',ProjectSchema)
module.exports = Project