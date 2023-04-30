const router = require('express').Router();
const { Post, User, Comment } = require('./models');

// Render the homepage with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render the single post page
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render the sign-up page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
