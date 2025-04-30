// IQR1.routes.js
module.exports = app => {
    
    const IQR1  = require("../controllers/IQR1.controller.js");
    var router = require("express").Router();

    //Create a new IQR1
    router.post("/", IQR1.create);

    //Retrive all IQR1
    router.get("/", IQR1.findAll);

    //Retrive a Single IQR1
    router.get("/:id", IQR1.findOne);

    //Update a IQR1
    router.put("/:id", IQR1.update);

    //Delete a IQR1
    router.delete("/:id", IQR1.delete);

    //Delete all IQR1
    router.delete("/", IQR1.deleteAll);


    // get Min and Max ids
    router.get("/data/Min/:docEntry", IQR1.getMin);
    router.get("/data/Max/:docEntry", IQR1.getMax);
    router.get("/data/Next/:docEntry", IQR1.getNext);
    router.get("/data/Previous/:docEntry", IQR1.getPrevious);

    app.use('/api/IQR1', router);

}