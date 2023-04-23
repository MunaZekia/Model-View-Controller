const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const dayjs = require("dayjs");

const router = require("express").Router();
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/dashboard", withAuth, async (req, res) => {
  res.render("dashboard", {
    logged_in: req.session.logged_in,
  });
});
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
            model:Comment,
            
        }
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);
    
    //  const commentData = await Comment.findAll({
    //     where: {
    //         post_id: req.params.id
    //     }
    // });
    // let comments = commentData.map((comment) => comment.get({ plain: true }));

    // let newComments = [];
    //  comments.forEach(c => {
    //     c.formattedDate = dayjs(c.date_created).format('MM/DD/YYYY');
    //     newComments.push(c);
    // });

    res.render("singlepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

 router.get("/create-post", withAuth, async (req, res) => {
   res.render("createpost", {});
 });

module.exports = router;
