// @mui
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
import EmptyContent from 'src/components/EmptyContent';
//

// ----------------------------------------------------------------------

TableUserRequestNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableUserRequestNoData({ isNotFound }) {
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={9}>
            <EmptyContent
              title="No Data"
              sx={{
                '& span.MuiBox-root': { height: 160 },
              }}
            />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}
