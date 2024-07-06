// @mui
import {
  Grid,
  Container,
  Box,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { BookingWidgetSummary } from '../../sections/@dashboard/general/booking';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
  DocIllustration,
  MaintenanceIllustration,
  MotivationIllustration,
  OrderCompleteIllustration,
  PlanPremiumIcon,
  SentIcon,
  SeoIllustration,
} from '../../assets';
import { useState } from 'react';
import RequestFormBase from './create-request-form/RequestFormBase';

// ----------------------------------------------------------------------

GeneralBooking.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();
  const md = 6;

  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    title: "Demande d'absences",
    total: "Demande d'absence",
    icon: <BookingIllustration />,
  });
  const handleClickOpen = (item) => {
    if (item) setRequestData(item);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const BookingWidgetSummaryArray = [
    {
      title: "Demande d'absences",
      total: "Demande d'absence",
      icon: <BookingIllustration />,
    },
    {
      title: "Demande d'autorisations de missions",
      total: 311000,
      icon: <CheckOutIllustration />,
    },
    {
      title: 'Demande de départ en congés',
      total: 124000,
      icon: <CheckInIllustration />,
    },
    //
    //
    {
      title: "Demande d'expression de besoins",
      total: 714000,
      icon: <SeoIllustration />,
    },
    {
      title: 'Demande de rallonge de crédit téléphonique',
      total: 311000,
      icon: <SentIcon />,
    },
    {
      title: 'Demande de crédit sur les unités multifonctions XEROX',
      total: 124000,
      icon: <PlanPremiumIcon />,
    },
    {
      title: 'Demande matériels',
      total: 714000,
      icon: <OrderCompleteIllustration />,
    },
    {
      title: 'Demande de reprise de service',
      total: 311000,
      icon: <MotivationIllustration />,
    },
    {
      title: 'Demande de sortie de véhicules',
      total: 124000,
      icon: <MaintenanceIllustration />,
    },
    {
      title: "Demande d'heures d'astreintes",
      total: 124000,
      icon: <DocIllustration />,
    },
  ];

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box>
          <Button variant="outlined" color="warning" onClick={handleClickOpen}>
            Form Dialogs
          </Button>
        </Box>

        <Grid container spacing={3}>
          {BookingWidgetSummaryArray.map((item, index) => (
            <Grid item xs={12} md={md} key={index}>
              <div sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(item)}>
                <BookingWidgetSummary {...item} />
              </div>
            </Grid>
          ))}
        </Grid>

        <RequestFormBase open={open} handleClose={handleClose} requestData={requestData} />
      </Container>
    </Page>
  );
}
