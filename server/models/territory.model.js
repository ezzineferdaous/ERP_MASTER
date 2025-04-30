
module.exports = (sequelize, DataTypes) => {
    const Territory = sequelize.define("Territory", {
      descript: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Veuillez saisir le Nom Territoir"
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Nom Territoir"
          }
        }
      }
    });
      
    return Territory;
  };