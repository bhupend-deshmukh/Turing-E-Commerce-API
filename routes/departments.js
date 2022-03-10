const express = require("express");
const knex = require("../config/turing_db");
const router = express.Router()

router.get("/department",(req,res)=>{
    knex.select("*").from("department")
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

router.get("/department/:id",(req,res)=>{
    knex.select("*").from("department").where({department_id:req.params.id})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})
module.exports = router

