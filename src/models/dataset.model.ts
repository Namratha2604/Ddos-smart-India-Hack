import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
   
    ip:{
        type:String,
        required: true
    },
    location:{
        country:
        {
            type:String,
            required:true  
        },
        city:
        {
            type:String,
            required:true  
        },        
    },
    protocol:
    {
        type:String,
        required:true
    },
    time:
    {
        type:Number,
        required:true
    },
    port:
    {
        type:Number,
        required:true
    },
    method:{
      type: String,
      required: true
    }, 
    isp: {
        type: String, 
        required: true
    },
    org: {
        type: String,
        required: true,
    }
})

const DataSet = mongoose.models.dataset || mongoose.model("dataset", datasetSchema);

export default DataSet;
