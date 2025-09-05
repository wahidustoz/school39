import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Paper,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getCachedData, setCachedData, CACHE_KEYS } from '../utils/storage';

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
        
        setPost(currentPost);
        setCachedData(CACHE_KEYS.POST_METADATA + slug, currentPost);
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
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <Button 
        component={Link} 
        to="/" 
        variant="outlined" 
        sx={{ mb: 3 }}
      >
        ← Bosh sahifaga qaytish
      </Button>
      
      <Paper elevation={2} sx={{ p: { xs: 3, sm: 4 }, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ mb: 3 }}>
          <Chip 
            label={formatDate(post.date)} 
            color="primary" 
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              lineHeight: 1.2,
              letterSpacing: '-0.01em'
            }}
          >
            {post.title}
          </Typography>
        </Box>

        {post.thumbnail && (
          <Box sx={{ mb: 3 }}>
            <img 
              src={post.thumbnail} 
              alt={post.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
        )}

        <Box 
          sx={{ 
            maxWidth: 760,
            mx: 'auto',
            '& h1': {
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
            },
            '& h2': {
              fontSize: { xs: '1.5rem', sm: '1.8rem' },
            },
            '& h3, & h4, & h5, & h6': {
              fontSize: { xs: '1.25rem', sm: '1.35rem' },
            },
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              color: 'primary.main',
              fontWeight: 600,
              mt: 3,
              mb: 2,
              lineHeight: 1.25
            },
            '& p': {
              mb: 2,
              lineHeight: 1.8,
              fontSize: { xs: '1rem', sm: '1.05rem' },
              color: 'text.primary'
            },
            '& ul, & ol': {
              mb: 2,
              pl: 3,
            },
            '& li': {
              mb: 1,
              lineHeight: 1.7
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              mb: 2,
            },
            '& blockquote': {
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              pl: 2,
              ml: 0,
              fontStyle: 'italic',
              bgcolor: 'background.default',
              py: 1,
              borderRadius: '0 4px 4px 0',
            }
          }}
        >
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => (
                <img 
                  src={src} 
                  alt={alt}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginBottom: '16px',
                  }}
                />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
}

export default PostRenderer;
