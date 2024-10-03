'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      project.belongsTo(models.user, {foreignKey: 'createdBy'})
    }
  }
  project.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title cannot be null"
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    isFeatured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true,false]],
          msg: 'is Featured value must be true of false'
        }
      }
    },
    productImage: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price cannot be null"
        },
        isDecimal: {
          msg: 'price value must be in decimal empty'
        }
      }
    },
    shortDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "short description cannot be null"
        },
        notEmpty: {
          msg: 'short description cannot be empty'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cannot be null"
        },
        notEmpty: {
          msg: 'Description cannot be empty'
        }
      }
    },
    productUrl: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "productUrl cannot be null"
        },
        notEmpty: {
          msg: 'productUrl cannot be empty'
        },
        isUrl: {
          msg: 'Invalid Product Url String'
        }
      }
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
          notNull: {
              msg: 'category cannot be null',
          },
      },
  },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
          notNull: {
              msg: 'tags cannot be null',
          },
      },
  },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt:{
      type: Sequelize.DATE
    }
  }, { 
    paranoid: true,
    freezeTableName: true,
    sequelize, // this part was misplaced
    modelName: 'project',
  });
  return project;
};