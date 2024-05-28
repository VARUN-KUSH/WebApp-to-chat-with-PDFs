import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    pdfEmbeddings: {
        type: 
    }
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true