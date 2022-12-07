const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt')

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    }
},
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData
            }
        },

        async beforeUpdate(userData) {
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData;
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
