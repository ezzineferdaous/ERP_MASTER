const db = require('../models');
const OWTR = db.OWTR;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new OWTR
exports.create = (req, res) => {
  // Create
  const NewOWTR = {
    DocEntry: req.body.DocEntry,
    DocNum: req.body.DocNum,
    DocDate: req.body.DocDate,
    Comment: req.body.Comment,
    UserSign: req.body.UserSign,
    Filler: req.body.Filler,
    Towhs: req.body.ToWhs,
  }; 
  console.log(NewOWTR);
  //Save to database
  OWTR.create(
    NewOWTR,
    {
      fields: ['DocEntry', 'DocNum', 'DocDate', 'Comment', 'UserSign', 'Filler', 'Towhs'],
    } /* which attributes can be set */
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Groupe Article',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {
  const DocEntry = req.query.DocEntry;
  var condition = DocEntry ? { DocEntry: { [Op.like]: `%${DocEntry}%` } } : null;

  OWTR.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection des Groupes Article',
      });
    });
};

//Find a single OWTR with an id = Code
exports.findOne = (req, res) => {
  const id = req.params.id;
  OWTR.findByPk(id)
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

//Update a OWTR by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  OWTR.update(req.body, {
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
  OWTR.min('id')
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
  OWTR.max('id')
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
  OWTR.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
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
  OWTR.findOne({ where: { id: { [Op.gt]: id } } })
    .then((id) => {
      res.send({ id: id });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMaxDoc = (req, res) => {
  OWTR.max('DocEntry')
  .then(DocEntry => {
     
      const nextDocEntry = DocEntry ? DocEntry + 1 : 1;
      res.send({ DocEntry: nextDocEntry });
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};


exports.findPDFdata = (req, res) => {
  const DocEntry = req.query.DocEntry;
  var condition = DocEntry ? { DocEntry: { [Op.like]: `%${DocEntry}%` } } : null;

  OWTR.findAll({
      where: condition,
      attributes: [ 'DocNum', 'DocDate', 'Comment', 'UserSign', 'Filler', 'Towhs']
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


//apply soft-deletion
//Delete a OWTR by the id passed by the request
exports.delete = (req, res) => {};

//Delete All
exports.deleteAll = (req, res) => {};
