module.exports = app => {
    
    const OIGN  = require("../controllers/OIGN.controller.js");
    var router = require("express").Router();

    //Create a new OIGN
    router.post("/", OIGN.create);

    //Retriv1e all OIGN
    router.get("/", OIGN.findAll);

    //Retrive a S1ingle OIGN
    router.get("/:id", OIGN.findOne);

    //Upd1ate a OIGN
    router.put("/:id", OIGN.update);

    //Del1ete a OIGN
    router.delete("/:id", OIGN.delete);

    //Delet1e all OIGN
    router.delete("/", OIGN.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OIGN.getMin);
    router.get("/data/Max", OIGN.getMax);
    router.get("/data/Next/:id", OIGN.getNext);
    router.get("/data/Previous/:id", OIGN.getPrevious);
    router.get("/data/MaxDoc", OIGN.getMaxDoc);

    app.use('/api/OIGN', router);

}