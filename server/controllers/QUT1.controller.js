const db = require("../models");
const QUT1 = db.QUT1;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')

//Create and Save a new QUT1
exports.create = (req, res)  => {
   
    // Create 21
    const qUT1 = {
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
    QUT1.create(qUT1, { fields:['DocEntry', 'LineNum', 'ItemCode', 'ItemName', 'Quantity', 'WhsCode','VAT','PriceHT', 'Price', 'Discount', 'RemiseTotal','LineTotal','LineHT', 'UM'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de QUT1"
            });
        });
};


//Retrive all QUT1 from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    QUT1.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des QUT1"
        });
    });
};

//Find a single QUT1 with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    QUT1.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de QUT1 : " + id
        });
    });
};



//Update a QUT1 by the id passed by the request


exports.update = (req, res)  => {

    const docEntry = req.params.docEntry;
    QUT1.update(req.body, {
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
    QUT1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
    .then(QUT1 => {
        res.send(QUT1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.getList = (req, res)  => {
    const docEntry = req.params.docEntry;
    QUT1.findAll({
         where: { DocEntry: docEntry },
         order: [['LineNum', 'ASC']]
        })
    .then(QUT1 => {
        res.send(QUT1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getMax = (req, res)  => {
        const docEntry = req.params.docEntry;
    QUT1.findAll({
         where: { DocEntry: docEntry },
         order: [['LineNum', 'ASC']]
        })
.then(QUT1 => {
    res.send(QUT1);        
}).catch(err => {
    res.status(500).send({
        message: err.message
    });
});
};


exports.getPrevious = (req, res)  => {
    const docEntry = req.params.docEntry;
    QUT1.findAll({
         where: { DocEntry: docEntry },
         order: [['LineNum', 'ASC']]
        })
    .then(QUT1 => {
        res.send(QUT1);        
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getNext = (req, res)  => {
    const docEntry = req.params.docEntry;
    QUT1.findAll({
        where: { DocEntry: docEntry },
        order: [['LineNum', 'ASC']]
       })
    .then(QUT1 => {
        res.send(QUT1);        
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
 