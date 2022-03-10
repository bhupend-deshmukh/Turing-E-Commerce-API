const express = require("express");

const knex = require("../config/turing_db");
const router = express.Router()

// get orders details by order_id

router.get("/orders/:order_id",async(req,res)=>{
    try{
        const data = await knex.select("order_id","product_id","attributes","product_name","quantity","unit_cost").from('order_detail').where("order_id",req.params.order_id)
        res.send(data)
    }catch(err){
        console.log(err);
    }
})

// get orders sort details by order_id

router.get("/orders/sortDetail/:order_id",async(req,res)=>{
    try{
        const data = await knex.select("order_id","total_amount","created_on","shipped_on","status").from("orders").where("order_id",req.params.order_id)
        res.send(data)
    }catch(err){
        console.log(err);
    }
})


module.exports = router