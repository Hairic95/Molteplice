const { Sequelize, Op, Model, DataTypes, UUIDV4 } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
        IdUser: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false,
            unique: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                console.log(bcrypt.hash(value, bcrypt.genSaltSync(10)));
                this.setDataValue('Password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
            }
        },
        CreationDate: {
            type: DataTypes.DATE,
            defaultValue: new Date(Date.now()),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

module.exports = User;