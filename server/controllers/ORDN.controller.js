const db = require("../models");
const ORDN = db.ORDN;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new ORDN
exports.create = (req, res)  => {
   
    // Create 21
    const NewORDN = {
        DocEntry: req.body.DocEntry,
        DocNum: req.body.DocNum,
        DocDate: req.body.DocDate,
        DueDate: req.body.DueDate,
        CardCode: req.body.CardCode,
        CardName: req.body.CardName,
        TotalHT: req.body.TotalHT,
        DiscPrcnt:req.body.DiscPrcnt,
        RemiseTotal:req.body.RemiseTotal,
        VatSum: req.body.VatSum,
        DocTotal: req.body.DocTotal,
        Comment: req.body.Comment,
        Canceled: req.body.Canceled,
        DocStatus: req.body.DocStatus,
        UserSign: req.body.UserSign,

    };
    //Save to database
    ORDN.create(NewORDN, { fields: ['DocEntry', 'DocNum', 'DocDate', 'DueDate', 'CardCode', 'CardName', 'TotalHT','DiscPrcnt', 'RemiseTotal', 'VatSum', 'DocTotal', 'Comment', 'Canceled', 'DocStatus', 'UserSign'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de ORDN"
            });
        });
};

//Retrive all ORDN from the database by Name
exports.findAll = (req, res)  => {
   
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    ORDN.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des ORDN"
        });
    });
};

exports.findPDFdata = (req, res) => {
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry: { [Op.like]: `%${DocEntry}%` } } : null;

    ORDN.findAll({
        where: condition,
        attributes: ['DocNum', 'DocDate', 'CardCode', 'CardName','TotalHT', 'RemiseTotal', 'VatSum','DocTotal','Comment']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving data for PDF"
        });
    });
};

//Find a single ORDN with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    ORDN.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de ORDN : " + id
        });
    });
};
//


//Update a ORDN by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    ORDN.update(req.body, {
        where : {id: id }
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Opération correctement achevée"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message : "Erreur lors de la mise a jours id : " + id
        });
    });
};

exports.getMin = (req, res)  => {
    ORDN.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getMax = (req, res)  => {
    ORDN.max('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.getMaxDoc = (req, res) => {
    ORDN.max('DocEntry')
    .then(DocEntry => {
       
        const nextDocEntry = DocEntry ? DocEntry + 1 : 1;
        res.send({ DocEntry: nextDocEntry });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.getPrevious = (req, res)  => {
    const id = req.params.id;
    ORDN.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getNext = (req, res)  => {
    const id = req.params.id;
    ORDN.findOne({ where: { id: { [Op.gt]: id }}})
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//apply soft-deletion
//Delete a APInvoiceFrom by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries
exports.deleteAll = (req, res)  => {

};
 