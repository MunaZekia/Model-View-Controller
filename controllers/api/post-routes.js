const router=require('express').Router();
const {Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/:id/comments',withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({plain: true});
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            }
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
      
        
        res.render('singlepost', {
            post,
            comments,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    console.log("did i get the data from the form?",req.body);
    //this is where I created the post
    try {
        const newpost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id

        });
        res.status(200).json(newpost);
    }
    catch (err) {
        res.status(400).json(err);
    }
    
});

module.exports = router;