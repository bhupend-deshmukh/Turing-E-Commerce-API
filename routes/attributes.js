const express = require("express");
const knex = require("../config/turing_db");
const router = express.Router();

// Get Attribute list

router.get("/attributes",(req,res)=>{
    knex.select("*").from("attribute")
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// Get by attribue_id 

router.get("/attributes/:attribute_id",(req,res)=>{
    knex.select("*").from("attribute")
    .where("attribute_id",req.params.attribute_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// join table attribute_value and get all deta by attribute_id

router.get("/attributes/values/:attribute_id",(req,res)=>{
    knex.select("attribute_value_id","value")
    .from("attribute")
    .join("attribute_value","attribute.attribute_id","attribute_value.attribute_id")
    .where("attribute.attribute_id",req.params.attribute_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})
    
// join 3 tables attribute join aattribute_value   and  attribute_value join product_attribute and get all deta by product_id

router.get("/attributes/inProduct/:product_id",(req,res)=>{
    knex.select("name","attribute_value.attribute_value_id","value")
    .from("attribute")
    .join("attribute_value","attribute.attribute_id","attribute_value.attribute_id")
    .join("product_attribute","attribute_value.attribute_value_id","product_attribute.attribute_value_id")
    .where("product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})



module.exports = router 