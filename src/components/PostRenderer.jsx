import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getCachedData, setCachedData, CACHE_KEYS, getImageUrl } from '../utils/storage';

function PostRenderer() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log(`🔄 Starting to load post: ${slug}`);
        
        // Check cache for post metadata and content
        const cachedPost = getCachedData(CACHE_KEYS.POST_METADATA + slug);
        const cachedContent = getCachedData(CACHE_KEYS.POST_CONTENT + slug);
        console.log(`🔍 Checking cache for post "${slug}":`, { hasPost: !!cachedPost, hasContent: !!cachedContent });
        
        if (cachedPost && cachedContent) {
          console.log(`📦 Post "${slug}" loaded from local storage`);
          setPost(cachedPost);
          setContent(cachedContent);
          setLoading(false);
          return;
        }
        
        // Fetch posts metadata
        console.log(`🌐 Post "${slug}" metadata loaded from server`);
        const postsResponse = await fetch('/posts/posts.json');
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts metadata');
        }
        
        const posts = await postsResponse.json();
        const currentPost = posts.find(p => p.slug === slug);
        
        if (!currentPost) {
          setError('Post topilmadi');
          return;
        }
        
        // Fix image URL for production
        const postWithFixedImage = {
          ...currentPost,
          thumbnail: getImageUrl(currentPost.thumbnail)
        };
        
        setPost(postWithFixedImage);
        setCachedData(CACHE_KEYS.POST_METADATA + slug, postWithFixedImage);
        console.log(`💾 Post "${slug}" metadata saved to local storage`);
        
        // Fetch markdown content
        console.log(`🌐 Post "${slug}" content loaded from server`);
        const contentResponse = await fetch(`/posts/${slug}.md`);
        if (!contentResponse.ok) {
          setError('Post kontenti topilmadi');
          return;
        }

        // Guard: sometimes dev server returns index.html instead of markdown
        const contentType = contentResponse.headers.get('content-type') || '';
        const markdownContent = await contentResponse.text();
        const looksLikeHtml = /<\!doctype html>|<html[\s\S]*?>/i.test(markdownContent);
        if (looksLikeHtml || (!contentType.includes('text/markdown') && !contentType.includes('text/plain'))) {
          setError('Post kontenti topilmadi (MD fayl mos kelmadi)');
          return;
        }

        setContent(markdownContent);
        setCachedData(CACHE_KEYS.POST_CONTENT + slug, markdownContent);
        console.log(`💾 Post "${slug}" content saved to local storage`);
        
      } catch (err) {
        setError('Post yuklanmadi');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
      'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month}, ${year}`;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Post yuklanmoqda...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button component={Link} to="/" variant="contained">
          Bosh sahifaga qaytish
        </Button>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Post topilmadi
        </Alert>
        <Button component={Link} to="/" variant="contained">
          Bosh sahifaga qaytish
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}
      >
        <Button 
          component={Link} 
          to="/" 
          variant="text" 
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'transparent'
            }
          }}
        >
          ← Bosh sahifaga qaytish
        </Button>
        
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          {formatDate(post.date)}
        </Typography>
      </Box>
      
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>

        {post.thumbnail && (
          <Box 
            sx={{ 
              mb: 6,
              mx: { xs: -2, sm: -4, md: 0 },
              overflow: 'hidden'
            }}
          >
            <img 
              src={post.thumbnail} 
              alt={post.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Box>
        )}

        <Box 
          sx={{ 
            '& h1': {
              fontSize: { xs: '1.75rem', sm: '2rem' },
              fontWeight: 400,
              color: 'text.primary',
              mt: 4,
              mb: 2,
              lineHeight: 1.3
            },
            '& h2': {
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              fontWeight: 400,
              color: 'text.primary',
              mt: 3.5,
              mb: 1.5,
              lineHeight: 1.3
            },
            '& h3, & h4, & h5, & h6': {
              fontSize: { xs: '1.25rem', sm: '1.4rem' },
              fontWeight: 400,
              color: 'text.primary',
              mt: 3,
              mb: 1.5,
              lineHeight: 1.4
            },
            '& p': {
              mb: 2.5,
              lineHeight: 1.8,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'text.primary',
              fontWeight: 400
            },
            '& ul, & ol': {
              mb: 2.5,
              pl: 2.5,
              '& li': {
                mb: 1,
                lineHeight: 1.7,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: 'text.primary'
              }
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              mb: 3,
              display: 'block',
              mx: 'auto'
            },
            '& blockquote': {
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              pl: 2.5,
              ml: 0,
              mr: 0,
              my: 3,
              fontStyle: 'italic',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              py: 2,
              borderRadius: '0 8px 8px 0',
              '& p': {
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.05rem' }
              }
            },
            '& code': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.9em',
              color: 'primary.light'
            },
            '& pre': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              mb: 3,
              '& code': {
                backgroundColor: 'transparent',
                padding: 0
              }
            }
          }}
        >
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => (
                <img 
                  src={getImageUrl(src)} 
                  alt={alt}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    marginBottom: '24px',
                    display: 'block',
                    margin: '24px auto'
                  }}
                />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
    </Container>
  );
}

export default PostRenderer;
