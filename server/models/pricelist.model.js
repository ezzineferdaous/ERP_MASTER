
module.exports = (sequelize, DataTypes) => {
    const PriceList = sequelize.define("PriceList", {

      Name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
      },
      Status: {
        type: DataTypes.STRING(20),
        validate: { isIn: { args: [['Actif', 'Inactif']], msg: "Les valeur autorisée sont (Actif, Inactif)" } },
        defaultValue: "Actif",
        allowNull: false
      },
      TTC : {
        type: DataTypes.CHAR(1),
        validate: { isIn: { args: [['Y', 'N']], msg: "Les valeur autorisée sont (Y, N)" } },
        defaultValue: "Y"
      }
      
    });
      
    return PriceList;
  };