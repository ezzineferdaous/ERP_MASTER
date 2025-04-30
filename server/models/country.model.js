
module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("Country", {

      Code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: 'cntr_uni' 
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      }

    });
      
    return Country;
  };