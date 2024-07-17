import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import GuestGuard from 'src/guards/GuestGuard';
import useResponsive from 'src/hooks/useResponsive';

// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../routes/paths';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          <HeaderStyle>
            <div>{''}</div>
            {/* <Logo /> */}

            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Vous n'avez pas de compte ?{/* Don’t have an account? {''} */}
                <NextLink href={PATH_AUTH.registerUnprotected} passHref>
                  <Link variant="subtitle2">Commencer</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Se connecter
                  </Typography>
                </Box>
              </Stack>

              <LoginForm />

              {!smUp && (
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <NextLink href={PATH_AUTH.registerUnprotected} passHref>
                    <Link variant="subtitle2">Get started</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
