const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

const Note = sequelize.define('note', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    header: {type: DataTypes.STRING, allowNull: false},
    body: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING, defaultValue: "#ffffff"},
    date: {type: DataTypes.DATE, allowNull: false},
    lastDate: {type: DataTypes.DATE, allowNull: false}
})

const Catalog = sequelize.define('catalog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Note, {
    onDelete: 'cascade',
    foreignKey: {
        allowNull: false
    }
})
Note.belongsTo(User)

User.hasMany(Catalog, {
    onDelete: 'cascade',
    foreignKey: {
        allowNull: false
    }
})
Catalog.belongsTo(User)

Catalog.hasMany(Note, {
    onDelete: 'cascade',
    foreignKey: {
        allowNull: false
    }
})
Note.belongsTo(Catalog)

module.exports = {
    User,
    Catalog,
    Note
}