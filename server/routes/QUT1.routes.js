module.exports = app => {
    
    const QUT1  = require("../controllers/QUT1.controller");
    var router = require("express").Router();

    //Create a new QUT1
    router.post("/", QUT1.create);

    //Retrive all QUT1
    router.get("/", QUT1.findAll);

    //Retrive a Single QUT1
    router.get("/:id", QUT1.findOne);

    //Update a QUT1
    router.put("/:docEntry", QUT1.update);

    //Delete a QUT1
    router.delete("/:id", QUT1.delete);

    //Delete all QUT1
    router.delete("/", QUT1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", QUT1.getMin);
    router.get("/data/List/:docEntry", QUT1.getList);
    router.get("/data/Max/:docEntry", QUT1.getMax);
    router.get("/data/Next/:docEntry", QUT1.getNext);
    router.get("/data/Previous/:docEntry", QUT1.getPrevious);



    app.use('/api/QUT1', router);

}