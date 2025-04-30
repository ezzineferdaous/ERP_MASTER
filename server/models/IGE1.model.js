// IGE.model.js
module.exports = (sequelize, DataTypes) => {
    const IGE1 = sequelize.define("IGE1", {
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
        Quantity: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        WhsCode: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        Price: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        Discount: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        LineTotal: {
            type: DataTypes.FLOAT(16,2),
            allowNull: false
        },
        UM: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });


    return IGE1;
};
