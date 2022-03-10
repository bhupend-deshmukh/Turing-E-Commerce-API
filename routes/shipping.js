const express = require("express")
const router = express.Router()
const knex = require("../config/turing_db")



// get all data in shippings_regions table

router.get("/shipping/regions",async(req,res)=>{
    try{
        const data = await knex.select("*").from("shipping_region")
        if (data.length>0){
            res.send(data)
        }else{
            res.send({"status":"shipping_region is empty..."})
        }
    }catch(err){
        console.log(err);
    }
})


//  get data by shipping_id

router.get("/shipping/:shipping_id",async(req,res)=>{
    try{
        const data = await knex.select("*").from("shipping").where("shipping_id",req.params.shipping_id)
        if (data.length>0){
            res.send(data)
        }else{
            res.send({"status":"shipping tables is empty"})
        }
    }catch(err){
        console.log(err);
        res.send(err)
    }
})



module.exports = router