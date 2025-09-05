#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle specific routes
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/sitemap.xml'));
});

// Handle all other routes with index.html (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 School 39 server running on http://localhost:${port}`);
  console.log(`🏠 Home page: http://localhost:${port}/`);
  console.log(`📝 Posts: http://localhost:${port}/posts/`);
  console.log(`🗺️  Sitemap: http://localhost:${port}/sitemap.xml`);
});
