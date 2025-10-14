const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let posts = [];
let postId = 1;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Home
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Post creation
app.post('/add', (req, res) => {
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

// edit form
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

// Post edit
app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

// Post delete
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});