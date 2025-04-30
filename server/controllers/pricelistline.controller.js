const db = require("../models");
const PriceListLine = db.PriceListLine;
const Item = db.Item;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize')
 
//Create and Save a new City
exports.create = (req, res)  => {
    try {

        console.log(req.body);
        const NewPriceListLine = {
            ItemCode: req.body.ItemCode,
            Price: req.body.Price,
            PriceListId: req.body.PriceListId,
        };
        //Save to database 
        PriceListLine.create(
            NewPriceListLine, { fields: ['ItemCode', 'Price', 'PriceListId'], } /* which attributes can be set */
        ).then((data) => {
                res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la création des lignes de liste de prix',
            });
        });

    } catch (error) {
        console.log("Error : "+ error);
    }
};
//Update a PriceListLine by the id passed by the request
exports.update = async (req, res) => {
    const PriceListId = req.params.id;
    const ItemCode = req.body.ItemCode;
    const id = req.body.id;
    console.log(req.body);
    //Check Exists and Price <> New Price
    const result = await db.sequelize.query(
        'SELECT *  FROM PriceListLines WHERE ItemCode = :ItemCode and PriceListId = :PriceListId ',
        { replacements: { ItemCode: ItemCode, PriceListId:PriceListId }, type: Sequelize.QueryTypes.SELECT, });

        console.log(result.length);
        console.log(result);

    if(result.length = 0 & req.body.Price != 0 ) {

        const NewPriceListLine = {
            ItemCode: req.body.ItemCode,
            Price: req.body.Price,
            PriceListId: req.body.PriceListId,
        };
        PriceListLine.create(
            NewPriceListLine, { fields: ['ItemCode', 'Price', 'PriceListId'], }
        ).then((data) => {
                res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Erreur lors de la création des lignes de liste de prix',
            });
        });

    } else if(result.length = 0 & req.body.Price != 0 ) 
    {
        res.send({
            message: 'Opération correctement achevée',
          });
    } else {
        PriceListLine.update(req.body, { where: { id: id }, }).then((num) => {
            if (num == 1) {
              res.send({
                message: 'Opération correctement achevée',
              }); 

            } }).catch((err) => {
            res.status(500).send({
              message: 'Erreur lors de la mise a jours id : ' + id,
            });
        });
    } 
};

//Retrive all PriceListLine from the database by Name
exports.findAll = (req, res)  => {
    
    const PriceListId = req.query.PriceListId;
    var condition = PriceListId ? { PriceListId : { [Op.like]: `%${PriceListId}%` } } : null;

    /*PriceListLine.findAll({ where : condition})
    .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des lignes de liste de prix"
        });
    });*/

    PriceListLine.findOne({

        where: { condition },
        include: [{
            model: Item,
            where: ['Item.ItemCode = Item.ItemCode'],
            required: true
        }]

    }).then(data => {
        res.send(data);
    }) .catch(err => {
        res.status(500).send ({
            message: err.message || "Erreur lors de la selection des lignes de liste de prix"
        });
    });

};

//Find a single PriceListLine with an id = Code
exports.findOne = (req, res)  => {
    const id = req.params.id;
    PriceListLine.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors de la selection des lignes de liste de prix : " + Code
        });
    });
};

//Retrive all Countries from the database by Name
exports.findAllByPriceListId = async (req, res)  => {

    const PriceListId = req.query.PriceListId;
    try {
        const result = await db.sequelize.query(
          'SELECT ROW_NUMBER() over(order by T0.ItemCode) id,T0.ItemCode, T0.ItemName,isnull(T1.Price,0) Price FROM Articles T0 left join PriceListLines T1 on T0.ItemCode = T1.ItemCode and T1.PriceListId = :PriceListId order by ItemCode',
          {
            replacements: { PriceListId: PriceListId },
            type: Sequelize.QueryTypes.SELECT,
          }
        );
        res.send(result);

    } catch (error) {
        console.error('Error running query:', error);
        res.status(500).send('Internal Server Error');
    }
}; 

exports.findByPriceListIdAndItemCode = async (req, res) => {
    const { priceListId, itemCode } = req.params;
    try {
      const priceLine = await PriceListLine.findOne({
        where: { PriceListId: priceListId, ItemCode: itemCode }
      });
  
      if (priceLine) {
        res.status(200).send(priceLine);
      } else {
        res.status(404).send({ message: "Price not found for the given ItemCode." });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving the price."
      });
    }
  };

//apply soft-deletion
//Delete a City by the id passed by the request
exports.delete = (req, res)  => {
};

//Delete All Countries 
exports.deleteAll = (req, res)  => {
};
 