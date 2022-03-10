const knex=require('knex')({
    client : "mysql",
    connection : {
        host : "localhost",
        user : "root",
        password : "Bhupendra@123",
        database : "turing"
    }
})

knex.schema.hasTable("cart").then(function (exists) {
    if (!exists) {
        knex.schema.createTable("cart", (table)=>{
            table.increments("item_id").primary()
            table.integer("cart_id")
            table.integer("product_id")
            table.string("attributes")
            table.integer("quantity")
            table.integer("buy_now")
            table.datetime("added_on")
        }).then(()=>{
            console.log("cart created.....")
        }).catch(err=>{
            
            console.log(err.message)
        })
    }
})

knex.schema.hasTable("saved").then(function (exists) {
    if (!exists) {
        knex.schema.createTable("saved", (table)=>{
            table.increments("item_id").primary()
            table.integer('cart_id');
            table.integer('product_id');
            table.string('attributes');
            table.integer('quantity');
            table.integer('buy_now');
            table.datetime('added_on');
        }).then(() => {
            console.log("saved created.....")
        }).catch(() => {
            console.log("error");
        })
    }
})


module.exports = knex      