// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';
import { useSelector } from 'react-redux';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useSelector((state) => state.user);

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <DocIllustration sx={{ width: 1 }} />

      {user?.isAdmin && (
        <>
          <div>
            <Typography gutterBottom variant="subtitle1">
              Salut, {user?.premp} {user?.nomemp}
            </Typography>
          </div>
          <Iconify
            icon={user?.isAdmin ? 'eva:checkmark-circle-fill' : 'eva:close-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              // ...(!user?.isAdmin && { color: 'error.main' }),
            }}
          />
          Vous êtes connecté en mode <strong>{user?.isAdmin ? 'administrateur' : 'utilisateur'}</strong>
        </>
      )}

      {/* <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
        Documentation
      </Button> */}
    </Stack>
  );
}
