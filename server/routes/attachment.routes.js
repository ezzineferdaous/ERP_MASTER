module.exports = app => {
    
    const Attachment  = require("../controllers/attachment.controller.js");
    var router = require("express").Router();

    //Create a new Attachment
    router.post("/", Attachment.create);

    //Retrive all Attachment
    router.get("/", Attachment.findAll);

    //Retrive a Single Attachment
    router.get("/:id", Attachment.findOne);

    //Delete a Attachment
    router.delete("/:id", Attachment.delete);

    //Delete all Attachment
    router.delete("/", Attachment.deleteAll);

    app.use('/api/Attachment', router);

}