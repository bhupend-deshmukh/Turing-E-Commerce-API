const express = require("express");
const router = express.Router()
const knex = require("../config/turing_db")
const {verifytoken} = require("../auth/jwt");

// get all data from product table

router.get("/products",(req,res)=>{
    let page = req.query.page || 1
    let limit = req.query.limit || 100
    let ld = req.query.ld || 100
    if (page && limit){
        page = limit*page-limit
    }
    let search  = req.query.search || ""
    console.log(page, limit,ld, 'pirint...');
    knex.select("product_id","name","description","price","discounted_price","thumbnail").from("product").limit(limit).offset(page).where("name", "like", `%${search}%`)
    .then((data)=>{
        for (d of data){
            d['description'] = d["description"].slice(0,ld)
        }
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// search data for any words in string

router.get("/products/search",(req,res)=>{
    let page = req.query.page || 1
    let limit = req.query.limit || 100
    if (page && limit){
        page = limit*page-limit
    }
    
    let search  = req.query.search || ""
    knex.select("product_id","name","description","price","discounted_price","thumbnail").from("product").limit(limit).offset(page).where("name","like",`%${search}%`) 
    .then((data)=>{
        let c = data.length
        console.log(c);
        res.send({"count":c,"rows":data})
    }).catch((err)=>{
        res.send(err)
    })
})

// get data by product_id

router.get("/products/:product_id",(req,res)=>{
    knex.select("*").from("product")
    .where("product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// get data in product table by category_id

router.get("/products/inCategory/:category_id",(req,res)=>{
    knex.select("product.product_id","name","description","price","discounted_price","thumbnail")
    .from("product")
    .join("product_category","product_category.product_id","product.product_id")
    .where("category_id",req.params.category_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// get data for product table for using department_id

router.get("/products/inDepartment/:department_id",(req,res)=>{
    knex.select("product.product_id","product.name","product.description","price","discounted_price","thumbnail")
    .from("product")
    .join("product_category","product_category.product_id","product.product_id")
    .join("category","category.category_id","product_category.category_id")
    .where("department_id",req.params.department_id)
    .then((data)=>{
        let m = data.length
        res.send({"count":m,"rows":data})
    }).catch((err)=>{
        res.send(err)
    })

})

// get details by product id

router.get("/products/:product_id/details",(req,res)=>{
    knex.select("product_id","name","description",  "price","discounted_price","image", "image_2").from("product")
    .where("product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// get data for 3 tables...using product_id

router.get("/products/:product_id/locations",(req,res)=>{
    knex.select("category.category_id","category.name as category_name","department.department_id","department.name as department_name")
    .from("product_category")
    .join("category","category.category_id","product_category.category_id")
    .join("department","department.department_id","category.department_id")
    .where("product_category.product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// get data by product id in reviews tables 

router.get("/products/:product_id/reviews",(req,res)=>{
    knex.select("name","review","rating","created_on")
    .from("product")
    .join("review","review.product_id","product.product_id")
    .where("review.product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// post data in review tables

router.post('/products/:product_id/review',(req,res)=>{
    knex.select('product_id').from("product")
    .where('product_id',req.params.product_id)
    .then((data)=>{
       
        knex("review")
        .insert({
            'product_id':data[0]['product_id'],
            'customer_id':req.body.customer_id,
            'review':req.body.review,
            'rating':req.body.rating,
            'created_on':new Date
        })
        .then((data1)=>{
            res.send(data1)
        }).catch((err)=>{
            res.send(err)
        })

    }).catch((err)=>{
        res.send(err)
    })
})


module.exports = router 