const express = require("express");
const knex = require("../config/turing_db");
const {genratetoken,verifytoken} = require("../auth/jwt")
const router = express.Router()

// user register

router.post('/customers/', (req, res) => {
    knex('customer')
    .insert({
    "name": req.body.name,  
    "email": req.body.email,
    "password" : req.body.password,
    "address_1": req.body.address_1,
    "address_2": req.body.address_2,
    "city": req.body.city,
    "region": req.body.region,
    "postal_code": req.body.postal_code,
    "country" : req.body.country,
    "shipping_region_id": req.body.shipping_region_id,
    "credit_card": req.body.credit_card,
    "day_phone":  req.body.day_phone,
    "eve_phone":  req.body.eve_phone,  
    "mob_phone":  req.body.mob_phone
    })
    .then(() => {
        res.send({ message: 'Signup successfully...' })
    }).catch((err) => {
        res.send({ err: err.message })
    })
})

// login with email or password 

router.post("/customers/login",async(req,res)=>{
    try{

        const data = await knex.select("*").where({email:req.body.email}).from("customer")
            let token_data = {"id":data[0].customer_id,"email":data[0].email}
            if (data[0].email == req.body.email && data[0].password == req.body.password){

            let token = genratetoken(token_data);
            res.cookie('token',token)
            res.send({"status":"login successfully...","token":token})
            
        }
    }catch(err){
        console.log(err);
        // res.send(err)
    }
})

// update name,email,password,day_phone,eve_phone,mob_phone

router.put("/customers/update",verifytoken,async(req,res)=>{

    const data = {
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "day_phone":req.body.day_phone,
        "eve_phone":req.body.eve_phone,
        "mob_phone":req.body.mob_phone
    }
    let id = req.data.id
    
    try{
       await knex("customer").where("customer_id",id)
        .update(data)
        res.send("update sucessfully.....")
    }catch(err){
        console.log(err);
    }

})
  
// get data for user by customer id in token 

router.get("/customer/customer_id",verifytoken,async(req, res)=>{
    let id = req.data.id
    try{
        const data = await knex.select("*").from("customer").where("customer_id",id)
        res.send(data)
    }catch(err){

        console.log(err);
    }
})

// update address_1,address_2,city,region,postal_code,countary,shipping_region_id

router.put("/customers/address",verifytoken,async(req,res)=>{
    let id = req.data.id
    
    const update_data = {
        "address_1":req.body.address_1,
        "address_2":req.body.address_2,
        "city":req.body.city,
        "region":req.body.region,
        "postal_code":req.body.postal_code,
        "country":req.body.country,
        "shipping_region_id":req.body.shipping_region_id
    } 

    try{
        const data = await knex("customer").where({"customer_id":id}).update(update_data)
        res.send({"status":"data successfully updated"})
    }catch(err){
        console.log(err);    }
})

// update only creadit_card 

router.put("/customers/creditCard",verifytoken,async(req,res)=>{

    const credit_card = {
        "credit_card":req.body.credit_card
    }
    let id = req.data.id
    try{
        const data = await knex("customer").where({"customer_id":id}).update(credit_card)
        res.send({"status":"credit_card updated successfully....."})
    }catch(err){
        console.log(err);
    }

})

// router.get("/testing",(req,res)=>{
//     console.log('okkkkk');
// })
module.exports = router