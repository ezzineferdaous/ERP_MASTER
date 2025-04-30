// IQR1.controller.js
const db = require("../models");
const IQR1 = db.IQR1;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new IQR1
exports.create = (req, res)  => {
   
    // Create 21
    const NEWIQR1 = {
        DocEntry: req.body.DocEntry,
        LineNum: req.body.LineNum,
        ItemCode: req.body.ItemCode,
        ItemName: req.body.ItemName,
        OnHandBef: req.body.OnHandBef,
        CountQuantity: req.body.CountQuantity,
        Quantity: req.body.Quantity,
        UM: req.body.UM,
        Price: req.body.Price,
        LineTotal: req.body.LineTotal,
        TotalCompte: req.body.TotalCompte,
    };
    //Save to database
    IQR1.create(NEWIQR1, { fields: ['DocEntry', 'LineNum', 'ItemCode', 'ItemName', 'OnHandBef', 'CountQuantity', 'Quantity', 'UM', 'Price',  'LineTotal', 'TotalCompte'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de IQR1"
            });
        });
};

//Retrive all IQR1 from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    IQR1.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des IQR1"
        });
    });
};

//Find a single IQR1 with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    IQR1.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de IQR1 : " + id
        });
    });
};
//


//Update a IQR1 by the id passed by the request
exports.update = (req, res)  => {

    const docEntry = req.params.docEntry;
    IQR1.update(req.body, {
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
    const docEntry = req.params.docEntry; 
    IQR1.findAll({ where: { DocEntry: docEntry }})
    .then(IQR1s => {
        res.send(IQR1s);        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getMax = (req, res)  => {    const docEntry = req.params.docEntry; 
IQR1.findAll({ where: { DocEntry: docEntry }})
.then(IQR1s => {
    res.send(IQR1s);        
}).catch(err => {
    res.status(500).send({
        message: err.message 
    });
});
};

exports.getPrevious = (req, res)  => {
    const docEntry = req.params.docEntry; 
    IQR1.findAll({ where: { DocEntry: docEntry }})
    .then(IQR1s => {
        res.send(IQR1s);        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.getNext = (req, res)  => {
    const docEntry = req.params.docEntry; 
    IQR1.findAll({ where: { DocEntry: docEntry }})
    .then(IQR1s => {
        res.send(IQR1s);        
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};
//apply soft-deletion


//Delete a IQR1 by the id passed by the request
exports.delete = (req, res) => {
    const id = req.params.id;

    IQR1.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "La ligne a été supprimée avec succès !"
            });
        } else {
            res.send({
                message: `Impossible de trouver la ligne requise en supprimant id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Une erreur s’est produite lors de la suppression de la ligne id=" + id
        });
    });
};


//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
 