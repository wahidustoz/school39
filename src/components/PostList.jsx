import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  IconButton
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getCachedData, setCachedData, CACHE_KEYS, getImageUrl } from '../utils/storage';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        console.log('🔄 Starting to load posts...');
        
        // First try to get from cache
        const cachedPosts = getCachedData(CACHE_KEYS.POSTS_LIST);
        console.log('🔍 Checking cache for posts:', !!cachedPosts);
        
        if (cachedPosts) {
          console.log('📦 Posts loaded from local storage');
          // Ensure cached posts are also sorted by date (newest first)
          const sortedCachedPosts = cachedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(sortedCachedPosts);
          setLoading(false);
          return;
        }
        
        // If not in cache, fetch from server
        console.log('🌐 Posts loaded from server');
        const response = await fetch('/posts/posts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        // Sort posts by date (newest first) and add base path to image URLs
        const postsWithFixedImages = data
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
          .map(post => ({
            ...post,
            thumbnail: getImageUrl(post.thumbnail)
          }));
        setPosts(postsWithFixedImages);
        
        // Save to cache
        setCachedData(CACHE_KEYS.POSTS_LIST, data);
        console.log('💾 Posts saved to local storage');
        
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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

  const handleScroll = (direction) => {
    const container = document.getElementById('posts-scroll-container');
    if (container) {
      const scrollAmount = 320; // Card width + gap
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < (posts.length * 320) - 1200; // Approximate

  if (loading) {
    return (
      <Box
        id="posts"
        sx={{
          py: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
            Yangiliklar yuklanmoqda...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id="posts"
      sx={{
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom
          sx={{ 
            mb: 5,
            fontWeight: 400,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'primary.main',
            textAlign: 'center'
          }}
        >
          So'nggi yangiliklar
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Left scroll button */}
          <IconButton
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'background.paper',
              },
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          {/* Right scroll button */}
          <IconButton
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'background.paper',
              },
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ChevronRight />
          </IconButton>

          {/* Scrollable container */}
          <Box
            id="posts-scroll-container"
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              pb: 2,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {posts.map((post) => (
              <Card
                key={post.slug}
                component={Link}
                to={`/posts/${post.slug}`}
                sx={{
                  minWidth: 300,
                  maxWidth: 300,
                  height: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  outline: 'none',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  }
                }}
              >
                {post.thumbnail && (
                  <Box
                    sx={{
                      height: 180,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={post.thumbnail}
                      alt={post.title}
                      sx={{ 
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  </Box>
                )}
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '1.1rem',
                        mb: 1.5,
                        color: 'text.primary',
                        '&:hover': {
                          color: 'text.primary',
                        }
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.description}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.disabled',
                      fontSize: '0.75rem',
                      textAlign: 'right',
                      mt: 1
                    }}
                  >
                    {formatDate(post.date)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PostList;
