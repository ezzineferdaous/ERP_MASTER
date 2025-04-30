const db = require('../models');
const ItemGroup = db.ItemGroup;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new ItemGroup
exports.create = (req, res) => {
  // Create
  const NewItemGroup = {
    CodeGroupe: req.body.CodeGroupe,
    NomGroupe: req.body.NomGroupe,
    CmptCharges: req.body.CmptCharges,
    CmptProduit: req.body.CmptProduit,
  }; 
  
  //Save to database
  ItemGroup.create(
    NewItemGroup,
    {
      fields: ['CodeGroupe', 'NomGroupe', 'CmptCharges', 'CmptProduit'],
    } /* which attributes can be set */
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Groupe Article',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {
  const CodeGroupe = req.query.CodeGroupe;
  var condition = CodeGroupe ? { CodeGroupe: { [Op.like]: `%${CodeGroupe}%` } } : null;

  ItemGroup.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection des Groupes Article',
      });
    });
};

//Find a single ItemGroup with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  ItemGroup.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Groupe Article : ' + Code,
      });
    });
};
//

//Update a ItemGroup by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  ItemGroup.update(req.body, {
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

exports.getMin = (req, res) => {
  ItemGroup.min('id')
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMax = (req, res) => {
  ItemGroup.max('id')
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  ItemGroup.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getNext = (req, res) => {
  const id = req.params.id;
  ItemGroup.findOne({ where: { id: { [Op.gt]: id } } })
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//apply soft-deletion
//Delete a ItemGroup by the id passed by the request
exports.delete = (req, res) => {};

//Delete All
exports.deleteAll = (req, res) => {};
