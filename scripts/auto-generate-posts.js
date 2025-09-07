import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Posts directory path
const postsDir = path.join(__dirname, '../public/posts');
const postsJsonPath = path.join(postsDir, 'posts.json');

// Function to get Git commit date for a file
function getGitCommitDate(filePath) {
  try {
    // Get the date of the first commit that added this file
    const gitCommand = `git log --follow --format="%aI" --reverse "${filePath}" | head -1`;
    const gitDate = execSync(gitCommand, { encoding: 'utf8', cwd: path.dirname(filePath) }).trim();
    
    if (gitDate) {
      // Return the full ISO timestamp (includes date, time, and timezone)
      return new Date(gitDate).toISOString();
    }
  } catch (error) {
    console.warn(`Could not get Git commit date for ${filePath}:`, error.message);
  }
  
  // Fallback to file system date
  try {
    const stats = fs.statSync(filePath);
    return stats.birthtime.toISOString();
  } catch (error) {
    console.warn(`Could not get file stats for ${filePath}:`, error.message);
    return new Date().toISOString(); // Ultimate fallback to now
  }
}

// Function to extract metadata from markdown file
function extractMetadata(markdownContent, filePath) {
  const lines = markdownContent.split('\n');
  let title = '';
  let description = '';
  let thumbnail = '';

  // Get the commit timestamp for this file (full ISO timestamp)
  const timestamp = getGitCommitDate(filePath);

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

  return { title, description, timestamp, thumbnail };
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
        timestamp: metadata.timestamp,
        date: metadata.timestamp.split('T')[0], // Keep date for backward compatibility
        thumbnail: thumbnail || '/img/default-post.jpg' // Default thumbnail
      };

      posts.push(post);
      console.log(`✅ Generated post: ${slug}`);
    }

    // Sort posts by timestamp (newest first)
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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