
module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("City", {

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
      CntCode: {
        type: DataTypes.STRING(3),
        allowNull: false
      }

    });
      
    return City;
  };