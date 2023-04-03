const { User} = require('../models');
const userData = [
    {
        "username": "Addis",
        "password": "1234"
    },
    {
        "username": "Gelete",
        "password": "1234"
    },

];
const seedUsers = () => User.bulkCreate(userData,{
    individualHooks: true,
    returning: true
});
module.exports = seedUsers;
 
