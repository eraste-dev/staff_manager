// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
  DocIllustration,
  MaintenanceIllustration,
  MotivationIllustration,
  OrderCompleteIllustration,
  PageNotFoundIllustration,
  PlanFreeIcon,
  PlanPremiumIcon,
  SentIcon,
  SeoIllustration,
} from '../../assets';

// ----------------------------------------------------------------------

GeneralBooking.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();
  const md = 6;
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
        <Grid container spacing={3}>
          {BookingWidgetSummaryArray.map((item, index) => (
            <Grid item xs={12} md={md} key={index}>
              <BookingWidgetSummary {...item} />
            </Grid>
          ))}
          {/* <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingRoomAvailable />
          </Grid>

          <Grid item xs={12} md={8}>
            <BookingReservationStats />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid>

          <Grid item xs={12}>
            <BookingNewestBooking />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
