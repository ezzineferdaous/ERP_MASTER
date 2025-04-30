// index.model.js
const dbConfig = require('../../config/db.config.js');

const { Sequelize, DataTypes } = require('sequelize');
const { sequelizeJoi, Joi } = require('sequelize-joi');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  define: { freezeTableName: true },
  dialect: dbConfig.dialect,
  dialectOptions: {
    connectionString: 'Server=localhost\''+dbConfig.HOST+';Database='+dbConfig.DB+'; Trusted_Connection=yes;'
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Country = require('./country.model.js')(sequelize, DataTypes);
db.City = require('./city.model.js')(sequelize, DataTypes);
db.CardGroups = require('./cardGroups.model.js')(sequelize, DataTypes);
db.Partner = require('./partner.model.js')(sequelize, DataTypes);
db.Address = require('./address.model.js')(sequelize, DataTypes);
db.Attachment = require('./attachment.model.js')(sequelize, DataTypes);
db.AttachmentLine = require('./attachmentLine.model.js')(sequelize, DataTypes);
db.Territory = require('./territory.model.js')(sequelize, DataTypes);
db.Currency = require('./currency.model.js')(sequelize, DataTypes);
db.ItemGroup = require('./itemGroup.model.js')(sequelize, DataTypes);
db.IGN1 = require('./IGN1.model.js')(sequelize, DataTypes);
db.OIGN = require('./OIGN.model.js')(sequelize, DataTypes);
db.WTR1 = require('./WTR1.model.js')(sequelize, DataTypes);
db.OWTR = require('./OWTR.model.js')(sequelize, DataTypes);
db.ORIN = require('./ORIN.model.js')(sequelize, DataTypes);
db.RIN1 = require('./RIN1.model.js')(sequelize, DataTypes);
db.Famille = require('./famille.model.js')(sequelize, DataTypes);
db.PCH1 = require('./PCH1.model.js')(sequelize, DataTypes);
db.OPCH = require('./OPCH.model.js')(sequelize, DataTypes);
db.POR1 = require('./POR1.model.js')(sequelize, DataTypes);
db.OPOR = require('./OPOR.model.js')(sequelize, DataTypes);
db.PDN1 = require('./PDN1.model.js')(sequelize, DataTypes);
db.OPDN = require('./OPDN.model.js')(sequelize, DataTypes);
db.ORPC = require('./ORPC.model.js')(sequelize, DataTypes);
db.RPC1 = require('./RPC1.model.js')(sequelize, DataTypes);
db.ORDR = require('./ORDR.model.js')(sequelize, DataTypes);
db.RDR1 = require('./RDR1.model.js')(sequelize, DataTypes);
db.SousFamille = require('./SousFamille.model.js')(sequelize, DataTypes);
db.UM = require('./UM.model.js')(sequelize, DataTypes);
db.IGE1 = require('./IGE1.model.js')(sequelize, DataTypes);
db.OIGE = require('./OIGE.model.js')(sequelize, DataTypes);
db.IQR1 = require('./IQR1.model.js')(sequelize, DataTypes);
db.OIQR = require('./OIQR.model.js')(sequelize, DataTypes);
db.RDN1 = require('./RDN1.model.js')(sequelize, DataTypes);
db.RDP1 = require('./RDP1.model.js')(sequelize, DataTypes);

db.ORDN = require('./ORDN.model.js')(sequelize, DataTypes);
db.ODLN = require('./ODLN.model.js')(sequelize, DataTypes);
db.DLN1 = require('./DLN1.model.js')(sequelize, DataTypes);
db.OQUT = require('./OQUT.model.js')(sequelize, DataTypes);
db.QUT1 = require('./QUT1.model.js')(sequelize, DataTypes);
db.ORDR = require('./ORDR.model.js')(sequelize, DataTypes);
db.ORPD = require('./ORPD.model.js')(sequelize, DataTypes);
db.OINV = require('./OINV.model.js')(sequelize, DataTypes);
db.INV1 = require('./INV1.model.js')(sequelize, DataTypes);
db.Warehouse = require('./Warehouse.model.js')(sequelize, DataTypes);
db.Item = require('./Item.model.js')(sequelize, DataTypes);
db.Tax = require('./tax.model.js')(sequelize, DataTypes);
db.Salaries = require('./Salaries.model.js')(sequelize, DataTypes);
db.Stock = require('./Stock.model.js')(sequelize, DataTypes);

db.PriceList = require('./pricelist.model.js')(sequelize, DataTypes);
db.PriceListLine = require('./pricelistLines.model.js')(sequelize, DataTypes);
db.Stock = require('./Stock.model.js')(sequelize, DataTypes);



db.OINV.hasMany(db.INV1, { foreignKey: 'DocEntry' });
db.INV1.belongsTo(db.OINV, { foreignKey: 'DocEntry' });


db.INV1.belongsTo(db.Item, { foreignKey: 'ItemCode', targetKey: 'ItemCode' });
db.Item.hasMany(db.INV1, { foreignKey: 'ItemCode', sourceKey: 'ItemCode' });






db.ORIN.hasMany(db.RIN1, { foreignKey: 'DocEntry' });
db.RIN1.belongsTo(db.ORIN, { foreignKey: 'DocEntry' });

db.RIN1.belongsTo(db.Item, { foreignKey: 'ItemCode', targetKey: 'ItemCode' });
db.Item.hasMany(db.RIN1, { foreignKey: 'ItemCode', sourceKey: 'ItemCode' });



db.Item.belongsTo(db.Famille, { foreignKey: 'CodeFamille', targetKey: 'CodeFamille'});
db.Famille.hasMany(db.Item, { foreignKey: 'CodeFamille', sourceKey: 'CodeFamille' });





db.AttachmentLine.belongsTo(db.Attachment);
db.Attachment.hasMany(db.AttachmentLine);

db.PriceListLine.belongsTo(db.PriceList);
db.PriceList.hasMany(db.PriceListLine);


module.exports = db;
