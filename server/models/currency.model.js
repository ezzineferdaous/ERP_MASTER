
module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define("Currency", {

      Code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      }

    });
      
    return Currency;
  };