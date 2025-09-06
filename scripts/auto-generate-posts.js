import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Posts directory path
const postsDir = path.join(__dirname, '../public/posts');
const postsJsonPath = path.join(postsDir, 'posts.json');

// Function to extract metadata from markdown file
function extractMetadata(markdownContent, filePath) {
  const lines = markdownContent.split('\n');
  let title = '';
  let description = '';
  let date = new Date().toISOString(); // Default to current date and time
  let thumbnail = '';

  // Try to get file creation date with time
  try {
    const stats = fs.statSync(filePath);
    date = stats.birthtime.toISOString();
  } catch (error) {
    console.warn(`Could not get file stats for ${filePath}:`, error.message);
  }

  // Extract title from first # heading
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      break;
    }
  }

  // Extract description from first paragraph after title
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && line.trim() && !line.startsWith('#')) {
      description = line.trim();
      break;
    }
  }

  // If no title found, use filename
  if (!title) {
    title = 'Untitled Post';
  }

  // If no description found, use first 100 characters
  if (!description) {
    description = markdownContent.replace(/#+.*\n/g, '').trim().substring(0, 100) + '...';
  }

  return { title, description, date, thumbnail };
}

// Function to scan directory for markdown files
function scanMarkdownFiles() {
  console.log(`🔍 Scanning directory: ${postsDir}`);
  const files = fs.readdirSync(postsDir);
  console.log(`📂 All files in directory:`, files);
  
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  console.log(`📁 Found ${markdownFiles.length} markdown files:`, markdownFiles);
  
  return markdownFiles;
}

// Function to generate posts.json
function generatePostsJson() {
  try {
    const markdownFiles = scanMarkdownFiles();
    const posts = [];

    for (const file of markdownFiles) {
      const slug = file.replace('.md', '');
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const metadata = extractMetadata(content, filePath);
      
      // Check if thumbnail exists - prioritize post-specific images
      const possibleThumbnails = [
        `/posts/${slug}/images/header.jpg`,
        `/posts/${slug}/images/header.png`,
        `/posts/${slug}/images/header.jpeg`,
        `/posts/${slug}/images/header.webp`,
        `/img/${slug}.jpg`,
        `/img/${slug}.png`,
        `/img/${slug}.jpeg`,
        `/img/${slug}.webp`
      ];
      
      let thumbnail = '';
      for (const thumb of possibleThumbnails) {
        const thumbPath = path.join(__dirname, '../public', thumb);
        if (fs.existsSync(thumbPath)) {
          thumbnail = thumb;
          break;
        }
      }

      const post = {
        slug,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        thumbnail: thumbnail || '/img/default-post.jpg' // Default thumbnail
      };

      posts.push(post);
      console.log(`✅ Generated post: ${slug}`);
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Write posts.json
    fs.writeFileSync(postsJsonPath, JSON.stringify(posts, null, 2));
    console.log(`📝 Updated posts.json with ${posts.length} posts`);
    
    return posts;
  } catch (error) {
    console.error('❌ Error generating posts.json:', error);
    return [];
  }
}

// Run if called directly
console.log('🚀 Starting auto-generate-posts script...');
console.log('Current working directory:', process.cwd());

// Check if this is the main module
if (process.argv[1] && process.argv[1].endsWith('auto-generate-posts.js')) {
  console.log('✅ Script called directly, running generatePostsJson...');
  generatePostsJson();
} else {
  console.log('❌ Script not called directly, skipping execution');
}

export { generatePostsJson, scanMarkdownFiles };