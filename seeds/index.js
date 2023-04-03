const sequelize = require('../config/connection');
const seedUsers = require('./userdata');
const seedPosts = require('./postdata');
const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    process.exit(0);
};
seedAll();