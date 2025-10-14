const express = require('express');
const router = express.Router();

let posts = [];
let postId = 1;

router.get('/', (req, res) => {
  res.render('index', { posts });
});

router.post('/add', (req, res) => {
  const { author, title, content } = req.body;
  posts.push({
    id: postId++,
    author,
    title,
    content,
    createdAt: new Date()
  });
  res.redirect('/');
});

router.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('edit', { post });
});

router.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

module.exports = router;
