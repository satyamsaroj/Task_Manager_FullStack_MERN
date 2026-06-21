
import express from "express";
import Streak from "../models/Streak.js";

const router = express.Router();

export default router;

router.get("/:userId", async(req,res)=>{

    try{

        let streak = await Streak.findOne({
            userId:req.params.userId
        });


        if(!streak){

    let days=[];

    for(let i=0;i<30;i++){

        let date = new Date();

        date.setDate(date.getDate()+i);


        days.push({

            day:i+1,

            completed:false,

            date:date.toISOString().split("T")[0]

        });

    }


    streak = await Streak.create({

        userId:req.params.userId,

        days:days

    });

}


        res.json(streak);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

router.put("/:userId/:day",async(req,res)=>{


try{


const {completed}=req.body;


let streak=await Streak.findOne({
    userId:req.params.userId
});


const selectedDay = streak.days[req.params.day - 1];

const today = new Date()
    .toISOString()
    .split("T")[0];


if(selectedDay.date !== today){

    return res.status(400).json({

        message:"You can only complete today's streak"

    });

}


selectedDay.completed = completed;



// calculate streak

let count=0;

streak.days.forEach(day=>{

    if(day.completed)
        count++;

});


streak.currentStreak=count;


if(count>streak.longestStreak)
{
    streak.longestStreak=count;
}


await streak.save();


res.json(streak);



}catch(error){

res.status(500).json({
message:error.message
});

}


});
