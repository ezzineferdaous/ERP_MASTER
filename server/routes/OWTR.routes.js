module.exports = app => {
    
    const OWTR  = require("../controllers/OWTR.controller.js");
    var router = require("express").Router();

    //Create a new OWTR
    router.post("/", OWTR.create);

    //Retriv1e all OWTR
    router.get("/", OWTR.findAll);

    //Retrive a S1ingle OWTR
    router.get("/:id", OWTR.findOne);

    //Upd1ate a OWTR
    router.put("/:id", OWTR.update);
    router.get("/PDF", OWTR.findPDFdata);
    //Del1ete a OWTR
    router.delete("/:id", OWTR.delete);

    //Delet1e all OWTR
    router.delete("/", OWTR.deleteAll);

    // get Min and Max ids
    router.get("/data/Min", OWTR.getMin);
    router.get("/data/Max", OWTR.getMax);
    router.get("/data/Next/:id", OWTR.getNext);
    router.get("/data/Previous/:id", OWTR.getPrevious);
    router.get("/data/MaxDoc", OWTR.getMaxDoc);
      //Retrive data for PDF
      

    app.use('/api/OWTR', router);

}