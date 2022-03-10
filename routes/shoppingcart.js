const express = require("express");
const router = express.Router()
const knex = require("../config/turing_db")
const bcrypt = require("bcrypt")


// generateUnique card_id

router.get("/shoppingcart/generateUniqueId",async(req,res)=>{
    try{
        const data = req.body.cart_id
        const hashed = bcrypt.hashSync(data, 10);
        res.send({cart_id:hashed})

    }catch(err){
        console.log(err);
    }
})

// add sume data 

router.post("/shoppingcart/add",async(req,res)=>{
    try{
        const data = {
            "cart_id":req.body.cart_id,
            "attributes":req.body.attributes,
            "product_id":req.body.product_id,
            "quantity":req.body.quantity,
            "added_on":new Date
        } 
        await knex("shopping_cart").insert(data)
        res.send('data added successfuly...')

    }catch(err){
        console.log(err);
    }
})

// get data  by cart_id

router.get("/shopping_cart/:cart_id",async(req,res)=>{
    try{
        const data = await knex.select(
            "item_id","name",
            "attributes",
            "product.product_id",
            "price","quantity",
            "image")
            .from("shopping_cart")
            .join("product","product.product_id","shopping_cart.product_id")
            .where("cart_id",req.params.cart_id)

        res.send(data)    
    }catch(err){
        console.log(err);
    }  
})

// update data 

router.put("/shopping_cart/update/:item_id",async(req,res)=>{

    try{
        const data = {
            "cart_id":req.body.cart_id,
            "attributes":req.body.attributes,
            "product_id":req.body.product_id,
            "quantity":req.body.quantity,
            "added_on":new Date
        } 
        const data1= await knex("shopping_cart").where("item_id",req.params.item_id).update(data)

        res.send({"status":"data updated..."})
    }catch(err){
        console.log(err);
    }
})

// delete data by cart_d 

router.delete("/shoppingcart/empty/:cart_id",async(req,res)=>{
    try{
        const d = await knex("shopping_cart").where("cart_id",req.params.cart_id)
        if (d.length > 0){
            await knex("shopping_cart").where("cart_id",req.params.cart_id).del()
            res.send({"status":"data deleted....."})    
        }
        else{
            res.send({'status':"id not found"})
        }
    
    }catch(err){
        console.log(err);
        res.send(err)
    }
})


// shopping_cart to move data to cart

router.get("/shopping_cart/moveToCart/:item_id",async(req,res)=>{
    try{
        const data = await knex("shopping_cart").where({item_id:req.params.item_id})
        
        if (data.length>0){
            const data1 = await knex("cart").insert(data[0])
            await knex("shopping_cart").where({item_id:req.params.item_id}).del()
            res.send({"status":"data moved successfully....."})
        }else{
            res.send({"status":"first add deta shopping_cart and then move to cart...."})
        }

    }catch(err){
        console.log(err);
        res.send({"status":err})
    }
})

// totalAmount

router.get("/shoppingcart/totalAmount/:cart_id",async(req,res)=>{
    try{
        const data1 = await knex("shopping_cart").where("cart_id",req.params.cart_id)
        if (data1.length>0){
            const data = await knex.select("total_amount").from("orders")
            res.send(data)
        }else{
            res.send({"status":"invalid cart_id"})
        }
    }catch(err){
        console.log("err");
    }
})

// /shoppingcart/saveForLater/item_id

router.get("/shoppingcart/saveForLater/:item_id",async(req,res)=>{
    try{
        const data = await knex("shopping_cart").where("item_id",req.params.item_id)
        await knex("saved").insert(data)
        res.send("data save successfully.....")
    }catch(err){
        res.send(err)
    }
})

// get data save by cart id

router.get("/shoppingcart/getSaved/:cart_id",async(req,res)=>{
    try{
        const data = await knex.select("*").from("saved").where("cart_id",req.params.cart_id)
        if (data.length>0){
            res.send(data)
        }else{
            res.send({"status":"invalid cart_id"})
        }
    }catch(err){
        res.send(err)
    }
})

// delete product in cart by item_id

router.delete("/shoppingcart/removeProduct/:item_id",async(req,res)=>{
    try{
        const data = await knex("cart").where("item_id",req.params.item_id)
        
        if (data.length>0){
            const data = await knex("cart").where("item_id",req.params.item_id).del()
            res.send({"status":"data romoved seccessfully..."})
        }else{
            res.send({"status":"invalid item_id..."})
        }

    }catch(err){
        res.send(err)
    }
})

//

module.exports = router