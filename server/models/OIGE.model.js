// OIGE.model.js
module.exports = (sequelize, DataTypes) => {
    const OIGE = sequelize.define("OIGE", {
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
        Comment: {
            type: DataTypes.STRING(200),
            allowNull:false,
        },
        UserSign: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return OIGE;
};
