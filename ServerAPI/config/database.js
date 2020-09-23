const Sequelize = require('sequelize');

module.exports = new Sequelize({ 
    dialect: 'sqlite',
    storage: 'C://var/Molteplice/Molteplice.db',
});