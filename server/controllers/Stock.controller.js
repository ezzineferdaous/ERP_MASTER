const db = require("../models");
const Stock = db.Stock;
const Op = db.Sequelize.Op;
 
//Create and Save a new City
exports.create = (req, res)  => {
    try {
        const NewStock = {
            TransType: req.body.TransType,
            DocNum: req.body.DocNum,
            CardCode: req.body.CardCode,
            ItemCode: req.body.ItemCode,
            LineNum: req.body.LineNum,
            InQty: req.body.InQty,
            OutQty: req.body.OutQty,
            WhsCode: req.body.WhsCode,
            Price: req.body.Price,
        };

        //Save to database 
        Stock.create(
            NewStock, { fields: ['TransType', 'DocNum', 'CardCode','ItemCode', 'LineNum', 'InQty','OutQty', 'WhsCode', 'Price'], } /* which attributes can be set */
        ).then((data) => {
                res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la création de Stock',
            });
        });

    } catch (error) {
        console.log("Error : "+ error);
    }
};


//Update a Stock by the id passed by the request
exports.update = (req, res) => {

    const id = req.params.id;
    Stock.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: 'Opération correctement achevée',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Erreur lors de la mise a jours id : ' + id,
        });
      });      
  };

//Retrive all Stock from the database by Name
exports.findAll = (req, res)  => {
    
    const AbsEntry = req.query.AbsEntry;
    var condition = AbsEntry ? { AbsEntry : { [Op.like]: `%${AbsEntry}%` } } : null;

    Stock.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection de Stock"
        });
    });
};

//Find a single Stock with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    Stock.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de Stock : " + id
        });
    });
};

//apply soft-deletion
//Delete a City by the id passed by the request
exports.delete = (req, res)  => {

};

//Delete All Countries 
exports.deleteAll = (req, res)  => {

};
 