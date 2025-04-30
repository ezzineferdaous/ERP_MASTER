module.exports = (sequelize, DataTypes) => {

    const PriceListLines = sequelize.define("PriceListLines", {

      ItemCode: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(15,5),
        allowNull: false
      }

    });    
    return PriceListLines;

  };

 
