const db = require("../models");
const PriceList = db.PriceList;
const Op = db.Sequelize.Op;
 
//Create and Save a new City
exports.create = (req, res)  => {
    try {
        const NewPriceList = {
            Name: req.body.Name,
            Status: req.body.Status,
            TTC: req.body.TTC,
        };

        //Save to database 
        PriceList.create(
            NewPriceList, { fields: ['Name', 'Status', 'TTC'], } /* which attributes can be set */
        ).then((data) => {
                res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la création de liste de prix',
            });
        });

    } catch (error) {
        console.log("Error : "+ error);
    }
};


//Update a PriceList by the id passed by the request
exports.update = (req, res) => {

    const id = req.params.id;
    PriceList.update(req.body, {
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

//Retrive all PriceList from the database by Name
exports.findAll = (req, res)  => {
    
    const AbsEntry = req.query.AbsEntry;
    var condition = AbsEntry ? { AbsEntry : { [Op.like]: `%${AbsEntry}%` } } : null;

    PriceList.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection de liste de prix"
        });
    });
};

//Find a single PriceList with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    PriceList.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection de liste de prix : " + Code
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
 