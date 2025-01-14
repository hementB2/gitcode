const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Test Data
  for (const project of projectData) {
    await Project.create({
      ...project,
    });
  }

  process.exit(0);
};

seedDatabase();
