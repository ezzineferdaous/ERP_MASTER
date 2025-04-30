
module.exports = (sequelize, DataTypes) => {
    const Tax = sequelize.define("Tax", {

      Code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      Rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      } ,
      Active : {
        type: DataTypes.CHAR(1),
        validate: { isIn: { args: [['Y', 'N']], msg: "Les valeur autorisée sont (Y, N)" } },
        defaultValue: "Y"
      }

    });
      
    return Tax;
  };