const mongoose = require("mongoose");
const Schema = mongoose.Schema;




// define the Schema (the structure of the tempteacheruser)
const project = new Schema(  {

    PN: String,
    Y: Number,
    FS: String,
    FE: String,
    SS: String,
    SE: String,
    TS: String,
    TE: String,
    SV: { FN:String , MARK:Number},
    PR: { FN:String , MARK:Number},
    EX: { FN:String , MARK:Number},
    VIVA: Number,
    
  }                        );


  // Create a model based on that schema
const Project = mongoose.model("Project", project);
  


// export the model
module.exports = Project;
