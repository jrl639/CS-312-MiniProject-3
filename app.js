const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Needed for React frontend

const app = express();
const PORT = 3000;

let posts = [];
let postId = 1;

app.use(cors());
app.use(bodyParser.json()); // JSON for React
app.use(bodyParser.urlencoded({ extended: true }));

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Create a post
app.post('/posts', (req, res) => {
  const { author, title, content } = req.body;
  const newPost = {
    id: postId++,
    author,
    title,
    content,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.json(newPost);
});

// Get single post by ID (for editing)
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Update post
app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.title = title;
  post.content = content;
  res.json(post);
});

// Delete post
app.delete('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id == req.params.id);
  if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

  posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
