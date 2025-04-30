const db = require("../models");
const WTR1 = db.WTR1;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')
// const { CardGroup } = require('../models');


//Create and Save a new WTR1
exports.create = (req, res)  => {
   
    // Create 21
    const newwTR1 = {
        
        DocEntry: req.body.DocEntry,
        LineNum: req.body.LineNum,
        ItemCode: req.body.ItemCode,
        ItemName: req.body.ItemName,
        Quantity: req.body.Quantity,
        Price: req.body.Price,
        LineTotal: req.body.LineTotal,
        UM: req.body.UM
        
        
    };
    //Save to database
    WTR1.create(newwTR1, { fields: ['DocEntry', 'LineNum', 'ItemCode', 'ItemName', 'Quantity', 'WhsCode', 'Price', 'Discount', 'VAT', 'LineTotal', 'UM'] }).then(
        data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de Partenaire"
            });
        });
};

//Retrive all WTR1s from the database by Name
exports.findAll = (req, res)  => {
    
    const DocEntry = req.query.DocEntry;
    var condition = DocEntry ? { DocEntry : { [Op.like]: `%${DocEntry}%` } } : null;

    WTR1.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des Partenaire"
        });
    });
};

//Find a single WTR1 with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    WTR1.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de Partenaire : " + id
        });
    });
};
//


//Update a WTR1 by the id passed by the request
exports.update = (req, res)  => {

    const id = req.params.id;
    WTR1.update(req.body, {
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



// Retrieve and order data in ascending order
exports.getMin = (req, res) => {
    const docEntry = req.params.docEntry;
    WTR1.findAll({
      where: { DocEntry: docEntry },
      order: [['DocEntry', 'ASC'], ['LineNum', 'ASC']]
    })
    .then(wTR1s => {
      res.send(wTR1s);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
  };
  
  // Retrieve and order data in descending order
  exports.getMax = (req, res) => {
    const docEntry = req.params.docEntry;
    WTR1.findAll({
      where: { DocEntry: docEntry },
      order: [['DocEntry', 'DESC'], ['LineNum', 'DESC']]
    })
    .then(wTR1s => {
      res.send(wTR1s);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
  };
  

exports.getPrevious = (req, res)  => {
  const docEntry = req.params.docEntry;
  WTR1.findAll({ where: { DocEntry: docEntry }})
  .then(wTR1s => {
      res.send(wTR1s);        
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};

exports.getNext = (req, res)  => {
  const docEntry = req.params.docEntry;
  WTR1.findAll({ where: { DocEntry: docEntry }})
  .then(wTR1s => {
      res.send(wTR1s);        
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};


//apply soft-deletion
//Delete a CardGroup by the id passed by the request
exports.delete = (req, res) => {
    
};

//Delete All Countries 

exports.deleteAll = (req, res) => {
   
}
 