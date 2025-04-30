// IQR1.model.js
module.exports = (sequelize, DataTypes) => {
    const IQR1 = sequelize.define("IQR1", {
        DocEntry: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        LineNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false, 
        },
        ItemCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Veuillez saisir le Code Article',
                },
                notEmpty: {
                  args: true,
                  msg: 'Veuillez saisir le Code Article',
                },
              }
            
        },
        ItemName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Veuillez saisir le Nom Article',
                },
                notEmpty: {
                  args: true,
                  msg: 'Veuillez saisir le Nom Article',
                },
              }
        },
        OnHandBef: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        CountQuantity: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        Quantity: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        UM: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Price: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        LineTotal: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        TotalCompte: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
    });


    return IQR1;
};
