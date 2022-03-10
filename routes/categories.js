const express = require("express");
const knex = require("../config/turing_db");
const router = express.Router()

// get categories  

router.get("/categories",(req,res)=>{
    let page = req.query.page || 1
    let limit = req.query.limit || 20
    // let ld = req.query.ld || 20
    if (page && limit){
        page = limit*page-limit
    }
    

    knex.select("*").from("category").limit(limit).offset(page)
    .then((data)=>{
        const count = data.length
        res.send({"count":count,"rows":data})
    }).catch((err)=>{ 
        res.send({"status":err})
    })
})


router.get("/categories/:id",(req,res)=>{
    knex.select("*").from("category").where({category_id:req.params.id})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({"status":err})
    })

})

// '/categories/inproduct/:product_id'


router.get("/categories/inProduct/:product_id",(req,res)=>{
    let product_id = req.params.product_id
    knex.select("category.category_id","department_id","name")
    .from("category")
    .join("product_category", "category.category_id", "product_category.category_id")
    .where("product_category.product_id", product_id)
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
        res.send({err})
    })
})

// get by department_id

router.get("/categories/inDepartment/:department_id",(req,res)=>{
    knex.select("category_id","name","description","department_id")
    .from("category")
    .where("department_id",req.params.department_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})



module.exports = router