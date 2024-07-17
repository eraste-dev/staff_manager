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
    subheader: '',
    items: [
      {
        title: 'Gestion des demandes',
        path: PATH_DASHBOARD.general.booking,
        icon: ICONS.booking,
        icon: ICONS.user,
        path: PATH_DASHBOARD.general.userRequest,
        // children: [
        //   // { title: 'Creer une demande', path: PATH_DASHBOARD.general.booking },
        //   { title: 'Toutes les Demandes', path: PATH_DASHBOARD.general.userRequest },
        // ],
      },
      {
        title: 'Gestion des utilisateurs',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        path: PATH_DASHBOARD.user.list,
        // children: [
        //   { title: 'liste des utilisateurs', path: PATH_DASHBOARD.user.list },
        //   // { title: 'Ajouter', path: PATH_DASHBOARD.user.new },
        // ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: '',
  //   items: [
  //     // USER
  //     {
  //       title: 'liste des utilisateurs',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       path: PATH_DASHBOARD.user.list,
  //       // children: [
  //       //   { title: 'liste des utilisateurs', path: PATH_DASHBOARD.user.list },
  //       //   // { title: 'Ajouter', path: PATH_DASHBOARD.user.new },
  //       // ],
  //     },
  //   ],
  // },
];

export default NAV_ADMIN_CONFIG;
