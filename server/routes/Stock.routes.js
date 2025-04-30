module.exports = app => {
    
    const Stock  = require("../controllers/Stock.controller");
    var router = require("express").Router();

    //Create a new Stock
    router.post("/", Stock.create);

    //Retrive all Stock
    router.get("/", Stock.findAll);

    router.put("/:id", Stock.update);


    //Retrive a Single Stock
    router.get("/:id", Stock.findOne);

    //Delete a Stock
    router.delete("/:id", Stock.delete);

    //Delete all Stock
    router.delete("/", Stock.deleteAll);

    app.use('/api/Stock', router);

}