module.exports = (sequelize, DataTypes) => {
  const ItemGroup = sequelize.define('ItemGroup', {
    CodeGroupe: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Veuillez saisir le Code de groupe',
        },
        notEmpty: {
          args: true,
          msg: 'Veuillez saisir le Code de groupe',
        },
      },
    },
    NomGroupe: {
      type: DataTypes.STRING(100),
      allowNull: false,
      notEmpty: true,
      unique: true,
      validate: {
        notNull: {
          msg: 'Veuillez saisir le Nom de groupe',
        },
        notEmpty: {
          args: true,
          msg: 'Veuillez saisir le Nom de groupe',
        },
      },
    },
    CmptCharges: {
      type: DataTypes.STRING(100),
    },
    CmptProduit: {
      type: DataTypes.STRING(100),
    },
  });

  return ItemGroup;
};
