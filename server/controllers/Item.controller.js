const { UmbrellaSharp } = require('@mui/icons-material');
const db = require('../models');
const Item = db.Item;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');

//Create and Save a new Item
exports.create = (req, res) => {
  const NewItem = { ItemCode: req.body.ItemCode, ItemName: req.body.ItemName, NomEtrange: req.body.NomEtrange, CodeBarre: req.body.CodeBarre, Vendu: req.body.Vendu, Active: req.body.Active, Achete: req.body.Achete, Magasin: req.body.Magasin, CodeFamille: req.body.CodeFamille, Stock: req.body.Stock, Picture: req.body.Picture, ItemGroupe: req.body.ItemGroupe, Sfamille: req.body.Sfamille, CodeUMV: req.body.CodeUMV, CodeUMA: req.body.CodeUMA,CodeUMS: req.body.CodeUMS, ArticleGerePar: req.body.ArticleGerePar, Remarque: req.body.Remarque, PJ: req.body.PJ, EnStock: req.body.EnStock, CmptCharges: req.body.CmptCharges, CmptProduit: req.body.CmptProduit, CmptStock: req.body.CmptStock, CmptVariation: req.body.CmptVariation, GroupeTax: req.body.GroupeTax };
  //Save to database 
  Item.create(
    NewItem, { fields: ['ItemCode', 'ItemName', 'NomEtrange', 'CodeBarre', 'Vendu', 'City', 'Active','Achete','Magasin', 'Famille', 'Stock', 'Picture', 'ItemGroupe', 'Sfamille', 'CodeUMV', 'CodeUMA', 'CodeUMS', 'ArticleGerePar', 'Remarque', 'PJ', 'EnStock', 'CmptCharges', 'CmptProduit', 'CmptStock', 'CmptVariation', 'GroupeTax'  ], } 
  ).then((data) => {
      res.send(data);
    }) .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la création de Item',
      });
    });
};

//Retrive all Item Groups from the database by Name
exports.findAll = (req, res) => {
  const ItemCode = req.query.ItemCode; 
  var condition = ItemCode ? { ItemCode: { [Op.like]: `%${ItemCode}%` } } : null;

  Item.findAll({ where: condition }).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Item',
      });
    });
};

//Find a single Item with an id = Code
exports.findOne = (req, res) => {

  const id = req.params.id;
  Item.findByPk(id)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la selection de Item : ' + Code,
      });
    });

};

//Update a Item by the id passed by the request
exports.update = (req, res) => {
  const id = req.params.id;
  Item.update(req.body, {
    where: { id: id },
  }).then((num) => {
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
  Item.min('id')
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
  Item.max('id')
    .then((id) => { res.send({ id: id }); })
    .catch((err) => {
      res.status(500).send({ message: err.message, });
    });
};

exports.getPrevious = (req, res) => {
  const id = req.params.id;
  Item.findOne({ order: [['id', 'DESC']], where: { id: { [Op.lt]: id } } })
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
  Item.findOne({ where: { id: { [Op.gt]: id } } })
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

exports.deleteAll = (req, res) => {};








exports.Stock = async (req, res) => {
  try {
    const { ItemCode, newQuantity } = req.body;

    console.log("item code:",ItemCode);

    console.log("newQuantity:",newQuantity);

   

    const quantity = parseInt(newQuantity, 10);

    if (!ItemCode || quantity === undefined) { return res.status(400).json({ message: 'ItemCode و quantity ' }); }

    const item = await Item.findOne({ where: { ItemCode: ItemCode } });
   
    if (!item) { return res.status(404).json({ message: ` article ${ItemCode} undefind ` }); }
   

    item.EnStock = quantity;

    await item.save();
   
    return res.status(200).json({ message: 'Stock has been modified successfully', ItemCode: ItemCode, quantity: quantity });

  } catch (error) {
   
    console.error('Une erreur sest produite lors de la modification de linventaire :', error);
    return res.status(500).json({ message: ' Une erreur inattendue sest produite  ', error: error.message });
  }
};
