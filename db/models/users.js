const common = require('../../helpers/common');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true},
    email: { type: DataTypes.STRING(60), allowNull: false},
    name: { type: DataTypes.STRING(60), allowNull: false},
    role: { type: DataTypes.STRING(10), allowNull: false},
    password: { type: DataTypes.STRING(300), allowNull: false},
    resetPwdHash: { type: DataTypes.STRING(300), allowNull: false, defaultValue: ''},
    profileimage: { type: DataTypes.STRING(300)},
    updated_at: { type: Date, allowNull: false, defaultValue: new Date()},
    created_at: { type: Date, allowNull: false, defaultValue: new Date()},
  }, {tableName: 'user',
    timestamps: false
  });
};
