'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
     user.hasMany(models.project, {foreignKey: 'createdBy', sourceKey: 'id',})
    }
  }

  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: Sequelize.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: "userType cannot be null"
        },
        notEmpty: {
          msg: 'userType cannot be empty'
        }
      }
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "first Name cannot be null"
        },
        notEmpty: {
          msg: 'first Name cannot be empty'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "last Name cannot be null"
        },
        notEmpty: {
          msg: 'last Name cannot be empty'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be null"
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: "Invalid email id"
        }
      },
      // unique: {
      //   args: true,
      //   msg: 'Email address already in use!'  // This message will be passed when email is not unique
      // },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null"
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        },
      }
    },
    confirmPassword: {
      type: Sequelize.VIRTUAL,
      set(value) { 
        if (value.length < 6) {
          throw new AppError('Password must be greater than 6 characters', 400);
        }
        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError('Password and confirm password do not match', 400);
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    },
  }, { 
    paranoid: true,
    freezeTableName: true,
    sequelize, // this part was misplaced
    modelName: 'user',
  });

  return user;
};
