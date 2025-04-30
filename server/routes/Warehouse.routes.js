module.exports = app => {
    
    const Warehouse  = require("../controllers/Warehouse.controller.js");
    var router = require("express").Router();

    //Create a new Warehouse
    router.post("/", Warehouse.create);

    //Retrive all Countries
    router.get("/", Warehouse.findAll);

    //Retrive a Single Warehouse
    router.get("/:id", Warehouse.findOne);

    //Retrive a Single Warehouse
    router.get("/code/:CodeWarehouse", Warehouse.findByCode);

    //Update a Unite de mesure
    router.put("/:id", Warehouse.update);

    //Delete a Warehouse
    router.delete("/:id", Warehouse.delete);

    //Delete all Countries
    router.delete("/", Warehouse.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", Warehouse.getMin);
    router.get("/data/Max", Warehouse.getMax);
    router.get("/data/Next/:id", Warehouse.getNext);
    router.get("/data/Previous/:id", Warehouse.getPrevious);

    app.use('/api/Warehouse', router);

}