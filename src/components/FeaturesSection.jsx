import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Container,
  Avatar
} from '@mui/material';
import {
  SportsSoccer,
  School,
  Computer,
  Security,
  LibraryBooks,
  Restaurant,
  LocalHospital,
  Psychology
} from '@mui/icons-material';

function FeaturesSection() {
  const features = [
    {
      icon: <SportsSoccer sx={{ fontSize: 40 }} />,
      title: "Zamonaviy sport maydoni",
      description: "Futbol, basketbol va voleybol maydonlari bilan jihozlangan sport kompleksi"
    },
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: "Malakali o'qituvchilar",
      description: "Yuqori malakali va tajribali o'qituvchilar jamoasi"
    },
    {
      icon: <Computer sx={{ fontSize: 40 }} />,
      title: "Zamonaviy kompyuter sinflari",
      description: "Eng so'nggi texnologiyalar bilan jihozlangan informatika sinflari"
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Xavfsiz muhit",
      description: "O'quvchilar uchun xavfsiz va qulay ta'lim muhiti"
    },
    {
      icon: <LibraryBooks sx={{ fontSize: 40 }} />,
      title: "Keng kutubxona",
      description: "Zamonaviy va klassik adabiyotlar bilan boy kutubxona"
    },
    {
      icon: <Restaurant sx={{ fontSize: 40 }} />,
      title: "Sog'lom ovqatlanish",
      description: "Sog'lom va mazali ovqatlar bilan ta'minlangan oshxona"
    },
    {
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      title: "Tibbiy xizmat",
      description: "Maktab shifoxonasi va malakali tibbiy xodimlar"
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: "Psixologik yordam",
      description: "O'quvchilar uchun psixologik maslahat va yordam xizmati"
    }
  ];

  return (
    <Box sx={{ py: 6 }}>
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
          Maktab imkoniyatlari
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 4 } }}>
          {features.map((feature, index) => (
            <Box key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 700,
                      minHeight: 56,
                      color: 'primary.main',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
