module.exports = app => {
    
    const PriceList  = require("../controllers/pricelist.controller");
    var router = require("express").Router();

    //Create a new PriceList
    router.post("/", PriceList.create);

    //Retrive all PriceList
    router.get("/", PriceList.findAll);

    router.put("/:id", PriceList.update);


    //Retrive a Single PriceList
    router.get("/:id", PriceList.findOne);

    //Delete a PriceList
    router.delete("/:id", PriceList.delete);

    //Delete all PriceList
    router.delete("/", PriceList.deleteAll);

    app.use('/api/PriceList', router);

}