// OIQR.controller.js
const db = require("../models");
const OIQR = db.OIQR;
const Op = db.Sequelize.Op;
const moment = require('moment');
const Sequelize = require('sequelize')

//Create and Save a new OIQR
exports.create = (req, res)  => {
   
    // Create 21
    const NewOIQR = {
        DocEntry: req.body.DocEntry,
        DocNum: req.body.DocNum,
        DocDate: req.body.DocDate,
        Hour: req.body.Hour,
        Comment: req.body.Comment,
        UserSign: req.body.UserSign,
        DocStatus: req.body.DocStatus,
        WhsCode: req.body.WhsCode,
        PriceList: req.body.PriceList,
        
    };
    //Save to database
    OIQR.create(NewOIQR, { fields: ['DocEntry', 'DocNum', 'DocDate', 'Hour', 'Comment', 'UserSign', 'DocStatus', 'WhsCode', 'PriceList'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de OIQR"
            });
        });
};

//Retrive all OIQR from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    OIQR.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des OIQR"
        });
    });
};




//Find a single OIQR with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    OIQR.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de OIQR : " + id
        });
    });
};
exports.findData = (req, res) => {
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry: { [Op.like]: `%${DocEntry}%` } } : null;

    OIQR.findAll({
        where: condition,
        attributes:  [ 'DocNum', 'DocDate', 'Hour', 'Comment', 'UserSign', 'WhsCode', 'PriceList']
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
//



exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    OIQR.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Opération correctement achevée"
            });
        } else {
            res.status(404).send({
                message: `Erreur: Aucun enregistrement trouvé avec id=${id}, ou aucun changement à appliquer.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erreur lors de la mise à jour id=${id}. Détails de l'erreur: ${err.message}`
        });
    });
};


exports.getMin = (req, res)  => {
    
    OIQR.min('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {
    OIQR.max('id')
    .then(id => {
        res.send({ id: id });        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
exports.getMaxDoc = (req, res) => {
    OIQR.max('DocEntry')
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
    OIQR.findOne({  order: [['id', 'DESC']], where: { id: { [Op.lt]: id }}})
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
    OIQR.findOne({ where: { id: { [Op.gt]: id }}})
    .then(id => {
        res.send({ id: id });        
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
 