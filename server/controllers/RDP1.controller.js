const db = require("../models");
const RDP1 = db.RDP1;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new RDP1
exports.create = (req, res)  => {
   
    // Create 21
    const NewRDP1 = {
        DocEntry: req.body.DocEntry,
        LineNum: req.body.LineNum,
        ItemCode: req.body.ItemCode,
        ItemName: req.body.ItemName,
        Quantity: req.body.Quantity,
        WhsCode: req.body.WhsCode,
        PrixHT: req.body.PrixHT,
        Price: req.body.Price,
        Discount: req.body.Discount,
        RemiseTotal: req.body.RemiseTotal,
        VAT: req.body.VAT,
        LineTotal: req.body.LineTotal,
        LineHT: req.body.LineHT,
        UM: req.body.UM,
    };
    //Save to database
    RDP1.create(NewRDP1, { fields: ['DocEntry', 'LineNum', 'ItemCode', 'ItemName', 'Quantity', 'WhsCode', 'Price','PrixHT' , 'Discount','RemiseTotal', 'VAT', 'LineTotal','LineHT' ,'UM'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de RDP1"
            });
        });
};

//Retrive all RDP1 from the database by Name
exports.findAll = (req, res)  => {
   
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    RDP1.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des RDP1"
        });
    });
};

//Find a single RDP1 with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    RDP1.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de RDP1 : " + id
        });
    });
};



//Update a RDP1 by the id passed by the request


exports.update = (req, res)  => {

    const docEntry = req.params.docEntry;
    RDP1.update(req.body, {
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
    RDP1.findAll({ where: { DocEntry: docEntry },order: [['LineNum', 'ASC']]})
    .then(RDP1 => {
        res.send(RDP1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getMax = (req, res)  => {
        const docEntry = req.params.docEntry;
    RDP1.findAll({ where: { DocEntry: docEntry },order: [['LineNum', 'ASC']]})
.then(RDP1 => {
    res.send(RDP1);        
}).catch(err => {
    res.status(500).send({
        message: err.message
    });
});
};

exports.getPrevious = (req, res)  => {
    const docEntry = req.params.docEntry;
    RDP1.findAll({ where: { DocEntry: docEntry },order: [['LineNum', 'ASC']]})
    .then(RDP1 => {
        res.send(RDP1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getNext = (req, res)  => {
    const docEntry = req.params.docEntry;
    RDP1.findAll({ where: { DocEntry: docEntry },order: [['LineNum', 'ASC']]})
    .then(RDP1 => {
        res.send(RDP1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

//Delete a APInvoiceFrom by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries
exports.deleteAll = (req, res)  => {

};