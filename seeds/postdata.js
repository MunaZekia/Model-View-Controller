const {Post} = require('../models');
const postData = [

    {
        "title": "My first post",
        "content": "This is my first post",
        "user_id": 1
    },
    {
        "title": "My second post",
        "content": "This is my second post",
        "user_id": 2
    }
];
const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;