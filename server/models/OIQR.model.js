// OIQR.model.js
module.exports = (sequelize, DataTypes) => {
    const OIQR = sequelize.define("OIQR", {
        DocEntry: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        DocNum: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        DocDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Hour: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        Comment: {
            type: DataTypes.STRING(200)
        },
        UserSign: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        DocStatus: {
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isIn: [['C', 'O','V']] 
            }
        },
        WhsCode: {
            type: DataTypes.STRING(15),
            allowNull: false,

        },
        PriceList: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return OIQR;
};
