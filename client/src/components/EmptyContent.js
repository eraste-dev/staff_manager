import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
//
import Image from './Image';
import SvgIconStyle from './SvgIconStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
};

export default function EmptyContent({ title, description, img, ...other }) {
  const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

  return (
    <RootStyle {...other}>
      {/* <Image
        disabledEffect
        visibleByDefault
        alt="empty content"
        src={img || getIcon('no_content')}
        sx={{ height: 140, mb: 3 }}
      /> */}

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
