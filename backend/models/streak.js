
import mongoose from "mongoose";


const streakSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

   days:[
    {
        day:{
            type:Number,
            required:true
        },

        date:{
            type:String,
            required:true
        },

        completed:{
            type:Boolean,
            default:false
        }
    }
],

    currentStreak:{
        type:Number,
        default:0
    },

    longestStreak:{
        type:Number,
        default:0
    }

});


export default mongoose.model("Streak", streakSchema);