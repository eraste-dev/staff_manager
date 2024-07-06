import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
}));

// ----------------------------------------------------------------------

BookingWidgetSummary.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
};

export default function BookingWidgetSummary({ title, icon }) {
  return (
    <RootStyle>
      <div>
        <Typography variant="h5" sx={{ textTransform: 'initial' }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  );
}
