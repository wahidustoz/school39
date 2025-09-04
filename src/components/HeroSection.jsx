import { Box, Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion'; // animatsiya uchun

function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `
      linear-gradient(rgba(9, 9, 9, 0.55), rgba(14, 14, 14, 0.6)),
      url('/portfolio/4444.png')
    `,
        backgroundSize: "cover", // tasvir butunlay to‘ldiradi
        backgroundPosition: "center", // o‘rtadan joylashadi
        backgroundRepeat: "no-repeat",
        height: { xs: "70vh", sm: "72vh", md: "85vh" }, // telefon -> to‘liq ekran
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: { xs: 0, md: 2 }, // mobil uchun radius olib tashlanadi
        mb: 8,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          
          sx={{
            maxWidth: { xs: '640px', md: '60%' },
            textAlign: { xs: 'center', md: 'left' },
            mx: { xs: 'auto', md: 0 },
            mt: { xs: 5, sm: 6, md: 10 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.4rem', md: '3.75rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              textShadow: '0px 4px 14px rgba(0,0,0,0.7)',
            }}
          >
            Kelajakni <span style={{ color: '#42a5f5' }}>biz bilan</span> quring!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.35rem' },
              fontWeight: 400,
              mb: 4,
              opacity: 0.95,
              textShadow: '0px 2px 6px rgba(0,0,0,0.6)',
            }}
          >
            39-sonli maktab — ta'lim va tarbiyaning eng yaxshi markazi
          </Typography>

          <Button
            component={motion.a}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault(); // default sakrashni bloklaymiz
              const section = document.getElementById("posts");
              section?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            variant="contained"
            size="large"
            sx={{
              px: { xs: 3, md: 5 },
              py: { xs: 1.2, md: 1.5 },
              fontSize: { xs: '1rem', md: '1.15rem' },
              fontWeight: 600,
              borderRadius: "50px",
              textTransform: "none",
              color: "white",
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              boxShadow: "0 6px 20px rgba(25, 118, 210, 0.5)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(25, 118, 210, 0.6)",
                color: "white",
              },
            }}
          >
            So'nggi yangiliklar
          </Button>
        </Box>
      </Container >
    </Box >
  );
}

export default HeroSection;
