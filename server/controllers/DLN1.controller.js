const db = require("../models");
const DLN1 = db.DLN1;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new DLN1
exports.create = (req, res)  => {
   
    // Create 21
    const dLN1 = {
        DocEntry: req.body.DocEntry,
        LineNum: req.body.LineNum,
        ItemCode: req.body.ItemCode,
        ItemName: req.body.ItemName,
        Quantity: req.body.Quantity,
        WhsCode: req.body.WhsCode,
        PriceHT: req.body.PriceHT,
        VAT: req.body.VAT,
        Price: req.body.Price,
        Discount: req.body.Discount,
        RemiseTotal: req.body.RemiseTotal,
        LineTotal: req.body.LineTotal,
        LineHT: req.body.LineHT,
        UM: req.body.UM,
    };
    //Save to database
    DLN1.create(dLN1, { fields: ['DocEntry', 'LineNum', 'ItemCode', 'ItemName', 'Quantity', 'WhsCode','VAT','PriceHT', 'Price', 'Discount','RemiseTotal','LineTotal','LineHT', 'UM'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de DLN1"
            });
        });
};

//Retrive all DLN1s from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    DLN1.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des DLN1"
        });
    });
};

//Find a single DLN1 with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    DLN1.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de DLN1 : " + id
        });
    });
};



//Update a DLN1 by the id passed by the request


exports.update = (req, res)  => {

    const docEntry = req.params.docEntry;
    DLN1.update(req.body, {
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
    DLN1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
    .then(DLN1 => {
        res.send(DLN1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.getList = (req, res)  => {
    const docEntry = req.params.docEntry;
    DLN1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
    .then(DLN1 => {
        res.send(DLN1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getMax = (req, res)  => {
        const docEntry = req.params.docEntry;
    DLN1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
.then(DLN1 => {
    res.send(DLN1);        
}).catch(err => {
    res.status(500).send({
        message: err.message
    });
});
};

exports.getPrevious = (req, res)  => {
    const docEntry = req.params.docEntry;
    DLN1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
    .then(DLN1 => {
        res.send(DLN1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getNext = (req, res)  => {
    const docEntry = req.params.docEntry;
    DLN1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
    .then(DLN1 => {
        res.send(DLN1);        
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
 