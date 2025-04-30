// IGE1.controller.js
const db = require("../models");
const IGE1 = db.IGE1;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new IGE1
exports.create = (req, res)  => {
   
    // Create 21
    const NEWIGE1 = {
        DocEntry: req.body.DocEntry,
        LineNum: req.body.LineNum,
        ItemCode: req.body.ItemCode,
        ItemName: req.body.ItemName,
        Quantity: req.body.Quantity,
        WhsCode: req.body.WhsCode,
        Price: req.body.Price,
        Discount: req.body.Discount,
        VAT: req.body.VAT,
        LineTotal: req.body.LineTotal,
        UM: req.body.UM,
    };
    //Save to database
    IGE1.create(NEWIGE1, { fields: ['DocEntry', 'LineNum', 'ItemCode', 'ItemName', 'Quantity','WhsCode', 'Price', 'Discount', 'VAT', 'LineTotal','UM'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de IGE1"
            });
        });
};

//Retrive all IGE1 from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    IGE1.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des IGE1"
        });
    });
};

//Find a single IGE1 with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    IGE1.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de IGE1 : " + id
        });
    });
};
//


//Update a IGE1 by the id passed by the request
exports.update = (req, res)  => {

    const docEntry = req.params.docEntry;
    IGE1.update(req.body, {
        where : {docEntry: docEntry }
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Opération correctement achevée"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message : "Erreur lors de la mise a jours docEntry : " + docEntry
        });
    });
};

exports.getMin = (req, res)  => {
    const docEntry = req.params.docEntry; 
    IGE1.findAll({ where: { DocEntry: docEntry }})
    .then(ige1s => {
        res.send(ige1s);        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {    const docEntry = req.params.docEntry; 
IGE1.findAll({ where: { DocEntry: docEntry }})
.then(ige1s => {
    res.send(ige1s);        
}).catch(err => {
    res.status(500).send({
        message: err.message 
    });
});
};

exports.getPrevious = (req, res)  => {
    const docEntry = req.params.docEntry; 
    IGE1.findAll({ where: { DocEntry: docEntry }})
    .then(ige1s => {
        res.send(ige1s);        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getNext = (req, res)  => {
    const docEntry = req.params.docEntry; 
    IGE1.findAll({ where: { DocEntry: docEntry }})
    .then(ige1s => {
        res.send(ige1s);        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
//apply soft-deletion
//Delete a CardGroup by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
 