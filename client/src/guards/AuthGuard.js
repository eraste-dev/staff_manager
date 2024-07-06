import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { logout } from 'src/redux/slices/user';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  // const { isAuthenticated, isInitialized } = useAuth();
  const dispatch = useDispatch();
  const { user, expire, isLoading } = useSelector((state) => state.user);
  const { pathname, push } = useRouter();
  const router = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  const isExpired = () => {
    if (expire && expire < Date.now()) {
      return true;
    }
    return false;
  };

  const isAuthenticated = () => {
    if (user && user.id && !isExpired()) {
      return true;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      dispatch(logout());
      router.replace(PATH_DASHBOARD.general.booking);
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
