# Image Handling Guide

This project uses an organized image handling system for posts that makes it easy to manage images for your blog posts.

## Image Organization Structure

```
public/
├── posts/
│   ├── {post-slug}/
│   │   └── images/
│   │       ├── header.png     # Post thumbnail/header image
│   │       ├── image1.jpg     # Additional post images
│   │       ├── image2.png     # Additional post images
│   │       └── ...
│   └── {post-slug}.md         # Post markdown file
└── img/                       # Legacy/general images
    └── ...
```

## How to Add Images to Posts

### 1. Header/Thumbnail Images

For each post, you can add a header image that will be used as the thumbnail in the post list and at the top of the post page.

**Steps:**
1. Create a folder: `public/posts/{your-post-slug}/images/`
2. Add your header image as `header.png`, `header.jpg`, `header.jpeg`, or `header.webp`
3. The system will automatically detect and use this image

**Example:**
```
public/posts/my-awesome-post/images/header.png
```

### 2. Additional Images in Post Content

You can add multiple images to your posts and reference them in your markdown content.

**Steps:**
1. Add images to: `public/posts/{your-post-slug}/images/`
2. Reference them in your markdown using relative paths:

```markdown
# My Awesome Post

Here's the main content...

![Description](./images/image1.jpg)

More content...

![Another image](./images/image2.png)
```

### 3. Legacy Image Support

The system also supports the legacy `/img/` folder structure:
- Place images in `public/img/`
- Name them with your post slug: `{post-slug}.png`
- The system will find them automatically

## Image Guidelines

### Recommended Formats
- **PNG**: Best for graphics, logos, images with transparency
- **JPG/JPEG**: Best for photographs
- **WebP**: Best for modern browsers (smaller file sizes)

### Recommended Sizes
- **Header images**: 1200x600px (2:1 ratio) for best results
- **Content images**: Max width 800px for optimal loading
- **File size**: Keep under 500KB for fast loading

### File Naming
- Use kebab-case (lowercase with dashes): `my-image-name.jpg`
- Use descriptive names: `new-library-interior.jpg` instead of `img1.jpg`
- Avoid spaces and special characters

## How It Works

1. When you create a new post markdown file: `my-new-post.md`
2. Create the corresponding image folder: `public/posts/my-new-post/images/`
3. Add your header image: `public/posts/my-new-post/images/header.png`
4. Run the build script: `npm run generate-posts`
5. The system automatically:
   - Detects your post
   - Finds the header image
   - Updates the posts.json file
   - Makes everything available to the React app

## Example Post Structure

```
public/posts/school-event-2025/
├── images/
│   ├── header.jpg           # Main thumbnail
│   ├── students-photo.jpg   # Referenced in markdown
│   ├── ceremony-hall.png    # Referenced in markdown
│   └── awards-ceremony.jpg  # Referenced in markdown
└── school-event-2025.md     # Post content
```

**In your markdown (`school-event-2025.md`):**

```markdown
# School Event 2025

Our school held an amazing event this year!

![Students gathering](./images/students-photo.jpg)

The ceremony took place in our beautiful hall:

![Ceremony Hall](./images/ceremony-hall.png)

And here are the winners:

![Awards Ceremony](./images/awards-ceremony.jpg)
```

This system makes it easy to:
- Keep images organized per post
- Avoid naming conflicts
- Add multiple images to posts
- Automatically generate thumbnails
- Maintain clean project structure
