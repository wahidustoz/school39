import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import theme from './styles/theme';
import HeroSection from './components/HeroSection';
import PostList from './components/PostList';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import PostRenderer from './components/PostRenderer';

function App() {
  const basename = import.meta.env.PROD ? '/school39' : '';
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={
            <Box>
              {/* Hero full-width */}
              <HeroSection />
              {/* Constrain inner sections */}
              <Container maxWidth={false} sx={{ my: 4, px: { xs: 2, sm: 3, md: 4 } }}>
                <PostList />
                <FeaturesSection />
                <ContactSection />
              </Container>
            </Box>
          } />
          <Route path="/posts/:slug" element={<PostRenderer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;