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
    date: {type: DataTypes.DATE, allowNull: false},
    lastDate: {type: DataTypes.DATE, allowNull: false}
})

User.hasMany(Note, {
    onDelete: 'cascade',
    foreignKey: {
        allowNull: false
    }
})
Note.belongsTo(User)

module.exports = {
    User,
    Note
}