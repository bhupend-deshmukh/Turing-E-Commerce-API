const express = require("express")
const router = express.Router()
const knex = require("../config/turing_db")

// get all tax

router.get("/tax",async(req,res)=>{
    try{
        const data = await knex.select("*").from("tax")
        res.send(data)
    }catch(err){
        res.send(err)
    }
})

// get tax by taax_id

router.get("/tax/:tax_id",async(req,res)=>{
    try{
        const data = await knex.select("*").from("tax").where("tax_id",req.params.tax_id)
        if (data.length>0){
            res.send(data)
        }else{
            res.send({"status":"invalid tax_id"})
        }
    }catch(err){
        res.send(err)
    }
})


module.exports = router