import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Pagination,
  Container,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetch('/posts/posts.json')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error loading posts:', error));
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Box
      id="posts"
      sx={{
        py: 6,
        bgcolor: 'linear-gradient(135deg, #f5f7fa 0%, #e6ecf3 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom
          sx={{ 
            mb: 5,
            fontWeight: 800,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'primary.main',
            textAlign: 'center'
          }}
        >
          So‘nggi yangiliklar
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 4 } }}>
          {currentPosts.map((post) => (
            <Box key={post.slug}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                }}
              >
                {post.thumbnail && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.thumbnail}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, md: 3 } }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={formatDate(post.date)}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, md: 3 },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      letterSpacing: '-0.01em',
                      color: 'text.primary'
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      fontSize: { xs: '1rem', md: '1.075rem' },
                      lineHeight: 1.75,
                      mt: 0.5,
                      WebkitLineClamp: { xs: 3, md: 4 },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    to={`/posts/${post.slug}`}
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderRadius: '20px',
                      fontWeight: 600,
                      background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                      '&, &:hover, &:active, &:focus': {
                        color: 'white'
                      },
                      '&:hover': {
                        background: 'linear-gradient(90deg, #1565c0, #1e88e5)'
                      },
                      '&:active': {
                        background: 'linear-gradient(90deg, #0d47a1, #1565c0)'
                      }
                    }}
                  >
                    Batafsil o‘qish
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PostList;
