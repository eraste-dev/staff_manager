// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const NAV_ADMIN_CONFIG = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Demandes',
    items: [
      {
        title: 'Demandes',
        path: PATH_DASHBOARD.general.booking,
        icon: ICONS.booking,
        icon: ICONS.user,
        children: [
          { title: 'Creer une demande', path: PATH_DASHBOARD.general.booking },
          { title: 'Toutes les Demandes', path: PATH_DASHBOARD.general.userRequest },
        ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Administration',
    items: [
      // USER
      {
        title: 'utilisateurs',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'liste des utilisateurs', path: PATH_DASHBOARD.user.list },
          // { title: 'Ajouter', path: PATH_DASHBOARD.user.new },
        ],
      },
    ],
  },
];

export default NAV_ADMIN_CONFIG;
