const db = require("../models");
const OQUT = db.OQUT;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new OQUT
exports.create = (req, res)  => {
   
    // Create 21
    const oQUT = {
        DocEntry: req.body.DocEntry,
        DocNum: req.body.DocNum,
        DocDate: req.body.DocDate,
        DueDate: req.body.DueDate,
        CardCode: req.body.CardCode,
        CardName: req.body.CardName,
        TotalHT: req.body.TotalHT,
        DiscPrcnt: req.body.DiscPrcnt,
        RemiseTotal: req.body.RemiseTotal,
        VatSum: req.body.VatSum,
        DocTotal: req.body.DocTotal,
        Comment: req.body.Comment,
        Canceled: req.body.Canceled,
        DocStatus: req.body.DocStatus,
        UserSign: req.body.UserSign,

    };
    //Save to database
    OQUT.create(oQUT, { fields: ['DocEntry', 'DocNum', 'DocDate', 'DueDate', 'CardCode', 'CardName', 'TotalHT', 'DiscPrcnt', 'RemiseTotal' , 'VatSum', 'DocTotal', 'Comment', 'Canceled', 'DocStatus', 'UserSign'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de OQUT"
            });
        });
};

//Retrive all OQUT from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    OQUT.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des OQUT"
        });
    });
};

exports.findPDFdata = (req, res) => {
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry: { [Op.like]: `%${DocEntry}%` } } : null;

    OQUT.findAll({
        where: condition,
        attributes: ['DocNum', 'DocDate', 'CardCode', 'CardName','TotalHT','RemiseTotal','VatSum','DocTotal','Comment'] 
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

//Find a single OQUT with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    OQUT.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de OQUT : " + id
        });
    });
};
//


//Update a OQUT by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    OQUT.update(req.body, {
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
    OQUT.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    OQUT.max('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
exports.getMaxDoc = (req, res) => {
    OQUT.max('DocEntry')
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
    OQUT.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    OQUT.findOne({ where: { id: { [Op.gt]: id }}})
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
 