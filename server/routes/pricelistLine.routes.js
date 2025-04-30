module.exports = app => {
    
    const PriceListLine  = require("../controllers/pricelistline.controller");
    var router = require("express").Router();

    //Retrive all PriceListLine
    router.post("/", PriceListLine.create);
    
    router.get("/", PriceListLine.findAll);

    router.put("/:id", PriceListLine.update);

    //Retrive PriceListLine by id
    router.get("/Lines/", PriceListLine.findAllByPriceListId);
     
    router.get("/PriceList/:priceListId/ItemCode/:itemCode", PriceListLine.findByPriceListIdAndItemCode);

    
    //Retrive a Single PriceListLine
    router.get("/:id", PriceListLine.findOne);    

    //Delete a PriceListLine
    router.delete("/:id", PriceListLine.delete);

    //Delete all PriceListLine
    router.delete("/", PriceListLine.deleteAll);

    app.use('/api/PriceListLine', router);

}