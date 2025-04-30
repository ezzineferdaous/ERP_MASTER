module.exports = app => {
    
    const PDN1  = require("../controllers/PDN1.controller");
    var router = require("express").Router();

    //Create a new PDN1
    router.post("/", PDN1.create);

    //Retrive all PDN1
    router.get("/", PDN1.findAll);

    //Retrive a Single PDN1
    router.get("/:id", PDN1.findOne);

    //Update a PDN1
    router.put("/:docEntry", PDN1.update);

    //Delete a PDN1
    router.delete("/:id", PDN1.delete);

    //Delete all PDN1
    router.delete("/", PDN1.deleteAll);

    // get Min and Max ids
    router.get("/data/Min/:docEntry", PDN1.getMin);
    router.get("/data/List/:docEntry", PDN1.getList);
    router.get("/data/Max/:docEntry", PDN1.getMax);
    router.get("/data/Next/:docEntry", PDN1.getNext);
    router.get("/data/Previous/:docEntry", PDN1.getPrevious);



    app.use('/api/PDN1', router);

}