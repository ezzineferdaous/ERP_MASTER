const db = require('../models');
const Famille = db.Famille;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new Famille
exports.create = (req, res) => {
  // Create
  const NewFamille = {
    CodeFamille: req.body.CodeFamille,
    NomFamille: req.body.NomFamille,
    CodeGroupe: req.body.CodeGroupe,
   };
     
  //Save to database
  Famille.create(
    NewFamille, { fields: ['CodeFamille', 'NomFamille', 'CodeGroupe'], } /* which attributes can be set */
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Famille',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {
  const CodeGroupe = req.query.CodeGroupe;
  var condition = CodeGroupe ? { CodeGroupe: { [Op.like]: `%${CodeGroupe}%` } } : null;

  console.log(CodeGroupe);

  Famille.findAll({ where: condition })
    .then((data) => { res.send(data); })
    .catch((err) => { res.status(500).send({ message: err.message || 'Erreur lors de la selection des Famille', }); });
};

//Find a single Famille with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  Famille.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Famille : ' + Code,
      });
    });
};
//

//Update a Famille by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  Famille.update(req.body, {
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
  Famille.min('id')
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
  Famille.max('id')
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
  Famille.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
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
  Famille.findOne({ where: { id: { [Op.gt]: id } } })
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
